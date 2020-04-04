package it.uniroma2.ticketingsystem.repository;

import it.uniroma2.ticketingsystem.domain.factoryTarget.FactoryTarget;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TargetRepository extends MongoRepository<FactoryTarget,String> {
    FactoryTarget findTargetById(String id);

    FactoryTarget findFactoryTargetByName(String name);

}
