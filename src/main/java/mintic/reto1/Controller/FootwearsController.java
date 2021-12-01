package mintic.reto1.Controller;

import mintic.reto1.Model.Footwears;
import mintic.reto1.Service.FootwearsService;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/accessory")
@CrossOrigin("*")
public class FootwearsController {
    @Autowired
    private FootwearsService footwearsService;
       
     @GetMapping("/all")
    public List<Footwears> getAll() {
        return footwearsService.getAll();
    }
    
    @GetMapping("/{reference}")
    public Optional<Footwears> getFootwears(@PathVariable("reference") String reference) {
        return footwearsService.getFootwears(reference);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Footwears create(@RequestBody Footwears gadget) {
        return footwearsService.create(gadget);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Footwears update(@RequestBody Footwears gadget) {
        return footwearsService.update(gadget);
    }

    @DeleteMapping("/{reference}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("reference") String reference) {
        return footwearsService.delete(reference);
    } 
    
}

