package it.uniroma2.ticketingsystem.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@Document(collection = "statistics")
public class Statistic {

    @Id
    private String id;

    @Field("purity")
    private float purity;

    @Field("mutual_information")
    private float mutual_information;

    @Field("cluster_entropy")
    private float cluster_entropy;

    @Field("class_entropy")
    private float class_entropy;

    @Field("date")
    private String date;

    @Field("target")
    private DBReference target_reference;

    public Statistic(){

    }

    public Statistic( float purity, float mutual_information, float cluster_entropy,float class_entropy, String date) {
        this.purity = purity;
        this.mutual_information = mutual_information;
        this.cluster_entropy = cluster_entropy;
        this.class_entropy = class_entropy;
        this.date = date;
    }


    public DBReference getTarget_reference() {
        return target_reference;
    }

    public void setTarget_reference(DBReference target_reference) {
        this.target_reference = target_reference;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public float getPurity() {
        return purity;
    }

    public void setPurity(float purity) {
        this.purity = purity;
    }

    public float getMutual_information() {
        return mutual_information;
    }

    public void setMutual_information(float mutual_information) {
        this.mutual_information = mutual_information;
    }

    public float getCluster_entropy() {
        return cluster_entropy;
    }

    public void setCluster_entropy(float cluster_entropy) {
        this.cluster_entropy = cluster_entropy;
    }

    public float getClass_entropy() {
        return class_entropy;
    }

    public void setClass_entropy(float class_entropy) {
        this.class_entropy = class_entropy;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
