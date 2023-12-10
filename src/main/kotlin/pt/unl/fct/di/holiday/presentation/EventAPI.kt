package pt.unl.fct.di.holiday.presentation

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import org.springframework.web.bind.annotation.*

@Api(value = "events", description = "Event management operations", tags = ["Event"])
@RequestMapping("/events")
interface EventAPI {

    @ApiOperation("Get info on an event")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully retrieved event")])
    @RequestMapping(path = ["/info/property={propertyName}&date={date}"], method = [RequestMethod.POST], consumes = ["application/json"])
    fun getEventByPropertyAndDate(
        @PathVariable propertyName: String, @PathVariable date: String
    ): EventDataTransferObject

    @ApiOperation("Get the list of events for a given property")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully retrieved list of events from property {property}")])
    @GetMapping("/property/{property}")
    fun getEventsOfProperty(@PathVariable property: String):Iterable<EventDataTransferObject>

    @ApiOperation("Get the list of all events")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully retrieved list of events")])
    @GetMapping("/list")
    fun getAll():Iterable<EventDataTransferObject>

    @ApiOperation("Adds availability")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully added event")])
    @PostMapping("/addAvailability", consumes = ["application/json"])
    fun addAvailable(@RequestBody event: EventAddData)

    @ApiOperation("Adds reservation")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully added event")])
    @PostMapping("/addReservation", consumes = ["application/json"])
    fun addReservation(@RequestBody event: EventAddData)

    @ApiOperation("Accept event")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully accepted event")])
    @PostMapping("/acceptEvent", consumes = ["application/json"])
    fun acceptEvent(@RequestBody event: EventData)

    @ApiOperation("Refuse event")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully refused event")])
    @PostMapping("/refuseEvent", consumes = ["application/json"])
    fun refuseEvent(@RequestBody event: EventData)

    @ApiOperation("Checks-in")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully checked in")])
    @PostMapping("/checkin", consumes = ["application/json"])
    fun checkIn(@RequestBody event: EventData)

    @ApiOperation("Checks-out")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully checked out")])
    @PostMapping("/checkout", consumes = ["application/json"])
    fun checkOut(@RequestBody event: EventData)

    @ApiOperation("Review")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully reviewed event")])
    @PostMapping("/review", consumes = ["application/json"])
    fun review(@RequestBody event: EventData, review:String)

}