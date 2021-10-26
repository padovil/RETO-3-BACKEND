package mintic.reto3.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
// import org.springframework.transaction.annotation.Transactional;

import mintic.reto3.Model.Client;
import mintic.reto3.Repository.Crud.ClientCrudRepository;

@Repository
public class ClientRepository {
    
    @Autowired
    private ClientCrudRepository clientCrudRepository;
    
    public List<Client> getAll(){
        return  (List<Client>) clientCrudRepository.findAll();
    }

    public Optional<Client> getClient(int id){
        return clientCrudRepository.findById(id);
    }

    public Client save(Client Client){
        return clientCrudRepository.save(Client);
    }

    public void delete(int id){
        clientCrudRepository.deleteById(id);        
    }

}
