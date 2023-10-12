package pt.unl.fct.di.holiday.presentation

import pt.unl.fct.di.holiday.application.HelloApp
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api")
class HelloController(val app: HelloApp) {

    @RequestMapping("hello", method = [RequestMethod.GET])
    fun hello(name:String) = app.sayHello(name)

    @PostMapping("hello")
    fun sayHello(name:String) = "Hello, $name!"

    @PostMapping("people")
    fun addPeople(name:String) = app.addPerson(name)
}