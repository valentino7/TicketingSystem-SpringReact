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
@NoArgsConstructor
@Component
@Document(collection = "teams")
public class Team {
	@Id
	protected String id;

	@Field("type")
	protected String type;

	@Field("team_leader_ref")
	protected DBReference teamLeader;

	@Field("team_members_ref")
	protected ArrayList<DBReference> teamMembers;

	@Field("product")
	protected String product; // Deve essere opzionale

	@Field("enabled")
	protected Boolean enabled = true;

	public void updateTeam(@NotNull Team updatedTeam) {
		this.type = updatedTeam.type;
		this.teamLeader = updatedTeam.teamLeader;
		this.teamMembers = updatedTeam.teamMembers;
		this.product = updatedTeam.product;
		this.enabled = updatedTeam.isEnabled();
	}

	public void deleteTeam() {
		this.enabled = false;
	}

	public DBReference getTeamLeader() {
		return teamLeader;
	}

	public ArrayList<DBReference> getTeamMembers(){
		return teamMembers;
	}

	public boolean isEnabled() {
		return enabled;
	}
	public int countTeamLeader() {
		if(teamLeader.getId() == null)
			return 0;
		return 1;
	}
    
	public int countTeamMembers() {
		return teamMembers.size();
	}

	public void setTeamLeader(DBReference newTeamLeader) {
		this.teamLeader=newTeamLeader;
	}

	public String getId() {
		return this.id;
	}

	public void addTeamMember(DBReference newMember) {
		this.teamMembers.add(0, newMember);
		
	}

	public void setTeamMembers(ArrayList<DBReference> temp_ref_team) {
		this.teamMembers = temp_ref_team;
		
	}
}
