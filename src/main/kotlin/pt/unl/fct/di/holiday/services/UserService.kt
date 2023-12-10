package pt.unl.fct.di.holiday.services

import javassist.NotFoundException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import pt.unl.fct.di.holiday.domain.UserDataAccessObject
import pt.unl.fct.di.holiday.domain.UserRepository
import pt.unl.fct.di.holiday.presentation.UserDataTransferObject
import java.util.*

@Service
class UserService(val users: UserRepository) {

    fun getUserById(id: Long) : UserDataAccessObject = users.findById(id).orElseThrow {
        NotFoundException("User with code $id not found.")
    }

    fun getUserByUsername(username : String) : UserDataAccessObject = users.findByUsername(username).orElseThrow {
        NotFoundException("User with username $username not found.")
    }

    fun hasUserWithName(username: String) : Boolean = users.findByUsername(username).isPresent

    fun getNewId(): Long {
        return users.count() + 1;
    }

    fun verifyIfPassword(verifying: UserDataTransferObject) {
        var subject = users.findByUsername(verifying.username)
    }

    fun getAllUsers(): Iterable<UserDataAccessObject> = users.findAll()

    fun addUser(user: UserDataAccessObject) : Optional<UserDataAccessObject> {
        return if ( users.findById(user.id).isPresent )
            Optional.empty()
        else {
            user.password = BCryptPasswordEncoder().encode(user.password)
            Optional.of(users.save(user))
        }
    }

}