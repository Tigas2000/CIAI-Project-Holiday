package pt.unl.fct.di.holiday

import jakarta.transaction.Transactional
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import pt.unl.fct.di.holiday.domain.RoleType
import pt.unl.fct.di.holiday.domain.UserDataAccessObject
import pt.unl.fct.di.holiday.domain.UserRepository
import springfox.documentation.spring.web.ControllerNamingUtils.encode

@Component
class InitData(
    val users: UserRepository
) : CommandLineRunner {

    fun addUsers() {
        users.saveAll(
            listOf(
                UserDataAccessObject(0, RoleType.CLIENT, "client1", encode("pass")),
                UserDataAccessObject(1, RoleType.CLIENT, "client2", encode("pass")),
                UserDataAccessObject(2, RoleType.OWNER, "owner1", encode("pass")),
                UserDataAccessObject(3, RoleType.MANAGER, "manager1", encode("pass"))
            )
        )
    }

    @Transactional
    override fun run(vararg args: String?) {
        val baseUrl = "http://localhost:8080"
        addUsers()
        users.findAll().forEach {
            println(it.getInfo())
        }
    }


}