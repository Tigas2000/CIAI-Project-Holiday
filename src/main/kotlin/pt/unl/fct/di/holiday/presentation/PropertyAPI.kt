package pt.unl.fct.di.holiday.presentation

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping

@Api(value = "properties", description = "Property management operations", tags = ["Property"])
@RequestMapping("/properties")
interface PropertyAPI {

    @ApiOperation("Get info on a property")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully retrieved property")])
    @GetMapping("/{property}")
    fun getProperty(@PathVariable property: String): PropertyDataTransferObject

    @ApiOperation("Adds property")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully added property")])
    @PostMapping("/addProperty", consumes = ["application/json"])
    @PreAuthorize("@mySecurityService.canAddProperty(principal)")
    fun addProperty(@PathVariable property: Property)



}