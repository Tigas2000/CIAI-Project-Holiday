package pt.unl.fct.di.holiday.presentation

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping

@Api(value = "properties", description = "Property management operations", tags = ["Property"])
@RequestMapping("/properties")
interface PropertyAPI {

    @ApiOperation("Get info on a property")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully retrieved property")])
    @GetMapping("/{property}")
    @PreAuthorize("hasAnyRole('CLIENT', 'OWNER', 'MANAGER')")
    fun getProperty(@PathVariable property: String): PropertyDataTransferObject
}