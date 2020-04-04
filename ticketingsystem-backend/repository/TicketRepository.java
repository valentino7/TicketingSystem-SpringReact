package it.uniroma2.ticketingsystem.repository;

import it.uniroma2.ticketingsystem.domain.DBReference;
import it.uniroma2.ticketingsystem.domain.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.ArrayList;

public interface TicketRepository extends MongoRepository<Ticket, String> {

    Page<Ticket> findAll(Pageable pageable);

    ArrayList<Ticket> findAll();

    Ticket findTicketById(String id);

    ArrayList<Ticket> findTicketsByObject(String object);

    ArrayList<Ticket> findTicketsByState(String state);

    @Query("{ 'target_ref.id' : ?0 }")
    ArrayList<Ticket> findTicketsByTarget(String target);

    @Query("{ 'target_ref.id' : ?0 }")
    Page<Ticket> findTicketsByTarget2(String target,Pageable pageable);

    @Query("{ 'target_ref.id' : ?1, 'category' : ?0 }")
    ArrayList<Ticket> findTicketByCategoryAndTarget2(String category, String target);

    @Query("{ 'target_ref.id' : ?0, 'category' : ?1 }")
    Page<Ticket> findTicketByCategoryAndTarget(String target, String category,Pageable pageable );

    ArrayList<Ticket> findTicketsByCustomerPriority(int priority);

    ArrayList<Ticket> findTicketsByTeamPriority(int priority);

    ArrayList<Ticket> findTicketsByAssegnee(String userID);

    ArrayList<Ticket> findTicketsByAssegnee(DBReference oldTeamLeader);

}
