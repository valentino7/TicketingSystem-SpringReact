package it.uniroma2.ticketingsystem.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Component
public class UserSettings {

    @Field("user_roles_internal")
    private ArrayList<UserRole> userRolesInternal = null;

    @Field("user_roles_external")
    private ArrayList<UserRole> userRolesExternal = null;

    public ArrayList<UserRole> getUserRolesInternal() {
        return userRolesInternal;
    }
    public ArrayList<UserRole> getUserRolesExternal() {
        return userRolesExternal;
    }
}
