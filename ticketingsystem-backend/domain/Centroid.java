package it.uniroma2.ticketingsystem.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Getter
@Setter
@Component
public class Centroid {
    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("examples")
    private ArrayList<DBReference> tickets;

    @Field("target")
    private DBReference target_reference;

    public Centroid() {

    }

    public DBReference getTarget_reference() {
        return target_reference;
    }

    public void setTarget_reference(DBReference target_reference) {
        this.target_reference = target_reference;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ArrayList<DBReference> getTickets() {
        return tickets;
    }

    public void setTickets(ArrayList<DBReference> tickets) {
        this.tickets = tickets;
    }

}
