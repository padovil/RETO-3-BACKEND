package mintic.reto1.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.*;
import lombok.Setter;

import java.io.Serializable;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter @Getter

@Entity
@Table(name="user")
public class User implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 50, name = "user_email")
    private String  email;

    @Column(length = 50, name = "user_password")
    private String  password;    

    @Column(length = 80, name = "user_name")
    private String  name;

        
}
