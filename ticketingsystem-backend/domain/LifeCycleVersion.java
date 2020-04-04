package it.uniroma2.ticketingsystem.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;

@NoArgsConstructor
@Setter
@Getter
public class LifeCycleVersion {

    @Field("version")
    private int version;

    @Field("states")
    private ArrayList<String> states;

}
