package pt.unl.fct.di.holiday.presentation

import org.springframework.web.bind.annotation.*
import pt.unl.fct.di.holiday.application.HelloApp

@RestController
@RequestMapping("api")
class HelloController(val app: HelloApp) {

    @RequestMapping("hello", method = [RequestMethod.GET])
    fun hello() = app.sayHello("World")

    @RequestMapping("getUsers", method = [RequestMethod.GET])
    fun getUsers(): String {return app.getUsers()}

    @PostMapping("hello")
    fun helloName(@RequestParam name:String) = app.sayHello(name)



    @PostMapping("addClient")
    fun addClient(name:String) = app.addClient(name)

    @PostMapping("addOwner")
    fun addOwner(name:String) = app.addOwner(name)

    @PostMapping("addManager")
    fun addManager(name:String) = app.addManager(name)
}