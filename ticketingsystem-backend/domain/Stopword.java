package it.uniroma2.ticketingsystem.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;


@Getter
@Setter
@Component
@Document(collection = "stopword")
public class    Stopword {

    @Id
    private String id;

    @Field("value")
    private String value;

    @Field("targets")
    private ArrayList<DBReference> targets;

    public Stopword(String value, ArrayList<DBReference> targets) {
        this.value = value;
        this.targets = targets;
    }

    public Stopword(){

    }

    public Stopword(@NotNull Stopword stopword) {
        this.id = stopword.id;
        this.value = stopword.value;
        this.targets = stopword.targets;
    }

    public String getValue() {
        return value;
    }

    public ArrayList<DBReference> getTargets() {
        return targets;
    }

    public void insertTarget(@NotNull String target) {
        this.targets.add(new DBReference(target,"target"));
    }

    public void insertTarget(@NotNull String target, @NotNull String ref) {
        this.targets.add(new DBReference(target,ref));
    }

    public void removeTarget(@NotNull String target) {
        this.targets.removeIf(t->t.getId().equals(target));
    }

    public void copyTargets(ArrayList<DBReference> targets) {
        this.targets = targets;
    }
}
