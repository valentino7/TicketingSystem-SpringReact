package it.uniroma2.ticketingsystem.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;

@NoArgsConstructor
@Setter
@Getter
public class TicketSettings {

    @Field("ticket_categories")
    private ArrayList<TicketCategory> ticketCategories = null;

    @Field("ticket_tipologies")
    private ArrayList<Typology> typology = null;

    @Field("ticket_additional_fields")
    private ArrayList<TicketAdditionalField> additionalField= null;

    @Field("lifecycle_version")
    private ArrayList<LifeCycleVersion> lifecycleVersion = null;

    public ArrayList<TicketCategory> getTicketCategories() {
        return ticketCategories;
    }
    public ArrayList<TicketAdditionalField> getAdditionalField(){
        return this.additionalField;
    }

    public ArrayList<Typology> getTypologies() {
        return typology;
    }

    public void setTypologies(ArrayList<Typology> typology) {
        this.typology = typology;
    }
}
