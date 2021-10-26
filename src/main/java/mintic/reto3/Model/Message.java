package mintic.reto3.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name="Message")

public class Message implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idMessage;

    private String messageText;

    @ManyToOne
    @JoinColumn(name="idCostume")
    @JsonIgnoreProperties({"messages","reservations"})
    private Costume costume;

    @ManyToOne
    @JoinColumn(name="idClient")
    @JsonIgnoreProperties({"messages","reservations","client"})
    private Client client;

    public Message(Integer idMessage, String messageText, Costume costume, Client client) {
        this.idMessage = idMessage;
        this.messageText = messageText;
        this.costume = costume;
        this.client = client;
    }

    public Message() {
    }

    public Integer getIdMessage() {
        return idMessage;
    }

    public void setIdMessage(Integer idMessage) {
        this.idMessage = idMessage;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public Costume getCostume() {
        return costume;
    }

    public void setCostume(Costume costume) {
        this.costume = costume;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    

    
    
    
}
