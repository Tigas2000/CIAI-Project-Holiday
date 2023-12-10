package pt.unl.fct.di.holiday.presentation

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@Api(value = "properties", description = "Property management operations", tags = ["Property"])
@RequestMapping("/properties")
interface PropertyAPI {

    @ApiOperation("Get info on a property")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully retrieved property")])
    @GetMapping("/property/{property}")
    fun getProperty(@PathVariable property: String): PropertyDataTransferObject

    @ApiOperation("Get the list of all properties")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully retrieved list of properties")])
    @GetMapping("/list")
    fun getAll():Iterable<PropertyDataTransferObject>

    @ApiOperation("Get the list of properties of given user")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully retrieved list of properties from user {user}")])
    @GetMapping("/user/{user}")
    fun getAllUserProperties(@PathVariable user: String):Iterable<PropertyDataTransferObject>

    @ApiOperation("Adds property")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully added property")])
    @PostMapping("/addProperty", consumes = ["application/json"])
    @PreAuthorize("@mySecurityService.canAddProperty(principal)")
    fun addProperty(@RequestBody property: PropertyData)



}