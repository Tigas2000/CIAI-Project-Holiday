package pt.unl.fct.di.holiday.presentation

import org.apache.coyote.Request
import org.springframework.web.bind.annotation.*
import pt.unl.fct.di.holiday.application.HelloApp
import pt.unl.fct.di.holiday.domain.Person
import pt.unl.fct.di.holiday.services.PeopleService

@RestController
@RequestMapping("api")
class HelloController(val app: HelloApp , val people: PeopleService) {

    @RequestMapping("hello", method = [RequestMethod.GET])
    fun hello() = app.sayHello("World")

    @RequestMapping("getUsers", method = [RequestMethod.GET])
    fun getUsers() = app.getUsers()

    @PostMapping("hello")
    fun helloName(@RequestParam name:String) = app.sayHello(name)

    @PostMapping("addClient")
    fun addClient(name:String) = app.addClient(name)

    @PostMapping("addOwner")
    fun addOwner(name:String) = app.addOwner(name)

    @PostMapping("addManager")
    fun addManager(name:String) = app.addManager(name)
}