package it.uniroma2.ticketingsystem.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@Component
@Document(collection = "ticket")
public class Ticket {

    @Id
    private String id;

    @Field("state")
    private String state;  // open, pending, closed

    @Field("field_ref")
    private ArrayList<AdditionalFieldsValue> additionalFieldsValue;  // campi aggiuntivi, riferimento alla collezione system_file

    @Field("source_ref")
    private DBReference source; // sorgente, riferimento alla collezione user

    @Field("target_ref")
    private DBReference target; //target, riferimento alla collezione target

    @Field("assegnee_ref")
    private DBReference assegnee; //assegnatario, riferimento alla collezione user

    @Field("object")
    private String object; //nome del ticket

    @Field("description")
    private String description;

    @Field("category")
    private String category;

    @Field("attachment")
    private String attachment;

    @Field("timestamp")
    private long timestamp;

    @Field("customerPriority")
    private int customerPriority;

    @Field("teamPriority")
    private int teamPriority;

    @Field("visibility")
    private String visibility;

    @Field("enabled")
    private Boolean enabled = true;

    public void update_ticket(String object, String description, DBReference target) {
        this.additionalFieldsValue = new ArrayList<>();
        this.target = target ;
        this.assegnee = new DBReference("5b3025b0ea2aaa145c8587fe", "users");
        this.source = new DBReference("5b3022c5ea2aaa145c8587fc", "users");
        this.object = object;
        this.state = "";
        this.attachment = "";
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void deleteTicket() {
        this.enabled = false;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public DBReference getSource() {
        return source;
    }

    public void setSource(DBReference source) {
        this.source = source;
    }

    public void setAssegneee(DBReference newTeamLeader) {
        this.assegnee = newTeamLeader;
    }

    public DBReference getTarget() {
        return target;
    }

    public void setTarget(DBReference target) {
        this.target = target;
    }

    public DBReference getAssegnee() {
        return assegnee;
    }

    public void setAssegnee(DBReference assegnee) {
        this.assegnee = assegnee;
    }

    public ArrayList<AdditionalFieldsValue> getAdditionalFieldsValue() {
        return additionalFieldsValue;
    }

    public void setAdditionalFieldsValue(ArrayList<AdditionalFieldsValue> additionalFieldsValue) {
        this.additionalFieldsValue = additionalFieldsValue;
    }

    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}

