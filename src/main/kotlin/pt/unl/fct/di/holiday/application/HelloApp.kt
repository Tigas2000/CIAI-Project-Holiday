package pt.unl.fct.di.holiday.application

import org.springframework.stereotype.Service
import pt.unl.fct.di.holiday.domain.Person
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

    fun getUsers(): String {
        val it: MutableIterable<Person> = people.getUsers()
        var res = ""
        var i = 0
        for (people in it) {
            i += 1
            res += "$i - Username: " + people.name + ", Role: " + people.role + ";\n"
        }
        res = "We have $i users: \n$res"
        return res
    }
}