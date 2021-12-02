package mintic.reto1.Model;

// import javax.persistence.Column;
// import javax.persistence.Entity;
// import javax.persistence.GeneratedValue;
// import javax.persistence.GenerationType;
import javax.persistence.Id;
// import javax.persistence.Table;

// import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
// import org.springframework.data.mongodb.core.mapping.Field;

// import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
// @Setter @Getter

// @Entity
// @Table(name="user")
@Document(collection = "usuarios")
public class User {

    // @Transient
    // public static final String SEQUENCE_NAME = "user_sequence";

    @Id
    private Integer id;

    private String identification;
    private String name;
    private String address;
    private String cellPhone;
    private String email;
    private String password;
    private String zone;
    private String type;

}
