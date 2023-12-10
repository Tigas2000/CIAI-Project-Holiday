package pt.unl.fct.di.holiday.presentation

import javassist.NotFoundException
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pt.unl.fct.di.holiday.domain.EventDataAccessObject
import pt.unl.fct.di.holiday.domain.EventType
import pt.unl.fct.di.holiday.services.EventService
import pt.unl.fct.di.holiday.services.PropertyService
import pt.unl.fct.di.holiday.services.UserService

data class EventAddData(
    val property: String, // Is already in the system
    val date: String, // YYYY-MM-DD
    val client: String, // Client in case of reservation, Owner in case of
    val length: Int, // Num of days
)

data class EventData(
    val client: String,
    val date: String,
    val property: String
)





@RestController
@RequestMapping("/events")
class EventController(val eventService: EventService, val propertyService: PropertyService, val usersService: UserService) : EventAPI {


    override fun getEventsOfProperty(property: String): Iterable<EventDataTransferObject> {
        if(propertyService.hasPropertyName(property)) {
            var events = transformIntoTransfer(eventService.getEventsByProperty(property))
            if(!events.iterator().hasNext())
                throw Exception("There are no events for property $property in the system.")
            return events
        }
        throw Exception("Property with name $property isn't in the system.")
    }

    fun transformIntoTransfer(events: Iterable<EventDataAccessObject>): Iterable<EventDataTransferObject> {
        var eventsTransfer = mutableListOf<EventDataTransferObject>()
        for(event in events)
            eventsTransfer.add(EventDataTransferObject(event))
        return eventsTransfer
    }
    override fun getEventByPropertyAndDate(
        @RequestBody propertyName: String,
        date: String
    ): EventDataTransferObject {

        return EventDataTransferObject(
            eventService.getEventByPropertyAndDate(
                propertyService.getPropertyByName(propertyName), date.replace("-", "").toInt()
            )
        )
    }

    override fun getAll(): Iterable<EventDataTransferObject> {
        var events = transformIntoTransfer(eventService.getAllEvents())
        if(!events.iterator().hasNext())
            throw Exception("There are no events in the system.")
        return events
    }

    override fun addReservation(event: EventAddData) {
        if (verifications(event.client, event.date, event.property)) {
            if (!eventService.canAddEvent(event.property, event.date.replace("-", "").toInt(), event.length))
                throw Exception("Can't add event during given date.")
            eventService.addEvent(
                EventDataAccessObject(
                    eventService.getNewId(), EventType.UNDER_CONSIDERATION, propertyService.getPropertyByName(event.property),
                    usersService.getUserByUsername(event.client), event.date.replace("-", "").toInt(), event.length, ""
                )
            )
            return
        }
    }

    override fun addAvailable(event: EventAddData) {
        if (verifications(event.client, event.date, event.property)) {
            if (!eventService.canAddEvent(event.property, event.date.replace("-", "").toInt(), event.length))
                throw Exception("Can't add event during given date.")
            eventService.addEvent(
                EventDataAccessObject(
                    eventService.getNewId(), EventType.AVAILABLE, propertyService.getPropertyByName(event.property),
                    usersService.getUserByUsername(event.client), event.date.replace("-", "").toInt(), event.length, ""
                )
            )
            return
        }
    }

    fun updateEvent(givenEvent: EventData, type: String, review: String) {
        if (verifications(givenEvent.client, givenEvent.date, givenEvent.property)) {
            var event: EventDataAccessObject?
                when(type) {
                    "UNDER_CONSIDERATION" -> event = eventService.findEvent(givenEvent.client, givenEvent.date, givenEvent.property, EventType.UNDER_CONSIDERATION)
                    "BOOKED" -> event = eventService.findEvent(givenEvent.client, givenEvent.date, givenEvent.property, EventType.BOOKED)
                    "OCCUPIED" -> event = eventService.findEvent(givenEvent.client, givenEvent.date, givenEvent.property, EventType.OCCUPIED)
                    "AWAITING_REVIEW" -> event = eventService.findEvent(givenEvent.client, givenEvent.date, givenEvent.property, EventType.AWAITING_REVIEW)
                    "CLOSED" -> event = eventService.findEvent(givenEvent.client, givenEvent.date, givenEvent.property, EventType.CLOSED)
                    else -> throw Exception("Type $type isn't considered.")
                }
            eventService.updateEvent(event, review)
        }
    }

    override fun acceptEvent(event: EventData) = updateEvent(event, "BOOKED", "")
    override fun checkIn(event: EventData) = updateEvent(event, "OCCUPIED", "")
    override fun checkOut(event: EventData) = updateEvent(event, "AWAITING_REVIEW", "")
    override fun review(event: EventData, review: String) = updateEvent(event, "CLOSED", review)

    override fun refuseEvent(event: EventData) {
        if (verifications(event.client, event.date, event.property)) {
            var foundEvent = eventService.findEvent(event.client, event.date, event.property, EventType.UNDER_CONSIDERATION)
            eventService.refuseEvent(foundEvent)
        }
    }

    fun verifications(client: String, date: String, property: String): Boolean {
        if(eventService.verifyDate(date)) {
            if (usersService.hasUserWithName(client)) {
                if(propertyService.hasPropertyName(property)) {
                    return true
                }
                throw Exception("Property with name $property isn't in the system.")
            }
            throw NotFoundException("User with username $client not found.")
        }
        throw Exception("Given $date date is not in the right format.")
    }



}