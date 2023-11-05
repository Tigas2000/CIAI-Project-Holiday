package pt.unl.fct.di.holiday.presentation

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pt.unl.fct.di.holiday.services.EventService

@RestController
@RequestMapping("/events")
class EventController(val eventService: EventService) : EventAPI {

    fun getEventByPropertyAndDate(propertyName: String, date: String): EventDataTransferObject {
        return EventDataTransferObject(eventService.getEventByPropertyAndDate(propertyName, date))

    }

}