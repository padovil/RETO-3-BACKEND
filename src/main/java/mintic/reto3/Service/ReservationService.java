package mintic.reto3.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import mintic.reto3.Repository.ReservationRepository;
import mintic.reto3.Model.Reservation;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Transactional (readOnly = true)
    public List<Reservation> getAll(){
        return (List <Reservation>) reservationRepository.getAll();
    }

    @Transactional (readOnly = true)
    public Optional<Reservation> getReservation(int id){
        return reservationRepository.getReservation(id);
    }

    // @Transactional (readOnly = true)
    public Reservation save(Reservation Reservation){
        if(Reservation.getIdReservation()==null){
            // String status="created";
            // Reservation.setStatus(status);
            return reservationRepository.save(Reservation);
        }else{
            // Optional<Reservation> aux = reservationRepository.getReservation(Reservation.getIdReservation());
            // if(aux.isEmpty()){
                
                return reservationRepository.save(Reservation);
            // }else{
            //     return Reservation;
            // }
        }
    }

    public Reservation update(Reservation Reservation){
        if(Reservation.getIdReservation()!=null){
            Optional<Reservation>g=reservationRepository.getReservation(Reservation.getIdReservation());

            // if(!g.isEmpty()){

                if(Reservation.getStartDate() !=null){
                    g.get().setStartDate(Reservation.getStartDate());
                }

                if(Reservation.getDevolutionDate() !=null){
                    g.get().setDevolutionDate(Reservation.getDevolutionDate());
                }

                // if(Reservation.getIdClient() !=null){
                //     g.get().setIdClient(Reservation.getIdClient());
                // }

                // if(Reservation.getIdCostume() !=null){
                //     g.get().setIdCostume(Reservation.getIdCostume());
                // }

                ///////score
                return reservationRepository.save(g.get());
            // }
        }
        return Reservation;
    }

    @Transactional 
    public void deleteReservation(int id){
        reservationRepository.delete(id);
    }


}
