package pt.unl.fct.di.holiday.configuration

import com.fasterxml.jackson.databind.ObjectMapper
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
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
import javax.servlet.http.HttpServletResponse

object JWTSecret {
    private const val passphrase = "segredo bastante secreto"
    val KEY: String = Base64.getEncoder().encodeToString(passphrase.toByteArray())
    const val SUBJECT = "JSON Web Token for CIAI 2022/23 project"
    const val VALIDITY = 1000 * 60 * 60 * 24 // 24 hours in milliseconds
}

private fun addResponseToken(authentication: Authentication, response: jakarta.servlet.http.HttpServletResponse) {

    val claims = HashMap<String, Any?>()
    claims["username"] = authentication.name
    claims["roles"] = "ROLE_CLIENT, ROLE_DRIVER, ROLE_HUB_WORKER, ROLE_MANAGER"

    val token = Jwts
        .builder()
        .setClaims(claims)
        .setSubject(JWTSecret.SUBJECT)
        .setIssuedAt(Date(System.currentTimeMillis()))
        .setExpiration(Date(System.currentTimeMillis() + JWTSecret.VALIDITY))
        .signWith(SignatureAlgorithm.HS256, JWTSecret.KEY)
        .compact()

    response.addHeader("Authorization", "Bearer $token")
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

    override fun attemptAuthentication(request: jakarta.servlet.http.HttpServletRequest?,
                                       response: jakarta.servlet.http.HttpServletResponse?): Authentication? {
        //getting user from request body
        val u = ObjectMapper().readValue(request!!.inputStream, UserJWTLoginRequest::class.java)

        // perform the "normal" authentication
        val auth = anAuthenticationManager.authenticate(UsernamePasswordAuthenticationToken(u.username, u.password))

        return if (auth.isAuthenticated) {
            // Proceed with an authenticated user
            SecurityContextHolder.getContext().authentication = auth
            auth
        } else
            null
    }

    override fun successfulAuthentication(request: jakarta.servlet.http.HttpServletRequest,
                                          response: jakarta.servlet.http.HttpServletResponse,
                                          filterChain: jakarta.servlet.FilterChain?,
                                          auth: Authentication) {

        // When returning from the Filter loop, add the token to the response
        addResponseToken(auth, response)
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
    override fun doFilter(request: jakarta.servlet.ServletRequest?,
                          response: jakarta.servlet.ServletResponse?,
                          chain: jakarta.servlet.FilterChain?) {
        println((request as HttpServletRequest).headerNames.toList())

        val authHeader = (request).getHeader("Authorization")

        //println(if (authHeader.isNullOrEmpty()) "" else authHeader.toString() )

        if( authHeader != null && authHeader.startsWith("Bearer ")) {

            val token = authHeader.substring(7) // Skip 7 characters for "Bearer "
            val claims = Jwts.parser().setSigningKey(JWTSecret.KEY).parseClaimsJws(token).body

            // should check for token validity here (e.g. expiration date, session in db, etc.)
            val exp = (claims["exp"] as Int).toLong()
            if ( exp < System.currentTimeMillis()/1000) // in seconds
                (response as HttpServletResponse).sendError(HttpServletResponse.SC_UNAUTHORIZED) // RFC 6750 3.1

            else {
                //println(users.users.toString())
                val u = users.getUserByUsername(claims["username"] as String)
                val authentication = UserAuthToken(u)
                // Can go to the database to get the actual user information (e.g. authorities)

                SecurityContextHolder.getContext().authentication = authentication

                // Renew token with extended time here. (before doFilter)
                addResponseToken(authentication, response as jakarta.servlet.http.HttpServletResponse)

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
    var name: String,
    var username: String,
    var email: String,
    var password: String
) {
    constructor() : this("","", "", "")

    override fun toString(): String {
        return this::class.simpleName + "(username = $username, password = $password)"
    }
}

class UserPasswordSignUpFilterToJWT ( //17:45 lab session 6
    defaultFilterProcessesUrl: String?,
    private val users: UserService
) : AbstractAuthenticationProcessingFilter(defaultFilterProcessesUrl) {

    override fun attemptAuthentication(request: jakarta.servlet.http.HttpServletRequest?,
                                       response: jakarta.servlet.http.HttpServletResponse?): Authentication? {
        //getting user from request body
        val u = ObjectMapper().readValue(request!!.inputStream, UserJWTSignupRequest::class.java)


        val user = users.getUserByUsername(u.username)

        //println(user)

        return users
            .addUser(user)
            .orElse( null )
            .let {
                val auth = UserAuthToken(user)
                SecurityContextHolder.getContext().authentication = auth
                auth
            }
    }

    override fun successfulAuthentication(request: jakarta.servlet.http.HttpServletRequest,
                                          response: jakarta.servlet.http.HttpServletResponse,
                                          filterChain: jakarta.servlet.FilterChain?,
                                          auth: Authentication) {

        addResponseToken(auth, response)
    }
}
