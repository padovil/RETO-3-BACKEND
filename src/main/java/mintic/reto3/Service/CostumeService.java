package mintic.reto3.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import mintic.reto3.Repository.CostumeRepository;
import mintic.reto3.Model.Costume;

@Service
public class CostumeService {

    @Autowired
    private CostumeRepository costumeRepository;

    @Transactional (readOnly = true)
    public List<Costume> getAll(){
        return (List <Costume>) costumeRepository.getAll();
    }

    @Transactional (readOnly = true)
    public Optional<Costume> getCostume(int id){
        return costumeRepository.getCostume(id);
    }

    // @Transactional (readOnly = true)
    public Costume save(Costume costume){
        if(costume.getId()==null){
            return costumeRepository.save(costume);
        }else{
            // Optional<Costume> aux = costumeRepository.getCostume(costume.getId());
            // if(aux.isEmpty()){
                return costumeRepository.save(costume);
            // }else{
            //     return costume;
            // }
        }
    }

    public Costume update(Costume costume){
        if(costume.getId()!=null){
            Optional<Costume>g=costumeRepository.getCostume(costume.getId());

            // if(!g.isEmpty()){
                if(costume.getBrand()!=null){
                    g.get().setBrand(costume.getBrand());
                    
                }

                if(costume.getYear()!=null){
                    g.get().setYear(costume.getYear());
                }

                
                // if(costume.getCategory().getId() !=null){
                //     g.get().setCategory(costume.getCategory().getId());                
                // }

                if(costume.getName() !=null){
                    g.get().setName(costume.getName());
                }
          
          
                if(costume.getDescription() !=null){
                    g.get().setDescription(costume.getDescription());
                }
          
          
                return costumeRepository.save(g.get());
            // }
        }
        return costume;
    }

    @Transactional 
    public void deleteCostume(int id){
        costumeRepository.delete(id);
    }


}
