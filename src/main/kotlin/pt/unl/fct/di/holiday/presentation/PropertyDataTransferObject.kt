package pt.unl.fct.di.holiday.presentation

import pt.unl.fct.di.holiday.domain.PropertyDataAccessObject

class PropertyDataTransferObject(
    val id: Long,
    val name: String,
    val location: String,
    val owner: String
) {
    constructor(property: PropertyDataAccessObject) : this(property.id, property.name,
        property.location, property.owner.username)
}