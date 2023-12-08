package pt.unl.fct.di.holiday.presentation

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pt.unl.fct.di.holiday.domain.PropertyDataAccessObject
import pt.unl.fct.di.holiday.services.PropertyService
import pt.unl.fct.di.holiday.services.UserService

data class Property(
    val name: String,
    val location: String,
    val owner: String
)

@RestController
@RequestMapping("/properties")
class PropertyController(val propertyService: PropertyService, val users: UserService) : PropertyAPI {


    override fun getProperty(property: String): PropertyDataTransferObject {
        return PropertyDataTransferObject(propertyService.getPropertyByName(property))
    }

    override fun addProperty(property: Property) {
        if(users.alreadyHasUsername(property.owner)) {
            propertyService.addProperty(
                PropertyDataAccessObject(propertyService.getNewId(), property.name,
                    property.location, users.getUserByUsername(property.owner))
            )
        }
    }

}