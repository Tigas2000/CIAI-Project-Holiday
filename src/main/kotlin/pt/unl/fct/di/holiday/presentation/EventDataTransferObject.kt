package pt.unl.fct.di.holiday.presentation

import pt.unl.fct.di.holiday.domain.EventDataAccessObject

class EventDataTransferObject(
    val id: Long,
    val type: String,
    val property: String,
    val client: String,
    val date: String,
    val length: Int
) {
    constructor(event: EventDataAccessObject) : this(event.id, event.type.toString(), event.property.name,
        event.client.username, event.date.toString(), event.length)
}