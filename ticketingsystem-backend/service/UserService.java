package it.uniroma2.ticketingsystem.service;

import it.uniroma2.ticketingsystem.domain.User;
import it.uniroma2.ticketingsystem.repository.UserRepository;
import it.uniroma2.ticketingsystem.util.exception.EntityNotFoundException;
import it.uniroma2.ticketingsystem.util.exception.InvalidUserException;
import it.uniroma2.ticketingsystem.util.exception.MemberWithPendingTickets;
import it.uniroma2.ticketingsystem.util.exception.UserAlreadyRegisteredException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;

@Service
public class
UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeamService teamService;

    @Transactional
    public @NotNull User createUser(@NotNull User newUser) throws UserAlreadyRegisteredException, NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(newUser.getPassword().getBytes(StandardCharsets.UTF_8));
        String hashPassword = DatatypeConverter.printHexBinary(hash);
        newUser.setPassword(hashPassword);

        for (User user : userRepository.findAll()) {
            if (user.getUsername().equals(newUser.getUsername())) {
                if (user.isEnabled()) {
                    throw new UserAlreadyRegisteredException("Username is already in use");
                } else {
                    userRepository.delete(user);
                }
            }
        }

        return userRepository.save(newUser);
    }

    @Transactional
    public @NotNull User updateUser(String id, @NotNull User newUser) throws EntityNotFoundException, NoSuchAlgorithmException {
        User userToUpdate = userRepository.findUserById(id);
        if (userToUpdate == null || !userToUpdate.isEnabled())
            throw new EntityNotFoundException();

        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(newUser.getPassword().getBytes(StandardCharsets.UTF_8));
        String hashPassword = DatatypeConverter.printHexBinary(hash);
        newUser.setPassword(hashPassword);

        userToUpdate.updateUser(newUser);

        return userRepository.save(userToUpdate);
    }

    public User findUserById(@NotNull String id) throws EntityNotFoundException {
        User retrievedUser = userRepository.findUserById(id);
        if (retrievedUser == null || !retrievedUser.isEnabled())
            throw new EntityNotFoundException();
        return retrievedUser;
    }

    @Transactional
    public User findUserByUsernameAndPassword(@NotNull String username, @NotNull String password) throws InvalidUserException, NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
        String hashPassword = DatatypeConverter.printHexBinary(hash);

        User retrievedUser = userRepository.findUserByUsernameAndPassword(username, hashPassword);
        if (retrievedUser == null || !retrievedUser.isEnabled())
            throw new InvalidUserException("Wrong username/password");
        /*
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(retrievedUser.getPassword().getBytes(StandardCharsets.UTF_8));

        String hex = DatatypeConverter.printHexBinary(hash);
        System.out.println(hex);
        */
        return retrievedUser;


    }

    @Transactional
    public ArrayList<User> findAllUsers() {
        ArrayList<User> users = userRepository.findAll();

        users.removeIf(user -> !user.isEnabled());
        return users;
    }

    @Transactional
    public boolean deleteUser(String id) throws EntityNotFoundException {
        User userToDelete = userRepository.findUserById(id);
        if (userToDelete == null || !userToDelete.isEnabled())
            throw new EntityNotFoundException();
        try {
			teamService.checkConsistencyTeam(userToDelete);
		} catch (MemberWithPendingTickets e) {
			return false;
		}
        userToDelete.deleteUser();

        userRepository.save(userToDelete);
        return true;
    }
}
