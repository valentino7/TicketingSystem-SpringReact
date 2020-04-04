package it.uniroma2.ticketingsystem.domain;
import lombok.Getter;
import lombok.Setter;

public class Team_extended extends Team {
	@Getter
	@Setter	

    private String teamLeaderSurname; // Deve essere opzionale
    
	public Team_extended () {
		super();
		
	}

	public Team_extended(Team team) {
		super();
		this.id = team.id;
		this.product = team.product;
		this.teamLeader = team.teamLeader;
		this.teamMembers = team.teamMembers;
		this.type = team.type;
		this.enabled = team.enabled;
	}

	public void setTeamLeaderSurname(String surname) {
		this.teamLeaderSurname = surname;
		
	}
}