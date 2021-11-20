package mintic.reto1.Controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

import mintic.reto1.Service.UserService;
import mintic.reto1.Model.User;


@RestController
@RequestMapping("/api/user")

@CrossOrigin(origins="*", methods = {RequestMethod.GET,RequestMethod.PUT,RequestMethod.POST,RequestMethod.DELETE})//responde peticiones desde cualquier lado
public class UserController {
    
    @Autowired
    private UserService UserService;

    @GetMapping("/all")
    public List<User> getUsers(){
        return UserService.getAll();
    }


    @GetMapping("/{user_email}")
    public boolean getByUserEmail(@PathVariable("user_email") String email){//toma como variable lo que llega en la ruta
        
            if(UserService.getByEmail(email)== null){
                return false;
            }
            return true;

            // return UserService.getByEmail(email) == null ;
        
       
    }

    @GetMapping("/{user_email}/{user_password}")
    public User getByUserEmailAndUserPassword(@PathVariable("user_email") String email, @PathVariable("user_password") String password){//toma como variable lo que llega en la ruta
        return UserService.getByEmailAndPassword(email,password);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)//status 201
    public User save(@RequestBody User User){ //es pra  que los parametros del json lleguen bien como un modelo
        return UserService.save(User);
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)//status 201
    public String deleteUser(@PathVariable("id") int id){
        UserService.deleteUser(id);
        return "redirect:/";
    }
}
