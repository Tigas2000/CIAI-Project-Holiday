package pt.unl.fct.di.holiday.presentation

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pt.unl.fct.di.holiday.domain.RoleType
import pt.unl.fct.di.holiday.domain.UserDataAccessObject
import pt.unl.fct.di.holiday.services.UserService

data class UserData(
    val username: String,
    val password: String
)

@RestController
@RequestMapping("/users")
class UserController(val userService: UserService) : UserAPI {

    fun encode(pw: String) : String {
        return "{bcrypt}${BCryptPasswordEncoder().encode(pw)}"
    }

    override fun addUser(user: UserData) {
        if(userService.hasUserWithName(user.username)) {
            throw Exception("User with username ${user.username} is already in the system.")
        }
        else
            userService.addUser(UserDataAccessObject(userService.getNewId(), RoleType.CLIENT, user.username, encode(user.password)))
    }

    override fun login(user: UserData) {

        var subject = userService.users.findByUsername(user.username)
    }

    override fun getAll(): Iterable<UserDataTransferObject> {
        var users = userService.getAllUsers()
        var usersTransfer = mutableListOf<UserDataTransferObject>()
        for(user in users)
            usersTransfer.add(UserDataTransferObject(user))
        return usersTransfer
    }

    override fun getUser(username: String): UserDataTransferObject {
        return UserDataTransferObject(userService.getUserByUsername(username))
    }

}