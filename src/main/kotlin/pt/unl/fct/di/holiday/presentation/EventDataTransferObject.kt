package pt.unl.fct.di.holiday.presentation

import pt.unl.fct.di.holiday.domain.EventDataAccessObject
import java.time.LocalDate
import java.time.format.DateTimeFormatter

class EventDataTransferObject(
    val id: Long,
    val type: String,
    val property: String,
    val client: String,
    val date: String,
    val end: String,
    val length: Int
) {
    constructor(event: EventDataAccessObject) : this(event.id, event.type.toString(), event.property.name,
        event.client.username, convertDate(event.date), calculateEnd(event.date, event.length), event.length)
}
fun convertDate(date: Int) : String {
    var chars = date.toString().toCharArray()
    var sb = StringBuilder()
    sb.append(chars[0])
    sb.append(chars[1])
    sb.append(chars[2])
    sb.append(chars[3])
    sb.append('-')
    sb.append(chars[4])
    sb.append(chars[5])
    sb.append('-')
    sb.append(chars[6])
    sb.append(chars[7])
    return sb.toString()
}

fun calculateEnd(date: Int, length: Int): String {
    val newDate = convertDate(date)
    val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
    val startDate = LocalDate.parse(newDate, formatter)
    val endDate = startDate.plusDays(length.toLong())
    return endDate.format(formatter)
}