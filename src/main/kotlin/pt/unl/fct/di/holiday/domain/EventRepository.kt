package pt.unl.fct.di.holiday.domain

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface EventRepository : CrudRepository<EventDataAccessObject, Long> {

    fun getEventByPropertyAndDateOrderByDate(property: Optional<PropertyDataAccessObject>, date: Int): Optional<EventDataAccessObject>


    fun getEventByPropertyOrderByDate(property: Optional<PropertyDataAccessObject>): Iterable<EventDataAccessObject>

    fun getEventsByOrderByDate(): Iterable<EventDataAccessObject>
}