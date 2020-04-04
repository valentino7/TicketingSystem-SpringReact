package it.uniroma2.ticketingsystem.repository;

import it.uniroma2.ticketingsystem.domain.DBReference;
import it.uniroma2.ticketingsystem.domain.Team;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface TeamRepository extends MongoRepository<Team, String> {

    Team findTeamById(String id);

    ArrayList<Team> findAll();
    ArrayList<Team> findTeamByTeamLeader(DBReference teamLeader);
    ArrayList<Team> findTeamByTeamMembers(DBReference teamMember);
}
