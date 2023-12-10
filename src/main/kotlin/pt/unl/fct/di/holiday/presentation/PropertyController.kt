package pt.unl.fct.di.holiday.presentation

import jakarta.el.PropertyNotFoundException
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pt.unl.fct.di.holiday.domain.PropertyDataAccessObject
import pt.unl.fct.di.holiday.services.PropertyService
import pt.unl.fct.di.holiday.services.UserService

data class PropertyData(
    val name: String,
    val location: String,
    val owner: String
)

@RestController
@RequestMapping("/properties")
class PropertyController(val propertyService: PropertyService, val users: UserService) : PropertyAPI {



    override fun getProperty(property: String): PropertyDataTransferObject {
        if(propertyService.hasPropertyName(property)) {
            return PropertyDataTransferObject(propertyService.getPropertyByName(property))
        }
        else {
            throw Exception("Property with name $property isn't in the system.")
        }
    }

    override fun getPropertyById(id: Long): PropertyDataTransferObject {
        if(propertyService.hasPropertyId(id)) {
            return PropertyDataTransferObject(propertyService.getPropertyById(id))
        }
        else {
            throw PropertyNotFoundException("Property with ID $id isn't in the system.")
        }
    }

    override fun getAll(): Iterable<PropertyDataTransferObject> {
        var properties = propertyService.getAllProperties()
        var propertiesTransfer = mutableListOf<PropertyDataTransferObject>()
        for(property in properties)
            propertiesTransfer.add(PropertyDataTransferObject(property))
        return propertiesTransfer
    }

    override fun getAllUserProperties(user: String): Iterable<PropertyDataTransferObject> {
        if(users.hasUserWithName(user)) {
            var properties = propertyService.getAllProperties()
            var propertiesTransfer = mutableListOf<PropertyDataTransferObject>()
            for(property in properties)
                if(property.owner.username == user)
                    propertiesTransfer.add(PropertyDataTransferObject(property))
            if(propertiesTransfer.isEmpty())
                throw Exception("User with username $user does not have any properties on the system.")
            return propertiesTransfer
        }
        else {
            throw Exception("User with username $user isn't in the system.")
        }
    }

    override fun addProperty(property: PropertyData) {
        if(users.hasUserWithName(property.owner)) {
            if(!propertyService.hasPropertyName(property.name)) {
                propertyService.addProperty(
                    PropertyDataAccessObject(propertyService.getNewId(), property.name,
                        property.location, users.getUserByUsername(property.owner))
                )
            }
            throw Exception("Name ${property.name} is already being used in the system for a property.")
        }
        throw Exception("User with username ${property.owner} isn't in the system.")
    }

}