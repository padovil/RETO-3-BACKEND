package mintic.reto1;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;

import mintic.reto1.Model.Footwears;
import mintic.reto1.Model.User;
import mintic.reto1.Repository.Crud.FootwearsCrudRepository;
import mintic.reto1.Repository.Crud.UserCrudRepository;

@Component
@SpringBootApplication
@EnableConfigurationProperties
public class Reto1Application implements CommandLineRunner {
    

	@Autowired
    private FootwearsCrudRepository FootwearsCrudRepository;
    @Autowired
    private UserCrudRepository UserCrudRepository;

	public static void main(String[] args) {
		SpringApplication.run(Reto1Application.class, args);
	}

	@Override
    public void run(String... args) throws Exception {
        FootwearsCrudRepository.deleteAll();
        UserCrudRepository.deleteAll();
        // UserCrudRepository.saveAll(List.of(
        //     new User( 1, "123456", "alan brito", "CR 34-45", "311222222",  "alanbrito@gmail.com",  "Demo123.",  "ZONA 1",  "COORD"),
        //     new User( 2, "123456", "alan brito", "CR 34-45", "311222222",  "alanbrito@gmail.com",  "Demo123.",  "ZONA 1",  "COORD"),
        //     new User( 3, "123456", "alan brito", "CR 34-45", "311222222",  "alanbrito@gmail.com",  "Demo123.",  "ZONA 1",  "COORD"),
        //     new User( 4, "123456", "alan brito", "CR 34-45", "311222222",  "alanbrito@gmail.com",  "Demo123.",  "ZONA 1",  "COORD"),
        //     new User( 5, "123456", "alan brito", "CR 34-45", "311222222",  "alanbrito@gmail.com",  "Demo123.",  "ZONA 1",  "COORD")        
        // ));

        // FootwearsCrudRepository.saveAll(List.of(
        //     new Footwears( "ABX-202","ITLO", "CASUAL","LEATHER", "MAN", "40", "Zapatos italianos de alta calidad", true,450000, 23,"domo.jpg"),
        //     new Footwears( "ABX-302","ITLO", "CASUAL","LEATHER", "MAN", "40", "Zapatos italianos de alta calidad", true,450000, 23,"domo.jpg")
            
        
        // ));

        // System.out.println("Listado");
        // UserCrudRepository.findAll().forEach(System.out::println);

        // System.out.println("Listado");
        // FootwearsCrudRepository.findAll().forEach(System.out::println);
    }

}
