package pt.unl.fct.di.holiday.application

import org.springframework.stereotype.Service
import pt.unl.fct.di.holiday.services.PeopleService

@Service
class HelloApp(val people: PeopleService) {

    fun sayHello(name:String) =
        if (name == "Joao")
            "Hello, Master!"
        else if(people.existsPerson(name))
            "Welcome back, ${name}!"
        else
            "Hello, ${name}!"

    fun addClient(name:String) {
        people.addClient(name)
    }

    fun addOwner(name:String) {
        people.addOwner(name)
    }

    fun addManager(name:String) {
        people.addManager(name)
    }

    fun getUsers() {
        people.getUsers()
    }
}