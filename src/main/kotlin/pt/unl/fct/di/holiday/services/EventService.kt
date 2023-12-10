package pt.unl.fct.di.holiday.services

import javassist.NotFoundException
import org.springframework.stereotype.Service
import pt.unl.fct.di.holiday.domain.*
import pt.unl.fct.di.holiday.presentation.calculateEnd
import pt.unl.fct.di.holiday.presentation.convertDate
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeParseException
import java.util.*

@Service
class EventService(val events: EventRepository, val properties: PropertyRepository) {

    fun getEventByPropertyAndDate(property: PropertyDataAccessObject, date: Int) : EventDataAccessObject =
        events.getEventByPropertyAndDateOrderByDate(properties.findByName(property.name), date)
            .orElseThrow {NotFoundException("Event with property name ${property.name} and date $date not found.")}

    fun getEventsByProperty(propertyName: String) : Iterable<EventDataAccessObject> {
        return events.getEventByPropertyOrderByDate(properties.findByName(propertyName))
    }

    fun getAllEvents(): Iterable<EventDataAccessObject> = events.getEventsByOrderByDate()

    fun getNewId(): Long {
        return properties.count() + 1;
    }

    fun canAddEvent(property: String, date: Int, length: Int): Boolean {
        val events = getEventsByProperty(property)
        val proposedStartDate = convertDate(date)
        val proposedEndDate = calculateEnd(date, length)
        for (event in events) {
            if(event.type.toString() != "AVAILABLE") {
                val eventStartDate = convertDate(event.date)
                val eventEndDate = calculateEnd(event.date, event.length)
                println("$eventStartDate, $eventEndDate, $proposedStartDate, $proposedEndDate")
                if (proposedStartDate <= eventEndDate && proposedEndDate >= eventStartDate) {
                    return false
                }
            }
        }
        return true
    }

    fun verifyDate(date: String): Boolean {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
        try {
            val parsedDate = LocalDate.parse(date, formatter)
            return date == parsedDate.format(formatter)
        } catch (e: DateTimeParseException) {
            return false
        }
    }

    fun verifyEvent(client: String, date: String, property: String, type: EventType): EventDataAccessObject {
        var requiredType: EventType? = null
        when(type) {
            EventType.AVAILABLE -> requiredType = null
            EventType.UNDER_CONSIDERATION -> requiredType = EventType.AVAILABLE
            EventType.BOOKED -> requiredType = EventType.UNDER_CONSIDERATION
            EventType.OCCUPIED -> requiredType = EventType.BOOKED
            EventType.AWAITING_REVIEW -> requiredType = EventType.OCCUPIED
            EventType.CLOSED -> requiredType = EventType.AWAITING_REVIEW
        }
        if(requiredType == null)
            throw Exception("Wrong event type being considered.")
        return findEvent(client, date, property, requiredType)
    }

    fun findEvent(client: String, date: String, property: String, type: EventType): EventDataAccessObject {
        val events = getEventsByProperty(property)
        val proposedDate = convertDate(date.replace("-", "").toInt())
        for (event in events) {
            if((event.client.username == client || type == EventType.AVAILABLE) && (event.type == type) &&
                (convertDate(event.date) <= proposedDate) && (proposedDate <= calculateEnd(event.date, event.length))
            ) {
                    return event
            }
        }
        if(type == EventType.AVAILABLE)
            throw Exception("Can't add event (not available at given date $date).")
        throw Exception("Can't find event of date $date.")
    }

    fun updateEvent(event: EventDataAccessObject, review: String) {
        when(event.type) {
            EventType.AVAILABLE -> event.type = EventType.UNDER_CONSIDERATION
            EventType.UNDER_CONSIDERATION -> event.type = EventType.BOOKED
            EventType.BOOKED -> event.type = EventType.OCCUPIED
            EventType.OCCUPIED -> event.type = EventType.AWAITING_REVIEW
            EventType.AWAITING_REVIEW -> {event.review = review; event.type = EventType.CLOSED}
            EventType.CLOSED -> throw Exception("Event is already done.")
        }
        events.save(event)
    }

    fun refuseEvent(event: EventDataAccessObject) {
        events.delete(event)
    }

    fun addEvent(event: EventDataAccessObject): Optional<EventDataAccessObject> {
        return if ( events.findById(event.id).isPresent )
            Optional.empty()
        else {
            Optional.of(events.save(event))
        }
    }
}