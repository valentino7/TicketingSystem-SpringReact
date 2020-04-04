package it.uniroma2.ticketingsystem.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Field;

@NoArgsConstructor
@Getter
@Setter
public class UserRole {

    @Field("id")
    private String id;

    @Field("name")
    private String name;

    @Field("enabled")
    private Boolean enabled;

}
