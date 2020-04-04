package it.uniroma2.ticketingsystem.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Field;

@NoArgsConstructor
@Setter
@Getter
public class TicketCategory {

    @Field("id")
    private String id;

    @Field("name")
    private String name;

    @Field("enabled")
    private boolean enabled;

    public boolean isEnabled(){
        return enabled;
    }


}