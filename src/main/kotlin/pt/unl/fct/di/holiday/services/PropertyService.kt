package pt.unl.fct.di.holiday.services

import javassist.NotFoundException
import org.springframework.stereotype.Service
import pt.unl.fct.di.holiday.domain.PropertyDataAccessObject
import pt.unl.fct.di.holiday.domain.PropertyRepository
import java.util.*


@Service
class PropertyService(val properties: PropertyRepository) {

    fun getPropertyByName(property : String) :
            PropertyDataAccessObject = properties.findByName(property).orElseThrow {
        NotFoundException("Property with name $property not found.")
    }

    fun getPropertyById(propertyId: Long): PropertyDataAccessObject =
        properties.findById(propertyId).orElseThrow {
            NotFoundException("Property with ID $propertyId not found.")
        }

    fun getNewId(): Long {
        return properties.count() + 1;
    }

    fun hasPropertyName(property: String): Boolean = properties.findByName(property).isPresent

    fun hasPropertyId(propertyId: Long): Boolean = properties.findById(propertyId).isPresent

    fun getAllProperties(): Iterable<PropertyDataAccessObject> = properties.findAll()

    fun addProperty(property: PropertyDataAccessObject): Optional<PropertyDataAccessObject> {
        return if ( properties.findById(property.id).isPresent )
            Optional.empty()
        else {
            Optional.of(properties.save(property))
        }
    }

}