package it.uniroma2.ticketingsystem.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Getter
@Setter
@Component
@Document(collection = "links")
public class Links {
    @Id
    private String id;

    /*@Field("centroids")
    private ArrayList<String> name;*/

    @Field("centroids")
    private ArrayList<ClusterName> name;

    @Field("links")
    private ArrayList<SingolLink> link;

    @Field("target")
    private DBReference target_reference;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ArrayList<ClusterName> getName() {
        return name;
    }

    public void setName(ArrayList<ClusterName> name) {
        this.name = name;
    }

    public DBReference getTarget_reference() {
        return target_reference;
    }

    public void setTarget_reference(DBReference target_reference) {
        this.target_reference = target_reference;
    }

    public ArrayList<SingolLink> getLink() {
        return link;
    }

    public void setLink(ArrayList<SingolLink> link) {
        this.link = link;
    }
}
