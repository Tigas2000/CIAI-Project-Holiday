package pt.unl.fct.di.holiday.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.provisioning.InMemoryUserDetailsManager
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import pt.unl.fct.di.holiday.services.UserService

// https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter
// https://www.bezkoder.com/websecurityconfigureradapter-deprecated-spring-boot/

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled=true)
class SecurityConfig {



    var userDetails : InMemoryUserDetailsManager = InMemoryUserDetailsManager()

    @Bean
    fun filterChain(http: HttpSecurity,
                    users: UserService,
                    authenticationManager: AuthenticationManager
    ): SecurityFilterChain? {
        http.cors().and().csrf().disable()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
            .antMatchers("/v2/**").permitAll()
            .antMatchers("/v3/**").permitAll()
            .antMatchers("/webjars/**").permitAll()
            .antMatchers("/swagger-resources/**").permitAll()
            .antMatchers("/swagger-ui.html").permitAll()
            .antMatchers("/swagger-ui/index.html").permitAll()
            .antMatchers(HttpMethod.POST, "/login").permitAll()
            .antMatchers(HttpMethod.POST,"/signup").permitAll()
            .antMatchers("/login").permitAll()
            .antMatchers("/signup").permitAll()
            .anyRequest().authenticated()
            .and()
            .httpBasic()
            .and()
            .addFilterBefore(UserPasswordAuthenticationFilterToJWT("/login", authenticationManager),
                BasicAuthenticationFilter::class.java)
            .addFilterBefore(UserPasswordSignUpFilterToJWT ("/signup", users),
                BasicAuthenticationFilter::class.java)
            .addFilterBefore(JWTAuthenticationFilter(users),
                BasicAuthenticationFilter::class.java)

        return http.build()
    }

    @Bean
    fun authenticationManager(authConfiguration: AuthenticationConfiguration): AuthenticationManager? {
        return authConfiguration.authenticationManager
    }
}

