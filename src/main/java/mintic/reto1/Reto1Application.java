package mintic.reto1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EntityScan(basePackages = {"mintic.reto1.Model"})
@SpringBootApplication
@EnableConfigurationProperties

public class Reto1Application {

	public static void main(String[] args) {
		SpringApplication.run(Reto1Application.class, args);
	}

}
