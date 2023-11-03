package pt.unl.fct.di.holiday.domain

import jakarta.persistence.*
import org.hibernate.Hibernate

enum class RoleType {
    CLIENT, OWNER, MANAGER;
}

@Entity
data class UserDataAccessObject(
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long,

    var role: RoleType,

    @Column(nullable = false, unique = true)
    var username: String,

    @Column(nullable = false)
    var password: String
){
    constructor(un:String, pw:String) : this(0, RoleType.CLIENT, un, pw)

    fun getRole() : String{
        return this.role.name;
    }


    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as UserDataAccessObject

        return id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    @Override
    fun getInfo(): String {
        return this::class.simpleName + "(id = $id , username = $username , password = $password , role = $role )"
    }
}

