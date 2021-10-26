package mintic.reto3.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
// import org.springframework.transaction.annotation.Transactional;

import mintic.reto3.Model.Costume;
import mintic.reto3.Repository.Crud.CostumeCrudRepository;

@Repository
public class CostumeRepository {
    
    @Autowired
    private CostumeCrudRepository costumeCrudRepository;
    
    public List<Costume> getAll(){
        return  (List<Costume>) costumeCrudRepository.findAll();
    }

    public Optional<Costume> getCostume(int id){
        return costumeCrudRepository.findById(id);
    }

    public Costume save(Costume costume){
        return costumeCrudRepository.save(costume);
    }

    public void delete(int id){
        costumeCrudRepository.deleteById(id);        
    }

}
