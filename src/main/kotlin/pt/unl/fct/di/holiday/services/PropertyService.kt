package pt.unl.fct.di.holiday.services

import javassist.NotFoundException
import org.springframework.stereotype.Service
import pt.unl.fct.di.holiday.domain.PropertyDataAccessObject
import pt.unl.fct.di.holiday.domain.PropertyRepository

@Service
class PropertyService(val properties: PropertyRepository) {

    fun getPropertyByName(property : String) :
            PropertyDataAccessObject = properties.findByName(property).orElseThrow {
        NotFoundException("Property with name $property not found.")
    }

}