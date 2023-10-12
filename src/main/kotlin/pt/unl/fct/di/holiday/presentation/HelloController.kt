package pt.unl.fct.di.holiday.presentation

import org.apache.coyote.Request
import pt.unl.fct.di.holiday.application.HelloApp
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api")
class HelloController(val app: HelloApp) {

    @RequestMapping("hello", method = [RequestMethod.GET])
    fun hello() = app.sayHello("")

    @RequestMapping("getUsers", method = [RequestMethod.GET])
    fun getUsers() = app.getUsers()

    @PostMapping("hello")
    fun sayHello(name:String) = "Hello, $name!"

    @PostMapping("addClient")
    fun addClient(name:String) = app.addClient(name)

    @PostMapping("addOwner")
    fun addOwner(name:String) = app.addOwner(name)

    @PostMapping("addManager")
    fun addManager(name:String) = app.addManager(name)
}