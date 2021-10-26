package mintic.reto3.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import mintic.reto3.Repository.ClientRepository;
import mintic.reto3.Model.Client;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Transactional (readOnly = true)
    public List<Client> getAll(){
        return (List <Client>) clientRepository.getAll();
    }

    @Transactional (readOnly = true)
    public Optional<Client> getClient(int id){
        return clientRepository.getClient(id);
    }

    // @Transactional (readOnly = true)
    public Client save(Client Client){
        if(Client.getIdClient()==null){
            return clientRepository.save(Client);
        }else{
            // Optional<Client> aux = clientRepository.getClient(Client.getIdClient());
            // if(aux.isEmpty()){
                return clientRepository.save(Client);
            // }else{
            //     return Client;
            // }
        }
    }

    public Client update(Client Client){
        if(Client.getIdClient()!=null){
            Optional<Client>g=clientRepository.getClient(Client.getIdClient());

            // if(!g.isEmpty()){
                if(Client.getEmail()!=null){
                    g.get().setEmail(Client.getEmail());                    
                }

                if(Client.getPassword()!=null){
                    g.get().setPassword(Client.getPassword());
                }

                if(Client.getName() !=null){
                    g.get().setName(Client.getName());
                }

                if(Client.getAge() !=null){
                    g.get().setAge(Client.getAge());
                }
          
          /////////////////////////////////////cliente admin
                return clientRepository.save(g.get());
            // }
        }
        return Client;
    }

    @Transactional 
    public void deleteClient(int id){
        clientRepository.delete(id);
    }


}
