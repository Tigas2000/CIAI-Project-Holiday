package pt.unl.fct.di.holiday.presentation

import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pt.unl.fct.di.holiday.services.EventService
import pt.unl.fct.di.holiday.services.PropertyService
import java.util.*

@RestController
@RequestMapping("/events")
class EventController(val eventService: EventService, val propertyService: PropertyService) : EventAPI {


    override fun getEventByPropertyAndDate(
        @RequestBody propertyName: String,
        date: String
    ): EventDataTransferObject {

        return EventDataTransferObject(
            eventService.getEventByPropertyAndDate(
                propertyService.getPropertyByName(propertyName), Date(date)
            )
        )
    }

}