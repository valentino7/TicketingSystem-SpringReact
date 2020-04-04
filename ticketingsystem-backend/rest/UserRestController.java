package it.uniroma2.ticketingsystem.rest;

import it.uniroma2.ticketingsystem.domain.User;
import it.uniroma2.ticketingsystem.service.UserService;
import it.uniroma2.ticketingsystem.util.exception.EntityNotFoundException;
import it.uniroma2.ticketingsystem.util.exception.InvalidUserException;
import it.uniroma2.ticketingsystem.util.exception.UserAlreadyRegisteredException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;


@RestController
@RequestMapping(path = "/users")
@CrossOrigin
public class UserRestController {

    @Autowired
    private UserService userService;

    @RequestMapping(path = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<User> findUserByUsernameAndPassword(@RequestBody User user) throws InvalidUserException, NoSuchAlgorithmException {
        User retrievedUser = userService.findUserByUsernameAndPassword(user.getUsername(), user.getPassword());
        return new ResponseEntity<>(retrievedUser, HttpStatus.OK);
    }

    @RequestMapping(path = "", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<User>> findAll() {
        ArrayList<User> users = userService.findAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> findOne(@PathVariable String id) throws EntityNotFoundException {
        User retrievedUser = userService.findUserById(id);
        return new ResponseEntity<>(retrievedUser, retrievedUser == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
    public ResponseEntity<User> create(@RequestBody User user) throws UserAlreadyRegisteredException, NoSuchAlgorithmException {

        User savedUser = userService.createUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<User> update(@PathVariable String id, @RequestBody User user) throws NoSuchAlgorithmException {
        User updatedUser;
        try {
            updatedUser = userService.updateUser(id, user);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(user, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> delete(@PathVariable String id) throws EntityNotFoundException{
        boolean deleted = userService.deleteUser(id);
        return new ResponseEntity<>(deleted, deleted ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }
}
