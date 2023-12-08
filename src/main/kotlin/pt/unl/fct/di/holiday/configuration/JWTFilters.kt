package pt.unl.fct.di.holiday.configuration

import com.fasterxml.jackson.databind.ObjectMapper
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter
import org.springframework.web.filter.GenericFilterBean
import pt.unl.fct.di.holiday.domain.UserDataAccessObject
import pt.unl.fct.di.holiday.services.UserService
import java.util.*
import javax.servlet.http.HttpServletRequest

object JWTSecret {
    private const val passphrase = "secret"
    val KEY: String = Base64.getEncoder().encodeToString(passphrase.toByteArray())
    const val SUBJECT = "JSON Web Token for CIAI 2023/24 project"
    const val VALIDITY = 1000 * 60 * 60 * 24
}


private fun addResponseToken(authentication: Authentication, response: HttpServletResponse?) {

    val claims = HashMap<String, Any?>()
    claims["username"] = authentication.name
    claims["roles"] = "CLIENT, MANAGER, OWNER"

    val token = Jwts
        .builder()
        .setClaims(claims)
        .setSubject(JWTSecret.SUBJECT)
        .setIssuedAt(Date(System.currentTimeMillis()))
        .setExpiration(Date(System.currentTimeMillis() + JWTSecret.VALIDITY))
        .signWith(SignatureAlgorithm.HS256, JWTSecret.KEY)
        .compact()
    response?.addHeader("Authorization", "Bearer $token")
}

fun encoder(): PasswordEncoder = BCryptPasswordEncoder()


class UserJWTLoginRequest(
    var username: String,
    var password: String
) {
    constructor() : this("","")

    override fun toString(): String {
        return this::class.simpleName + "(username = $username, password = $password)"
    }
}
class UserPasswordAuthenticationFilterToJWT (
    defaultFilterProcessesUrl: String?,
    private val anAuthenticationManager: AuthenticationManager
) : AbstractAuthenticationProcessingFilter(defaultFilterProcessesUrl) {

    override fun attemptAuthentication(
        request: jakarta.servlet.http.HttpServletRequest?,
        response: HttpServletResponse?
    ): Authentication? {
        val u = ObjectMapper().readValue(request!!.inputStream, UserJWTLoginRequest::class.java)

        val auth = anAuthenticationManager.authenticate(UsernamePasswordAuthenticationToken(u.username, u.password))

        return if (auth.isAuthenticated) {
            SecurityContextHolder.getContext().authentication = auth
            auth
        } else
            null
    }

    override fun successfulAuthentication(
        request: jakarta.servlet.http.HttpServletRequest?,
        response: HttpServletResponse?,
        chain: jakarta.servlet.FilterChain?,
        auth: Authentication?
    ) {

        if (auth != null) {
            addResponseToken(auth, response)
        }
    }
}

class UserAuthToken(private val user : UserDataAccessObject) : Authentication {

    override fun getAuthorities() = mutableListOf(SimpleGrantedAuthority(user.role.toString()))

    override fun setAuthenticated(isAuthenticated: Boolean) {}

    override fun getName() = user.username

    override fun getCredentials() = null

    override fun getPrincipal() = UserDetails(user)

    override fun isAuthenticated() = true

    override fun getDetails() = user.username
}

class JWTAuthenticationFilter(val users: UserService): GenericFilterBean() {

    override fun doFilter(
        request: jakarta.servlet.ServletRequest?,
        response: jakarta.servlet.ServletResponse?,
        chain: jakarta.servlet.FilterChain?
    ) {
        println((request as HttpServletRequest).headerNames.toList())

        val authHeader = (request).getHeader("Authorization")

        if( authHeader != null && authHeader.startsWith("Bearer ")) {

            val token = authHeader.substring(7)
            val claims = Jwts.parser().setSigningKey(JWTSecret.KEY).parseClaimsJws(token).body

            val exp = (claims["exp"] as Int).toLong()
            if ( exp < System.currentTimeMillis()/1000) // in seconds
                (response as HttpServletResponse).sendError(HttpServletResponse.SC_UNAUTHORIZED)

            else {
                val u = users.getUserByUsername(claims["username"] as String)
                val authentication = UserAuthToken(u)

                SecurityContextHolder.getContext().authentication = authentication

                addResponseToken(authentication, response as HttpServletResponse)

                chain!!.doFilter(request, response)
            }
        } else {
            chain!!.doFilter(request, response)
        }
    }
}

/**
 * Instructions:
 *
 * http POST :8080/login username=admin password=pass
 *
 * Observe in the response:
 *
 * HTTP/1.1 200
 * Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKU09OIFdlYiBUb2tlbiBmb3IgQ0lBSSAyMDE5LzIwIiwiZXhwIjoxNTcxNzc2MTM4LCJpYXQiOjE1NzE3NDAxMzgsInVzZXJuYW1lIjoidXNlciJ9.Mz18cn5xw-7rBXw8KwlWxUDSsfNCqlliiwoIpvYPDzk
 *
 * http :8080/pets Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKU09OIFdlYiBUb2tlbiBmb3IgQ0lBSSAyMDE5LzIwIiwiZXhwIjoxNTcxNzc2MTM4LCJpYXQiOjE1NzE3NDAxMzgsInVzZXJuYW1lIjoidXNlciJ9.Mz18cn5xw-7rBXw8KwlWxUDSsfNCqlliiwoIpvYPDzk"
 *
 */


class UserJWTSignupRequest(
    var username: String,
    var password: String
) {
    constructor() : this("","")

    override fun toString(): String {
        return this::class.simpleName + "(username = $username, password = $password)"
    }
}

class UserPasswordSignUpFilterToJWT (
    defaultFilterProcessesUrl: String?,
    private val users: UserService
) : AbstractAuthenticationProcessingFilter(defaultFilterProcessesUrl) {

    override fun attemptAuthentication(
        request: jakarta.servlet.http.HttpServletRequest?,
        response: HttpServletResponse?
    ): Authentication? {
        val u = ObjectMapper().readValue(request!!.inputStream, UserJWTSignupRequest::class.java)

        val user = UserDataAccessObject(u.username, BCryptPasswordEncoder().encode(u.password))

        return users
            .addUser(user)
            .orElse( null )
            .let {
                val auth = UserAuthToken(user)
                SecurityContextHolder.getContext().authentication = auth
                auth
            }
    }

    override fun successfulAuthentication(
        request: jakarta.servlet.http.HttpServletRequest?,
        response: HttpServletResponse?,
        chain: jakarta.servlet.FilterChain?,
        auth: Authentication?
    ) {

        if (auth != null) {
            addResponseToken(auth, response)
        }
    }
}

@EnableWebSecurity
class WebSecurityConfig : WebSecurityConfigurerAdapter() {
    override fun configure(http: HttpSecurity) {
        http
            .csrf().disable()
            .authorizeRequests()
            .antMatchers("/").permitAll()
            .anyRequest().authenticated()
            .and().httpBasic()
    }

    override fun configure(auth: AuthenticationManagerBuilder) {
        auth.inMemoryAuthentication()
            .withUser("user")
            .password(BCryptPasswordEncoder().encode("password"))
            .authorities(emptyList())
            .and()
            .passwordEncoder(BCryptPasswordEncoder())
    }
}