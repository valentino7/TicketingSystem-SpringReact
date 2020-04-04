package it.uniroma2.ticketingsystem.service;

import java.util.concurrent.ThreadLocalRandom;
import java.util.function.Function;

import it.uniroma2.ticketingsystem.domain.DBReference;
import it.uniroma2.ticketingsystem.domain.Team;
import it.uniroma2.ticketingsystem.domain.Team_extended;
import it.uniroma2.ticketingsystem.domain.User;
import it.uniroma2.ticketingsystem.repository.TeamRepository;
import it.uniroma2.ticketingsystem.util.exception.EntityNotFoundException;
import it.uniroma2.ticketingsystem.util.exception.MemberWithPendingTickets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.HashSet;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private TicketService ticketService;
    
    @Autowired
    private UserService userService;
    
    
    @Transactional
    public Team createTeam(@NotNull Team newTeam) {
        try {
			newTeam=this.checkConsistencyTeam(null,newTeam);
		} catch (MemberWithPendingTickets e){};
        if(newTeam != null) {
        	return teamRepository.save(newTeam);
        }
        return null;
    }

    @Transactional
    public @NotNull Team updateTeam(String id, @NotNull Team newTeam) throws EntityNotFoundException, MemberWithPendingTickets {
        Team teamToUpdate = teamRepository.findTeamById(id);
        if (teamToUpdate == null  || !teamToUpdate.isEnabled())
            throw new EntityNotFoundException();
        
        newTeam=this.checkConsistencyTeam(teamToUpdate, newTeam);
        teamToUpdate.updateTeam(newTeam);

        return teamRepository.save(teamToUpdate);

    }

    @Transactional
    public Team findTeamById(@NotNull String id) throws EntityNotFoundException {
        Team retrievedTeam = teamRepository.findTeamById(id);
        if (retrievedTeam == null || !retrievedTeam.isEnabled())
            throw new EntityNotFoundException();
        return retrievedTeam;
    }

    public ArrayList<Team> findAllTeams() {
        ArrayList<Team> teams = teamRepository.findAll();

        teams.removeIf(team -> !team.isEnabled());
        return teams;
    }

    public boolean deleteTeam(String id) throws EntityNotFoundException {
        Team teamToDelete = teamRepository.findTeamById(id);
        if (teamToDelete == null || !teamToDelete.isEnabled())
            throw new EntityNotFoundException();

        teamToDelete.deleteTeam();

        teamRepository.save(teamToDelete);
        return true;
    }

    @Transactional
    private Team checkConsistencyTeam(Team teamToUpdate, @NotNull Team newTeam) throws MemberWithPendingTickets {
    	
		if(newTeam.countTeamLeader() == 0) {
			if(newTeam.countTeamMembers() != 0) {
				newTeam.setTeamLeader(newTeam.getTeamMembers().get(0));
					if(teamToUpdate != null && teamToUpdate.countTeamLeader() != 0){
						//System.out.println("checkConsistency change owner ticket team leader");
						Function<ArrayList<DBReference>, DBReference> function = TeamService::random_member;
						ticketService.changeTicketOwner_higher_order(teamToUpdate.getTeamLeader(), newTeam.getTeamMembers(), function);
						//ticketService.changeTicketOwner(teamToUpdate.getTeamLeader() ,newTeam.getTeamLeader());
					// Assegnare i ticket del vecchio team leader al nuovo???
					//teamToUpdate.getTeamLeader().getId()
					}
			}
			else if(teamToUpdate != null) {
				for (DBReference temp : teamToUpdate.getTeamMembers()) {
					String string = temp.getId();
					if(string != null) {			
						//ticketService.changeTicketOwner(temp ,newTeam.getTeamMembers().get(0));

						//ticketService.changeTicketOwner(teamToUpdate.getTeamLeader() ,newTeam.getTeamMembers().get(0));
						//Riassegnare i ticket A CHI SE NON CI SONO MEMBRI E TEAMLEADER????
						System.out.println("Membro " + string + " è stato eliminato da gruppo " + teamToUpdate.getId());
						if(ticketService.checkPendingTicketForMember(teamToUpdate.getTeamLeader()) == true) {
							newTeam.setTeamLeader(teamToUpdate.getTeamLeader());
							throw new MemberWithPendingTickets();
						}
					}
				}
				newTeam.deleteTeam();
				return newTeam;
			}
			else
					return null;
		}
		else if(newTeam.countTeamMembers() == 0) {
					if(newTeam.countTeamLeader() != 0) {
						newTeam.addTeamMember(newTeam.getTeamLeader());
					}
		}
		if(teamToUpdate != null) {
			HashSet<String> newMembers = new HashSet<String>();
			for (DBReference temp : newTeam.getTeamMembers()) {
				String string = temp.getId();
				if(string != null)
					newMembers.add(string);
			}
			
			for (DBReference temp : teamToUpdate.getTeamMembers()) {
				String string = temp.getId();
				if(string != null) {
					if(!newMembers.contains(string)) {
						Function<ArrayList<DBReference>, DBReference> function = TeamService::random_member;
						ticketService.changeTicketOwner_higher_order(temp, newTeam.getTeamMembers(), function);


						//ticketService.changeTicketOwner(teamToUpdate.getTeamLeader() ,newTeam.getTeamMembers().get(0));
						//Riassegnare i ticket ???
						System.out.println("Membro " + string + " è stato eliminato da gruppo " + teamToUpdate.getId());
					}	
				}
			}
		}
		
	return newTeam;
    }

    @Transactional
	public ArrayList<Team_extended> findAllTeams_with_team_leader_surname() {
		ArrayList<Team> vanilla_teams = this.findAllTeams();
		ArrayList<Team_extended> extended_teams = new ArrayList<Team_extended>();
		/*
		if(vanilla_teams != null) {
			if(vanilla_teams.size() == 0) {

			}
		}
		*/
		for(Team team : vanilla_teams) {
			Team_extended team_extended = new Team_extended(team);
			DBReference temp = team_extended.getTeamLeader();
			if(temp != null) {
				String id = temp.getId();
				if(id != null) {
					User user = null;
					try {
						user = userService.findUserById(id);
					} catch (EntityNotFoundException e) {
						e.printStackTrace();
					}
					if(user != null) {
						String surname = user.getSurname();
						if(surname != null) {
							team_extended.setTeamLeaderSurname(surname);
						}
					}
					else
						team_extended.setTeamLeaderSurname("E_user_notfound");

				}
				else
					team_extended.setTeamLeaderSurname("E_user_notfound");	
			}
			else
				team_extended.setTeamLeaderSurname("E_user_notfound");
			extended_teams.add(team_extended);
		}
		return extended_teams;
	}

	@Transactional
	public void checkConsistencyTeam(User userToDelete) throws MemberWithPendingTickets {
		DBReference toRemove_ref = new DBReference(userToDelete.getId(),"users");
		ArrayList<Team> team_removeLeader = teamRepository.findTeamByTeamLeader(toRemove_ref);
		DBReference temp_ref = new DBReference(null,null);

		if(team_removeLeader.size()>0) {
			
			for (Team team_temp : team_removeLeader) {
				
				//Team updatedTeam = new Team();
				//updatedTeam.updateTeam(team_temp);
				//updatedTeam.removeTeamLeader();
				
				team_temp.setTeamLeader(temp_ref);
				ArrayList<DBReference> temp_ref_team = team_temp.getTeamMembers();
				while (temp_ref_team.remove(toRemove_ref) != false);
				team_temp.setTeamMembers(temp_ref_team);
				try {
					this.updateTeam(team_temp.getId(), team_temp);
				} catch (EntityNotFoundException e) {
					e.printStackTrace();
				}
			
			}
			
		}
		
	}

	@Transactional
	public static DBReference random_member(ArrayList<DBReference> members) {
		return members.get(ThreadLocalRandom.current().nextInt(0, members.size()));
	}
}
