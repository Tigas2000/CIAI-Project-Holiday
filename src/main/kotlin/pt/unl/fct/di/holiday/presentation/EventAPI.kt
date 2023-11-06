package pt.unl.fct.di.holiday.presentation

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod

@Api(value = "events", description = "Event management operations", tags = ["Event"])
@RequestMapping("/events")
interface EventAPI {

    @ApiOperation("Get info on an event")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully retrieved event")])
    @RequestMapping(path = ["/info/property={propertyName}&date={date}"], method = [RequestMethod.POST], consumes = ["application/json"])
    fun getEventByPropertyAndDate(
        @PathVariable propertyName: String, @PathVariable date: String
    ): EventDataTransferObject
}