package it.uniroma2.ticketingsystem.repository;

import it.uniroma2.ticketingsystem.domain.TicketCategory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.ArrayList;

public interface TicketCategoryRepository extends MongoRepository<TicketCategory,String> {

    ArrayList<TicketCategory> findTicketCategoriesByName(String name);
}
