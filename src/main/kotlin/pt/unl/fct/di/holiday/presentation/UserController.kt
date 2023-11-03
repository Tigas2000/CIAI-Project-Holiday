package pt.unl.fct.di.holiday.presentation

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pt.unl.fct.di.holiday.domain.UserDataAccessObject
import pt.unl.fct.di.holiday.services.UserService

@RestController
@RequestMapping("/users")
class UserController(val userService: UserService) : UserAPI {

    @GetMapping("/list")
    override fun getAll(): Iterable<UserDataAccessObject> {
        return userService.getAllUsers()
    }

    override fun getUser(username: String): UserDataTransferObject {
        return UserDataTransferObject(userService.getUserByUsername(username))
    }

}