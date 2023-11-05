package pt.unl.fct.di.holiday.domain

import jakarta.persistence.*
import java.util.*


enum class EventType {
    AVAILABLE, UNDER_CONSIDERATION, BOOKED, OCCUPIED, AWAITING_REVIEW, CLOSED;
}

@Entity
class EventDataAccessObject(
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long,

    var type: EventType,

    @ManyToOne
    var property: PropertyDataAccessObject,

    @ManyToOne
    var client: UserDataAccessObject,

    @Column(nullable = false)
    var date: Date,

    @Column(nullable = false)
    var length: Int

){
    constructor(type:EventType, property:PropertyDataAccessObject, client:UserDataAccessObject, date:Date, length:Int) :
            this(0, type, property, client, date, length)

    @Override
    fun getInfo(): String {
        return this::class.simpleName + "(id = $id , type = $type , property = ${property.name}, client = ${client.username}," +
                "date - $date, length - $length days; )"
    }
}