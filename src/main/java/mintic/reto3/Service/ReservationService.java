package mintic.reto3.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import mintic.reto3.Repository.ReservationRepository;
import mintic.reto3.Model.Reservation;
import mintic.reto3.Reports.CountClient;
import mintic.reto3.Reports.ReservationStatus;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;



/**
 * @Author Angie Aldana
 * Clase reservaciones service
 */
@Service
public class ReservationService {

    /**
     * Inyeccion de dependencias del repositorio
     */
    @Autowired
    private ReservationRepository reservationRepository;

    /**
     * Metodo para obtener todos los registros
     */
    @Transactional (readOnly = true)
    public List<Reservation> getAll(){
        return (List <Reservation>) reservationRepository.getAll();
    }

    /**
     * Metodo para obtener una reservacion por ID
     */
    @Transactional (readOnly = true)
    public Optional<Reservation> getReservation(int id){
        return reservationRepository.getReservation(id);
    }

    /**
     * Metodo para guardar registros
     * @param Reservation
     * @return
     */
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

    /**
     * Metodo para actualizar registros
     * @param Reservation
     * @return
     */
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

                if(Reservation.getScore() !=null){
                    g.get().setScore(Reservation.getScore());
                }

                if(Reservation.getStatus() !=null){
                    g.get().setStatus(Reservation.getStatus());
                }

                ///////score
                return reservationRepository.save(g.get());
            // }
        }
        return Reservation;
    }

    /**
     * Metodo para borrar registros
     * @param id
     */
    @Transactional 
    public void deleteReservation(int id){
        reservationRepository.delete(id);
    }


    public ReservationStatus   getReservationStatusReport(){
        List<Reservation> completed=reservationRepository.getReservationByStatus("completed");
        List<Reservation> cancelled=reservationRepository.getReservationByStatus("cancelled");
        return new ReservationStatus(completed.size(),cancelled.size());
    }

    public List<Reservation> getReservationPeriod(String dateOne,String dateTwo){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date startDate = dateFormat.parse(dateOne);
            Date endDate = dateFormat.parse(dateTwo);
            if(startDate.before(endDate)){
                return reservationRepository.getReservationPeriod(startDate,endDate);
            }
        }catch (Exception exception){
               exception.printStackTrace();
        }
        return new ArrayList<>();
    }

    public List<CountClient> getTopClients(){
       return reservationRepository.getTopClient();
    }
}
