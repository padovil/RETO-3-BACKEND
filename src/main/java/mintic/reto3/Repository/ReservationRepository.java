package mintic.reto3.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
// import org.springframework.transaction.annotation.Transactional;

import mintic.reto3.Model.Reservation;
import mintic.reto3.Repository.Crud.ReservationCrudRepository;

@Repository
public class ReservationRepository {
    
    @Autowired
    private ReservationCrudRepository reservationCrudRepository;
    
    public List<Reservation> getAll(){
        return  (List<Reservation>) reservationCrudRepository.findAll();
    }

    public Optional<Reservation> getReservation(int id){
        return reservationCrudRepository.findById(id);
    }

    public Reservation save(Reservation Reservation){
        return reservationCrudRepository.save(Reservation);
    }

    public void delete(int id){
        reservationCrudRepository.deleteById(id);        
    }

}
