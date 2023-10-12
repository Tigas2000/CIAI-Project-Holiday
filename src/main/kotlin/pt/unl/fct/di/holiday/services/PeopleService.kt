package pt.unl.fct.di.holiday.services

import org.springframework.stereotype.Service
import pt.unl.fct.di.holiday.domain.PeopleRepository
import pt.unl.fct.di.holiday.domain.Person

@Service
class PeopleService(val people: PeopleRepository) {

    fun addClient(name: String) {
        people.save(Person(name, "Client"))
    }

    fun addOwner(name: String) {
        people.save(Person(name, "Owner"))
    }

    fun addManager(name: String) {
        people.save(Person(name, "Manager"))
    }

    fun existsPerson(name:String) =
            people.existsById(name)

    fun getUsers() = println(people.findAll())
}