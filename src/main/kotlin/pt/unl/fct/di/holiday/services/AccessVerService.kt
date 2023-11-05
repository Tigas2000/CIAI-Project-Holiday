package pt.unl.fct.di.holiday.services

import pt.unl.fct.di.holiday.domain.UserDataAccessObject

class AccessVerService {

    fun isManager(user: UserDataAccessObject): Boolean {
        return user.getRole() == "MANAGER"
    }



}