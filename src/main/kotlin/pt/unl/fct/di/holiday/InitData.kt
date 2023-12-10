package pt.unl.fct.di.holiday

import org.springframework.boot.CommandLineRunner
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Component
import pt.unl.fct.di.holiday.domain.*

@Component
class InitData(
    val users: UserRepository,
    val properties: PropertyRepository,
    val events: EventRepository
) : CommandLineRunner {

    fun encode(pw: String) : String {
        return "{bcrypt}${BCryptPasswordEncoder().encode(pw)}"
    }

    fun addUsers() {
        users.saveAll(

            listOf(
                UserDataAccessObject(1, RoleType.CLIENT, "client1", encode("pass")),
                UserDataAccessObject(2, RoleType.CLIENT, "client2", encode("pass")),
                UserDataAccessObject(3, RoleType.OWNER, "owner1", encode("pass")),
                UserDataAccessObject(4, RoleType.MANAGER, "manager1", encode("pass"))
            )
        )
    }

    fun addProperties() {
        properties.saveAll(
            listOf(
                PropertyDataAccessObject(1, "Casa_da_praia", "Portimao", users.findByUsername("owner1").get()),
                PropertyDataAccessObject(2, "Casa_do_mato", "Beja", users.findByUsername("owner1").get())
            )
        )
    }

    fun addEvents() {
        events.saveAll(
            listOf(
                EventDataAccessObject(1, EventType.UNDER_CONSIDERATION, properties.findByName("Casa_da_praia").get(),
                    users.findByUsername("client1").get(), 1231112, 2, ""),
                EventDataAccessObject(2, EventType.BOOKED, properties.findByName("Casa_da_praia").get(),
                    users.findByUsername("client2").get(), 1231120, 4, ""),
                )
            )
    }

    override fun run(vararg args: String?) {
        /*
        addUsers()
        users.findAll().forEach {
            println(it.getInfo())
        }
        addProperties()
        properties.findAll().forEach {
            println(it.getInfo())
        }
        addEvents()
        events.findAll().forEach {
            println(it.getInfo())
        }
        */
    }


}