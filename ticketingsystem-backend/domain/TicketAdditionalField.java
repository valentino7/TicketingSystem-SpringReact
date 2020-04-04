package it.uniroma2.ticketingsystem.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

@NoArgsConstructor
@Setter
@Getter
public class TicketAdditionalField {

    @Field("id")
    private int id;

    @Field("type")
    private String type;

    @Field("enabled")
    private boolean enabled = true;

    public boolean isEnabled(){
        return enabled;
    }

    public int getId(){
        return this.id;
    }

    public void setId(int i) {
        this.id = i;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
