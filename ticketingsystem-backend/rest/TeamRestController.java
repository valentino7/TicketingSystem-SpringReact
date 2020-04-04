package it.uniroma2.ticketingsystem.rest;

import it.uniroma2.ticketingsystem.domain.DBReference;
import it.uniroma2.ticketingsystem.domain.Team;
import it.uniroma2.ticketingsystem.domain.Team_extended;
import it.uniroma2.ticketingsystem.domain.User;
import it.uniroma2.ticketingsystem.service.TeamService;
import it.uniroma2.ticketingsystem.service.UserService;
import it.uniroma2.ticketingsystem.util.exception.EntityNotFoundException;
import it.uniroma2.ticketingsystem.util.exception.MemberWithPendingTickets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/teams")
@CrossOrigin
public class TeamRestController {

    @Autowired
    private TeamService teamService;

    @Autowired
    private UserService userService;

    // API

    // find

    @RequestMapping(path = "", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<Team>> findAll() {
        ArrayList<Team> teams = teamService.findAllTeams();
        return new ResponseEntity<>(teams, HttpStatus.OK);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Team> findOne(@PathVariable String id) throws EntityNotFoundException {
        Team retrievedTeam = teamService.findTeamById(id);
        return new ResponseEntity<>(retrievedTeam, retrievedTeam == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }
    
    
    @RequestMapping(path = "/w_team_leader_surname", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<Team_extended>> findAll_with_team_leader_surname() {
        ArrayList<Team_extended> teams = teamService.findAllTeams_with_team_leader_surname();
        return new ResponseEntity<>(teams, HttpStatus.OK);
    }

    /**
     * Ottiene il team leader di un certo team.
     * @param id E' l'id del team di cui si vuole ottenere il team leader
     * @return Il JSON del team leader
     */
    @RequestMapping(path = "/{id}/team_leader", method = RequestMethod.GET)
    public ResponseEntity<User> findTeamLeader(@PathVariable String id) {
        Team team;
        try {
            team = teamService.findTeamById(id);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (team == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        User teamLeader;
        try {
            teamLeader = userService.findUserById(team.getTeamLeader().getId());
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(teamLeader, teamLeader == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @RequestMapping(path = "/{id}/members", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<User>> findTeamMembers(@PathVariable String id) throws EntityNotFoundException {

        ArrayList<User> teamMembers = new ArrayList<>();

        Team team = teamService.findTeamById(id);
        if (team == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        for (DBReference dbReference : team.getTeamMembers()) {
            teamMembers.add(userService.findUserById(dbReference.getId()));
        }

        return new ResponseEntity<>(teamMembers, HttpStatus.OK);
    }

    // create

    @RequestMapping(path = "", method = RequestMethod.POST)
    public ResponseEntity<Team> create(@RequestBody Team team) {
        Team savedTeam = teamService.createTeam(team);

        return new ResponseEntity<>(savedTeam, HttpStatus.CREATED);
    }

    // update

    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Team> update(@PathVariable String id, @RequestBody Team team) {
        Team updatedTeam = null;
        try {
			updatedTeam = teamService.updateTeam(id, team); 
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(team, HttpStatus.NOT_FOUND);
        } catch (MemberWithPendingTickets e) {};
        return new ResponseEntity<>(updatedTeam, HttpStatus.OK);
    }

    // delete

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> delete(@PathVariable String id) throws EntityNotFoundException {
        boolean deleted = teamService.deleteTeam(id);
        return new ResponseEntity<>(deleted, deleted ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }
}
