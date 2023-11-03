package pt.unl.fct.di.holiday.presentation;

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import pt.unl.fct.di.holiday.domain.UserDataAccessObject

@Api(value = "users", description = "User management operations", tags = ["User"])
@RequestMapping("/users")
interface UserAPI {

    @ApiOperation("Get the list of all users")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully retrieved list of users")])
    @GetMapping("/list")
    fun getAll():Iterable<UserDataAccessObject>

    @ApiOperation("Get info on a user")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully retrieved user")])
    @GetMapping("/{username}")
    @PreAuthorize("@mySecurityService.canAccessUser(#username, principal)")
    fun getUser(@PathVariable username: String): UserDataTransferObject




}
