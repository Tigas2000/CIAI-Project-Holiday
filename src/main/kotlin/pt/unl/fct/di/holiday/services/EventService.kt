package pt.unl.fct.di.holiday.services

import javassist.NotFoundException
import org.springframework.stereotype.Service
import pt.unl.fct.di.holiday.domain.EventDataAccessObject
import pt.unl.fct.di.holiday.domain.EventRepository
import pt.unl.fct.di.holiday.domain.PropertyDataAccessObject
import java.util.*

@Service
class EventService(val events: EventRepository) {

    fun getEventByPropertyAndDate(propertyName: PropertyDataAccessObject, date: Date) :
            EventDataAccessObject = events.getEventByPropertyAndDate(propertyName, date).orElseThrow {
        NotFoundException("Event with property name $propertyName and date $date not found.")
    }
}