package it.uniroma2.ticketingsystem.repository;

import it.uniroma2.ticketingsystem.domain.Stopword;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface StopwordRepository extends MongoRepository<Stopword, String> {

    ArrayList<Stopword> findAll();

    Stopword findStopwordByValue(String value);

    Stopword findStopwordById(String id);

    @Query("{ 'targets.id' : ?0 }")
    ArrayList<Stopword> findStopwordByTarget(String target);

    @Query("{ 'targets.id' : ?1 , 'value' : ?0 }")
    Stopword findStopwordByValueAndTarget(String value, String target);

}