package mintic.reto3.Controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

import mintic.reto3.Service.ReservationService;
import mintic.reto3.Model.Reservation;


@RestController
@RequestMapping("/api/Reservation")

@CrossOrigin(origins="*", methods = {RequestMethod.GET,RequestMethod.PUT,RequestMethod.POST,RequestMethod.DELETE})//responde peticiones desde cualquier lado
public class ReservationController {
    
    @Autowired
    private ReservationService reservationService;

    @GetMapping("/all")
    public List<Reservation> getReservations(){
        return reservationService.getAll();
    }


    @GetMapping("/{id}")
    public Optional<Reservation> getReservation(@PathVariable("id") int id){//toma como variable lo que llega en la ruta
        return reservationService.getReservation(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)//status 201
    public Reservation save(@RequestBody Reservation Reservation){ //es pra  que los parametros del json lleguen bien como un modelo
        return reservationService.save(Reservation);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)//status 201
    public Reservation update(@RequestBody Reservation Reservation){ //es pra  que los parametros del json lleguen bien como un modelo
        return reservationService.update(Reservation);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)//status 201
    public String deleteReservation(@PathVariable("id") int id){
        reservationService.deleteReservation(id);
        return "redirect:/";
    }
}
