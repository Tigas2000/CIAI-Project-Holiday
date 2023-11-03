package pt.unl.fct.di.holiday.domain

import org.springframework.data.repository.CrudRepository

interface PropertyRepository : CrudRepository<PropertyDataAccessObject, String>