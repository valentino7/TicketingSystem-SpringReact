package it.uniroma2.ticketingsystem.repository;

import it.uniroma2.ticketingsystem.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface    UserRepository extends MongoRepository<User, String> {

    ArrayList<User> findAll();

    User findUserById(String id);
    User findUserByUsernameAndPassword(String username, String password);

}
