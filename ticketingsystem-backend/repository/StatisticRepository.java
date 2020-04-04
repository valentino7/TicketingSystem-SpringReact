package it.uniroma2.ticketingsystem.repository;

import it.uniroma2.ticketingsystem.domain.Statistic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StatisticRepository  extends MongoRepository<Statistic, String> {
    void deleteById(String id);

    @Query("{ 'target.id' : ?0 }")
    Statistic findStatisticByTarget(String target);
}

