package it.uniroma2.ticketingsystem.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Field;

@NoArgsConstructor
@Getter
@Setter
public class AdditionalField {

    @Field("id")
    private int id;

    @Field("name")
    private String name;

    @Field("placeholder")
    private String placeholder;

    @Field("regularExp")
    private String regularExp;

    @Field("additional_fields_ref")
    private FieldReference ref; // riferimento ad un TicketAdditionalFields

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public FieldReference getRef() {
        return ref;
    }

    public void setRef(FieldReference ref) {
        this.ref = ref;
    }

    public String getRegularExp() {
        return regularExp;
    }

    public void setRegularExp(String regularExp) {
        this.regularExp = regularExp;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
