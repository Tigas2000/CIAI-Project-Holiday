package pt.unl.fct.di.holiday.configuration

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import pt.unl.fct.di.holiday.domain.UserDataAccessObject

class UserDetailsConfiguration(val user:UserDataAccessObject) : UserDetails {
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        var auth = SimpleGrantedAuthority(user.role.toString())
        return mutableListOf(auth)
    }

    override fun getPassword(): String {
        return user.password
    }

    override fun getUsername(): String {
        return user.username
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }
}