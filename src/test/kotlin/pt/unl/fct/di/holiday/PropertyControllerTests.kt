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

@RunWith(SpringRunner::class)
@SpringBootTest
@AutoConfigureMockMvc
class PropertyControllerTests {

    @Autowired
    lateinit var mockMvc: MockMvc


    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Test
    fun getPropertyByName() {
        mockMvc.get("/properties/Casa_da_praia") {
            accept = MediaType.APPLICATION_JSON
        }
            .andExpect {
                status { isOk() }
            }
    }
}