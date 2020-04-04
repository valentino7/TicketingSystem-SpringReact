package it.uniroma2.ticketingsystem.repository;

import it.uniroma2.ticketingsystem.domain.Links;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LinksRepository extends MongoRepository<Links, String> {

    Links findLinksById(String id);

    void deleteById(String id);

    @Query("{ 'target.id' : ?0 }")
    Links findLinksByTarget(String target);

    //ArrayList<Links> findLinksByTarget_reference(DBReference target);
}
