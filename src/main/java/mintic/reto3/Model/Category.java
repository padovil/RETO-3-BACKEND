package mintic.reto3.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.*;


@Entity
@Table(name="Category")

public class Category implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String description;
    
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "category")
    @JsonIgnoreProperties("category")
    public List<Costume> costumes;


    

    public Category() {
    }

    public Category(Integer id, String name, String description, List<Costume> costumes) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.costumes = costumes;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Costume> getCostumes() {
        return costumes;
    }

    public void setCostumes(List<Costume> costumes) {
        this.costumes = costumes;
    }


    
}
