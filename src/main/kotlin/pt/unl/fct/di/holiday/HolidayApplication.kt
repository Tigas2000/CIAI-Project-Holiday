package pt.unl.fct.di.holiday

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class HolidayApplication

fun main(args: Array<String>) {
	try {
		runApplication<HolidayApplication>(*args)
	} catch (e: Exception) {
		e.printStackTrace();
	}
}
