package pt.unl.fct.di.holiday.domain

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface UserRepository: CrudRepository<UserDataAccessObject, Long> {

    fun findByUsername(username: String): Optional<UserDataAccessObject>


}