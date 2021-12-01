package mintic.reto1.Model;

// import javax.persistence.Column;
// import javax.persistence.Entity;
// import javax.persistence.GeneratedValue;
// import javax.persistence.GenerationType;

import org.springframework.data.annotation.Id;
// import javax.persistence.Table;

import org.springframework.data.mongodb.core.mapping.Document;
// import org.springframework.data.mongodb.core.mapping.Field;
// import org.springframework.data.mongodb.core.mapping.Field;

import lombok.*;
// import lombok.Setter;

// import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
// @Setter @Getter

// @Entity
// @Table(name="user")
@Document(collection = "footwears")
public class Footwears  {
    @Id
    private String reference;

    private String brand;
    private String category;
    private String material;
    private String gender;
    private String size;
    private String description;
    private boolean availability = true;
    private double price;
    private int quantity;
    private String photography;
}
