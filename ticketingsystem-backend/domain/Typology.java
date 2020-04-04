package it.uniroma2.ticketingsystem.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;

@NoArgsConstructor
@Getter
@Setter
public class Typology {

    @Field("id")
    private int id;

    @Field("additional_field")
    private ArrayList<AdditionalField> additionalFields;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ArrayList<AdditionalField> getAdditionalFields() {
        return additionalFields;
    }

    public void setAdditionalFields(ArrayList<AdditionalField> additionalFields) {
        this.additionalFields = additionalFields;
    }
}
