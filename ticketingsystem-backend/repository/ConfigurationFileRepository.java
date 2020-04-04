package it.uniroma2.ticketingsystem.repository;

import it.uniroma2.ticketingsystem.domain.ConfigurationFile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ConfigurationFileRepository extends MongoRepository<ConfigurationFile, String> {

    ConfigurationFile findConfigurationFileBy(String id);
    ArrayList<ConfigurationFile> findAll();


}
