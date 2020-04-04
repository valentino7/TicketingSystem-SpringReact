package it.uniroma2.ticketingsystem.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Field;


@NoArgsConstructor
@Getter
@Setter
public class DBReference {

    @Field("id")
    private String id;  //id del campo a cui si fa riferimento
    private String value;
    @Field("ref")
    private String ref; // nome della collezione a cui si fa riferimento

    public DBReference(String id, String ref) {
        this.id = id;
        this.ref = ref;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRef() {
        return ref;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (!DBReference.class.isAssignableFrom(obj.getClass())) {
            return false;
        }
        final DBReference other = (DBReference) obj;
        if ((this.id == null) ? (other.id != null) : !this.id.equals(other.id)) {
            return false;
        }
        if ((this.ref == null) ? (other.ref != null) : !this.ref.equals(other.ref)) {
            return false;
        }
        return true;
    }
}
