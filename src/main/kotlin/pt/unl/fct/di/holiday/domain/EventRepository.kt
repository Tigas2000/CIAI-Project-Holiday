package pt.unl.fct.di.holiday.domain

import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface EventRepository {
    fun getEventByPropertyAndDate(propertyName: String, date: String): Optional<EventDataAccessObject>
}