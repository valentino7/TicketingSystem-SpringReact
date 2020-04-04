package it.uniroma2.ticketingsystem.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Component
@NoArgsConstructor
@Document(collection = "users")
public class User {

	@Id // Perche' e' necessario avere l'attributo id anche se Mongo lo crea in automatico?
	private String id;

	@Field("name")
	private String name;

	@Field("surname")
	private String surname;

	@Field("email")
	private String email;

	@Field("username")
	@Indexed(unique=true)
	private String username;

	@Field("password")
	private String password;

	@Field("role")
	private String role;

	@Field("enabled")
	private Boolean enabled = true;

// Perche' non riesce a fare autowiring con costruttore ?
//    public User(String name, String surname, String username, String password) {
//        this.name = name;
//        this.surname = surname;
//        this.username = username;
//        this.password = password;
//    }

	public void updateUser(@NotNull User updatedUser) {
		this.name = updatedUser.name;
		this.surname = updatedUser.surname;
		this.email = updatedUser.email;
		this.password = updatedUser.password;
		this.role = updatedUser.role;
	}

	public void deleteUser() {
		this.enabled = false;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
    
	public String getSurname() {
		return surname;
	}


	public String getId() {
		return id;
	}
}
