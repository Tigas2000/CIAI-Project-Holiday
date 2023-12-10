package pt.unl.fct.di.holiday.services

import org.springframework.stereotype.Component
import pt.unl.fct.di.holiday.configuration.UserDetails
import pt.unl.fct.di.holiday.domain.*

@Component("mySecurityService")
class SecretService(val users: UserRepository, val properties: PropertyRepository, val events: EventRepository) {

    fun isManager(user: UserDataAccessObject): Boolean {
        return user.getRole() == RoleType.MANAGER.name
    }

    fun canAddProperty(user: UserDataAccessObject): Boolean {
        return user.getRole() != RoleType.CLIENT.name
    }

    fun canAccessUser(username: String, principal: UserDetails): Boolean {
        val user : UserDataAccessObject = users.findByUsername(principal.username).get()
        return isManager(user) || user.username == username
    }

    fun myProperty(user: UserDataAccessObject, id:Long): Boolean {
        if (user.role.toString() != RoleType.CLIENT.name) return false
        val property = properties.findById(id).get()
        return property.owner.id == user.id
    }



}