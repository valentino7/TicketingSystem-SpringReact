package it.uniroma2.ticketingsystem.rest;

import it.uniroma2.ticketingsystem.domain.Person;
import it.uniroma2.ticketingsystem.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/test")
@CrossOrigin
public class TestRestController {

    @Autowired
    private TestService testService;

    @RequestMapping(path = "", method = RequestMethod.POST)
    public ResponseEntity<Person> saveTicket(@RequestBody Person t) {
        return new ResponseEntity<>(testService.createPerson(t), HttpStatus.CREATED);
    }
}
