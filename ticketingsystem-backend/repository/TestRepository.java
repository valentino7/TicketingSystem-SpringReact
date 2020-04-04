package it.uniroma2.ticketingsystem.repository;

import it.uniroma2.ticketingsystem.domain.Person;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.ArrayList;

public interface TestRepository extends MongoRepository<Person, String> {

}
