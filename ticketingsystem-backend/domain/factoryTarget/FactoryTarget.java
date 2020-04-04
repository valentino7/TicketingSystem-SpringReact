package it.uniroma2.ticketingsystem.domain.factoryTarget;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Component
@Document(collection = "target")

public class FactoryTarget {

    @Id
    private String id;
    @Field("name")
    private String name;
    @Field("typology")
    private int typId;
    @Field("version")
    private String version;
    @Field("enabled")
    private boolean enabled = true;
    @Field("category")
    private String category;

    public String getId() {
        return id;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public Target factoryMethod(String type, String name, String version, boolean enabled) {
        Target t = null;
        switch (type) {
            case "Product":
                t = new Product();
            case "Service":
                t = new Service();
            case "Other":
                t = new Other();
        }
        return t;
    }

    public void deleteTarget() {
        this.enabled = false;
    }

    public void updateTarget(@NotNull FactoryTarget newTarget) {
        this.name = newTarget.name;
        this.category = newTarget.category;
        this.version = newTarget.version;
        this.typId = newTarget.typId;
    }

    public int getTypId() {
        return typId;
    }

    public void setTypId(int typId) {
        this.typId = typId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
