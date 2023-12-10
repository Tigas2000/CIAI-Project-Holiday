package pt.unl.fct.di.holiday.domain

import javax.persistence.*


@Entity
@Table(name = "PROPERTIES")
data class PropertyDataAccessObject(
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long,

    @Column(nullable = false, unique = true)
    var name: String,

    @Column(nullable = false)
    var location: String,

    @ManyToOne
    var owner: UserDataAccessObject
){
    @Override
    fun getInfo(): String {
        return this::class.simpleName + "(id = $id , property name = $name , location - $location owner = ${owner.username};)"
    }
}