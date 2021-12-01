package mintic.reto1.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import mintic.reto1.Model.Footwears;
import mintic.reto1.Repository.Crud.FootwearsCrudRepository;

@Repository
public class FootwearsRepository {
    @Autowired
    private FootwearsCrudRepository repository;

    public List<Footwears> getAll() {
        return repository.findAll();
    }

    public Optional<Footwears> getFootwears(String reference) {
        return repository.findById(reference);
    }
    public Footwears create(Footwears Footwears) {
        return repository.save(Footwears);
    }

    public void update(Footwears Footwears) {
        repository.save(Footwears);
    }
    
    public void delete(Footwears Footwears) {
        repository.delete(Footwears);
    }
}
