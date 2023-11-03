package pt.unl.fct.di.holiday.presentation

import pt.unl.fct.di.holiday.domain.UserDataAccessObject

class UserDataTransferObject(
    val id: Long,
    val role: String,
    val username: String,
    val password: String
){
    constructor(user: UserDataAccessObject) : this(user.id, user.role.toString(), user.username, user.password)
}