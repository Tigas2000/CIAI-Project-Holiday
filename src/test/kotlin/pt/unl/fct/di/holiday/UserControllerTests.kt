package pt.unl.fct.di.holiday

import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import pt.unl.fct.di.holiday.presentation.UserDataTransferObject

@RunWith(SpringRunner::class)
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTests() {
    @Autowired
    lateinit var mockMvc: MockMvc


    @Autowired
    lateinit var objectMapper: ObjectMapper


    private final val user0 = UserDataTransferObject(
        11,
        "CLIENT",
        "userTest1",
        "passwordTest1"
    )

    private final val user2 = UserDataTransferObject(
        12,
        "CLIENT",
        "userTest2",
        "passwordTest2"
    )

    private final val user3 = UserDataTransferObject(
        13,
        "OWNER",
        "userTest3",
        "passwordTest3"
    )

    private final val user4 = UserDataTransferObject(
        14,
        "MANAGER",
        "userTest4",
        "passwordTest4"
    )

    @Test
    fun getUsersList() {
        mockMvc.get("/users/list") {
            accept = MediaType.APPLICATION_JSON
        }
            .andExpect {
                status { isOk() }
            }
    }
    @Test
    fun getUserById() {
        mockMvc.get("/users/client1") {
            accept = MediaType.APPLICATION_JSON
        }
            .andExpect {
                status { isOk() }
            }
    }
}