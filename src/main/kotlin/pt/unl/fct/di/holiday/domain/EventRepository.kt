package pt.unl.fct.di.holiday.domain

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface EventRepository : CrudRepository<EventDataAccessObject, Long> {
    fun getEventByPropertyAndDate(property: PropertyDataAccessObject, date: Date): Optional<EventDataAccessObject>
}