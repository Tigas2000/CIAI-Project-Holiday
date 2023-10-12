package pt.unl.fct.di.holiday.application

import org.springframework.stereotype.Service
import pt.unl.fct.di.holiday.services.PeopleService

@Service
class HelloApp(val people: PeopleService) {

    fun sayHello(name:String) =
        if(name == "")
            "Hello, World!"
        else if(name == "joao")
            "Hello, Master!"
        else if(people.existsPerson(name))
            "Welcome back, $name!"
        else "Hello $name!"

    fun addPerson(name:String) {
        people.addPerson(name)

    }
}