package pt.unl.fct.di.holiday.domain

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface PropertyRepository : CrudRepository<PropertyDataAccessObject, String> {

    fun findByName(name: String): Optional<PropertyDataAccessObject>

}