package pt.unl.fct.di.holiday.presentation

import io.swagger.annotations.Api
import org.springframework.web.bind.annotation.RequestMapping

@Api(value = "Authentication", description = "Authentication management", tags = ["Authentication"])
@RequestMapping("/auth")
interface AuthAPI {

}