package pt.unl.fct.di.holiday

import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc

@RunWith(SpringRunner::class)
@SpringBootTest
@AutoConfigureMockMvc
class EventControllerTests {

    @Autowired
    lateinit var mockMvc: MockMvc


    @Autowired
    lateinit var objectMapper: ObjectMapper

    //@Test
    //fun getEventByPropertyAndDate() {
    //    mockMvc.get("events/info/property=Casa_da_praia&date=2023-12-12") {
    //        accept = MediaType.APPLICATION_JSON
    //    }
    //        .andExpect {
    //            status { isOk() }
    //        }
    //}

}