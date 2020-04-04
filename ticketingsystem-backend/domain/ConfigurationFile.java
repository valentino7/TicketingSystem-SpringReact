package it.uniroma2.ticketingsystem.domain;

import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@Component
@Document(collection = "system_file")
public class ConfigurationFile {

    @Id
    private String id;

    @Field("user_settings")
    private UserSettings userSettings;

    @Field("ticket_settings")
    private TicketSettings ticketSettings;

    @Field("team_settings")
    private TeamSettings teamSettings;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public UserSettings getUserSettings(){
        return this.userSettings;
    }

    public TicketSettings getTicketSettings(){ return this.ticketSettings; }

    public TeamSettings getTeamSettings() { return this.teamSettings; }

    public void setUserSettings(UserSettings userSettings) {
        this.userSettings = userSettings;
    }

    public void setTicketSettings(TicketSettings ticketSettings) {
        this.ticketSettings = ticketSettings;
    }

    public void setTeamSettings(TeamSettings teamSettings) {
        this.teamSettings = teamSettings;
    }
}
