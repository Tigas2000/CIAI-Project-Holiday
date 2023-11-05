package pt.unl.fct.di.holiday.presentation

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pt.unl.fct.di.holiday.services.PropertyService

@RestController
@RequestMapping("/properties")
class PropertyController(val propertyService: PropertyService) : PropertyAPI {

    override fun getProperty(property: String): PropertyDataTransferObject {
        return PropertyDataTransferObject(propertyService.getPropertyByName(property))
    }

}