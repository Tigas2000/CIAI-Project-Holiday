package pt.unl.fct.di.holiday.domain

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity
data class PropertyDataAccessObject(
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long
){
}