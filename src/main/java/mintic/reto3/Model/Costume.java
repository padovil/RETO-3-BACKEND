package mintic.reto3.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import java.util.List;
/**
 * @Authors Angie Aldana
 */
@Entity
@Table(name="Costume")
public class Costume implements Serializable{

    /**
     * id de la tabla
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // @Column(name="name", length=20)
    /**
     * name
     */
    private String name;

    /**
     * brand
     */
    private String brand;

    /**
     * year
     */
    private Integer year;

    /**
     * descripcion
     */
    private String description;


    /**
     * relacion con category
     */
    @ManyToOne
    @JoinColumn(name="category_id")
    @JsonIgnoreProperties("costumes")
    private Category category;
    
    /**
     * relacion con mensajes
     */
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "costume")
    @JsonIgnoreProperties({"costume","client"})
    public List<Message> messages;


    /**
     * relacion con reservaciones
     */
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "costume")
    @JsonIgnoreProperties("costume")
    public List<Reservation> reservations;


    /**
     * Constructor vacio
     */
    public Costume() {
        //este constructor esta vacio intensionalmente
    }

    /**
     * Constructor de la clase
     * @param id
     * @param name
     * @param brand
     * @param year
     * @param description
     * @param category
     * @param messages
     * @param reservations
     */
    public Costume(Integer id, String name, String brand, Integer year, String description, Category category,
            List<Message> messages, List<Reservation> reservations) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.year = year;
        this.description = description;
        this.category = category;
        this.messages = messages;
        this.reservations = reservations;
    }

    /**
     * obtener id
     * @return
     */
    public Integer getId() {
        return id;
    }

    /**
     * set id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * obtener nombre
     * @return
     */
    public String getName() {
        return name;
    }

    /**
     * set nombre
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * obtener brand
     * @return
     */
    public String getBrand() {
        return brand;
    }

    /**
     * set brand
     * @param brand
     */
    public void setBrand(String brand) {
        this.brand = brand;
    }

    /**
     * obtener año
     * @return
     */
    public Integer getYear() {
        return year;
    }

    /**
     * configurar año
     * @param year
     */
    public void setYear(Integer year) {
        this.year = year;
    }

    /**
     * obtener descripcion
     * @return
     */
    public String getDescription() {
        return description;
    }

    /**
     * configurar descripcion
     * @param description
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * obtener categoria
     * @return
     */
    public Category getCategory() {
        return category;
    }

    /**
     * configurar categoria
     * @param category
     */
    public void setCategory(Category category) {
        this.category = category;
    }

    /**
     * obtener mensaje
     * @return
     */
    public List<Message> getMessages() {
        return messages;
    }

    /**
     * configurar mensaje
     * @param messages
     */
    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    /**
     * obtener reservaciones
     * @return
     */
    public List<Reservation> getReservations() {
        return reservations;
    }

    /**
     * configurar reservaciones
     * @param reservations
     */
    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}
