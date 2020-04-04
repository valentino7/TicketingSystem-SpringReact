package it.uniroma2.ticketingsystem.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Field;


@NoArgsConstructor
@Getter
@Setter
public class AdditionalFieldsValue {

    @Field("additionalFieldRef")
    private FieldReference additionalFieldRef;
    @Field("value")
    private String value;

    public FieldReference getAdditionalFieldRef() {
        return additionalFieldRef;
    }

    public void setAdditionalFieldRef(FieldReference additionalFieldRef) {
        this.additionalFieldRef = additionalFieldRef;
    }
}
