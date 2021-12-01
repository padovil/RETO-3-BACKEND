package mintic.reto1.Service;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mintic.reto1.Model.Footwears;
import mintic.reto1.Repository.FootwearsRepository;


@Service
public class FootwearsService {
    @Autowired
    private FootwearsRepository FootwearsRepository;

    public List<Footwears> getAll() {
        return FootwearsRepository.getAll();
    }

   public Optional<Footwears> getFootwears(String reference) {
        return FootwearsRepository.getFootwears(reference);
    }

    public Footwears create(Footwears Footwears) {
        if (Footwears.getReference() == null) {
            return Footwears;
        } else {
            return FootwearsRepository.create(Footwears);
        }
    }

    public Footwears update(Footwears Footwears) {

        if (Footwears.getReference() != null) {
            Optional<Footwears> FootwearsDb = FootwearsRepository.getFootwears(Footwears.getReference());
            if (!FootwearsDb.isEmpty()) {
                
                if (Footwears.getBrand()!= null) {
                    FootwearsDb.get().setBrand(Footwears.getBrand());
                }
                
                if (Footwears.getCategory() != null) {
                    FootwearsDb.get().setCategory(Footwears.getCategory());
                }

                if (Footwears.getMaterial() != null) {
                    FootwearsDb.get().setMaterial(Footwears.getMaterial());
                }

                if (Footwears.getGender() != null) {
                    FootwearsDb.get().setGender(Footwears.getGender());
                }

                if (Footwears.getSize() != null) {
                    FootwearsDb.get().setSize(Footwears.getSize());
                }
                
                if (Footwears.getDescription() != null) {
                    FootwearsDb.get().setDescription(Footwears.getDescription());
                }
                if (Footwears.getPrice() != 0.0) {
                    FootwearsDb.get().setPrice(Footwears.getPrice());
                }
                if (Footwears.getQuantity() != 0) {
                    FootwearsDb.get().setQuantity(Footwears.getQuantity());
                }
                if (Footwears.getPhotography() != null) {
                    FootwearsDb.get().setPhotography(Footwears.getPhotography());
                }
                
                FootwearsDb.get().setAvailability(Footwears.isAvailability());
                FootwearsRepository.update(FootwearsDb.get());
                return FootwearsDb.get();
            } else {
                return Footwears;
            }
        } else {
            return Footwears;
        }
    }

    public boolean delete(String reference) {
        Boolean aBoolean = getFootwears(reference).map(Footwears -> {
            FootwearsRepository.delete(Footwears);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
}
