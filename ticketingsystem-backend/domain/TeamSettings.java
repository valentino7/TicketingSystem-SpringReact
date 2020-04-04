package it.uniroma2.ticketingsystem.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class TeamSettings {

    @Field("team_names")
    private ArrayList<TeamName> teamNames = null;

    public ArrayList<TeamName> getTeamNames() {
        return this.teamNames;
    }
}
