package it.uniroma2.ticketingsystem.service;

import it.uniroma2.ticketingsystem.domain.Person;
import it.uniroma2.ticketingsystem.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TestService {

    @Autowired
    private TestRepository testRepository;

    @Transactional
    public Person createPerson(Person p) {
        return testRepository.save(p);
    }
}
