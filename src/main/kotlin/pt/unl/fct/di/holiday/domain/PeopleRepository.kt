package pt.unl.fct.di.holiday.domain

import jakarta.persistence.Entity
import jakarta.persistence.Id
import org.springframework.data.repository.CrudRepository

@Entity
data class Person(@Id val name:String)

interface PeopleRepository : CrudRepository<Person, String>