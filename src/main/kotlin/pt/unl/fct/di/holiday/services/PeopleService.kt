package pt.unl.fct.di.holiday.services

import org.springframework.stereotype.Service
import pt.unl.fct.di.holiday.domain.PeopleRepository
import pt.unl.fct.di.holiday.domain.Person

@Service
class PeopleService(val people: PeopleRepository) {

    fun addPerson(name:String) {
        people.save(Person(name))
    }

    fun existsPerson(name:String) = true
}