package pt.unl.fct.di.holiday.presentation;

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import org.springframework.web.bind.annotation.*


@Api(value = "users", description = "User management operations", tags = ["User"])
@RequestMapping("/users")
interface UserAPI {


    @ApiOperation("Adds user")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully added user")])
    @PostMapping("/addUser", consumes = ["application/json"])
    fun addUser( @RequestBody user: UserData)



    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully added user")])
    @GetMapping("/login")
    fun login( @RequestBody username: UserData)


    @ApiOperation("Get the list of all users")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully retrieved list of users")])
    @GetMapping("/list")
    fun getAll():Iterable<UserDataTransferObject>

    @ApiOperation("Get info on a user")
    @ApiResponses(value = [ApiResponse(code = 200, message = "Successfully retrieved user")])
    @GetMapping("/{username}")
    fun getUser(@PathVariable username: String): UserDataTransferObject




}
