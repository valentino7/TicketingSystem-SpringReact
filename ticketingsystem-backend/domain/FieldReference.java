package it.uniroma2.ticketingsystem.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Field;


@NoArgsConstructor
@Getter
@Setter
public class FieldReference {


    @Field("id")
    private int id;  //id del campo a cui si fa riferimento
    private String name;
    private String type;
    @Field("ref")
    private String ref; // nome della collezione a cui si fa riferimento

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
