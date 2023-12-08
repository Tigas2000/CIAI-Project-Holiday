package pt.unl.fct.di.holiday.presentation

import javassist.NotFoundException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pt.unl.fct.di.holiday.domain.RoleType
import pt.unl.fct.di.holiday.domain.UserDataAccessObject
import pt.unl.fct.di.holiday.services.UserService

data class User(
    val username: String,
    val password: String
)

@RestController
@RequestMapping("/users")
class UserController(val userService: UserService) : UserAPI {

    fun encode(pw: String) : String {
        return "{bcrypt}${BCryptPasswordEncoder().encode(pw)}"
    }

    override fun addUser(user: User) {
        if(userService.alreadyHasUsername(user.username)) {
            throw NotFoundException("User with username ${user.username} is already in the system.")
        }
        else
            userService.addUser(UserDataAccessObject(userService.getNewId(), RoleType.CLIENT, user.username, encode(user.password)))
    }

    override fun login(user: User) {

        var subject = userService.users.findByUsername(user.username)
    }

    override fun getAll(): Iterable<UserDataAccessObject> {
        return userService.getAllUsers()
    }

    override fun getUser(username: String): UserDataTransferObject {
        return UserDataTransferObject(userService.getUserByUsername(username))
    }

}