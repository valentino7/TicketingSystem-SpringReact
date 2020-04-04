package it.uniroma2.ticketingsystem.rest;

import it.uniroma2.ticketingsystem.domain.*;
import it.uniroma2.ticketingsystem.service.ConfigurationFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/system/configuration")
@CrossOrigin
public class ConfigurationFileRestController {

    //Oggetto springmongo.application.service che potrà utilizzare i metodi che richiedono/salvano dati sul db
    @Autowired
    private ConfigurationFileService configurationFileService;

    @RequestMapping(path = "/getConfigurationFileById/{id}", method = RequestMethod.GET)
    public ResponseEntity<ConfigurationFile> getConfigFileById(@PathVariable String id) {
        // This returns a JSON or XML with the users
        return new ResponseEntity<>(configurationFileService.findConfigurationFileBy(id),HttpStatus.OK);
    }

    @RequestMapping(path = "/getConfigurationFile", method = RequestMethod.GET)
    public ResponseEntity<ConfigurationFile> getConfigFile() {
        // This returns a JSON or XML with the users
        return new ResponseEntity<>(configurationFileService.findAllConfigurationFiles().get(0), HttpStatus.OK);
    }

    @RequestMapping(path = "/createConfigFile", method = RequestMethod.POST)
    public ResponseEntity<String> createConfigFile(@RequestBody ConfigurationFile configurationFile) {
        // This returns a JSON or XML with the users
        if(configurationFileService.createConfigFile(configurationFile))
            return new ResponseEntity<>(HttpStatus.CREATED);
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    //-------------  REST CONFIGURATION FILE - USERS  -----------------
    @RequestMapping(path = "/getInternalUserRoles", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<UserRole>> getInternalUserRoles() {
        // This returns a JSON or XML with the users
        return new ResponseEntity<>(configurationFileService.findInternalUserRoles(),HttpStatus.OK);
    }
    @RequestMapping(path = "/getExternalUserRoles", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<UserRole>> getExternalUserRoles() {
        // This returns a JSON or XML with the users
        return new ResponseEntity<>(configurationFileService.findExternalUserRoles(),HttpStatus.OK);
    }
    //-------------  REST CONFIGURATION FILE - USERS  -----------------



    //-------------  REST CONFIGURATION FILE - TICKET  -----------------
    @RequestMapping(path = "/getTicketCategories", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<TicketCategory>> getTicketCategories() {
        // This returns a JSON or XML with the users
        return new ResponseEntity<>(configurationFileService.getTicketCategories(),HttpStatus.OK);
    }

    @RequestMapping(path = "/getActiveTicketCategories", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<TicketCategory>> getActiveTicketCategories() {
        // This returns a JSON or XML with the users
        return new ResponseEntity<>(configurationFileService.getActiveTicketCategories(),HttpStatus.OK);
    }

    @RequestMapping(path = "/addCategories", method = RequestMethod.POST)
    public ResponseEntity<Boolean> addCategoriesToConfigFile(@RequestBody String category){
        if(configurationFileService.addCategory(category))
            return new ResponseEntity(HttpStatus.OK);
        else
            return new ResponseEntity(HttpStatus.BAD_REQUEST);

    }
    @RequestMapping(path = "/getTicketAdditionalFields", method = RequestMethod.GET)
    @CrossOrigin()
    public ResponseEntity<ArrayList<TicketAdditionalField>> getTicketAdditionalFields(){
        return new ResponseEntity<>(configurationFileService.getTicketAdditionalFields(),HttpStatus.OK);
    }

    @RequestMapping(path = "/getTicketTypology", method = RequestMethod.GET)
    @CrossOrigin()
    public ResponseEntity<ArrayList<Typology>> getTicketTypology(){
        return new ResponseEntity<>(configurationFileService.getTicketTypology(),HttpStatus.OK);
    }

    @RequestMapping(path = "/getTicketTypologyById/{id}", method = RequestMethod.GET)
    @CrossOrigin()
    public ResponseEntity<Typology> getTypologyById(@PathVariable int id){
        Typology retrievedTypology = configurationFileService.getTypologyById(id) ;
        return new ResponseEntity<>(retrievedTypology, retrievedTypology == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @RequestMapping(path = "/addTicketTypology", method = RequestMethod.POST)
    @CrossOrigin()
    public ResponseEntity<ArrayList<Typology>> addTicketTypology(@RequestBody Typology typology){
        if(configurationFileService.addTicketTypology(typology))
            return new ResponseEntity(HttpStatus.OK);
        else
            return new ResponseEntity(HttpStatus.BAD_REQUEST);

    }

    @RequestMapping(path = "/addTypologyAdditionalField/{id}", method = RequestMethod.POST)
    @CrossOrigin()
    public ResponseEntity<Boolean> addTypologyAdditionalField(@RequestBody AdditionalField additionalField, @PathVariable int id){
        if(configurationFileService.addTypologyAdditionalField(id,additionalField))
            return new ResponseEntity(HttpStatus.OK);
        else
            return new ResponseEntity(HttpStatus.BAD_REQUEST);

    }



    @RequestMapping(path = "/deleteTypology/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteTypology(@PathVariable int id){
        boolean deleted = configurationFileService.deleteTypology(id);
        return new ResponseEntity<>(deleted, deleted ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/deleteAdditionalField/{idTypology}/{idField}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteAdditionalField(@PathVariable int idTypology, @PathVariable int idField){
        boolean deleted = configurationFileService.deleteAdditionalField(idTypology,idField);
        return new ResponseEntity<>(deleted, deleted ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    //-------------  REST CONFIGURATION FILE - TICKET  -----------------



    //-------------  REST CONFIGURATION FILE - TEAM  -----------------
    @RequestMapping(path = "/getTeams", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<TeamName>> getTeams() {
        // This returns a JSON or XML with the users
        return new ResponseEntity<>(configurationFileService.getTeams(), HttpStatus.OK);
    }

    @RequestMapping(path = "/getActiveTeams", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<TeamName>> getActiveTeams() {
        // This returns a JSON or XML with the users
        return new ResponseEntity<>(configurationFileService.getActiveTeams(), HttpStatus.OK);
    }
    //-------------  REST CONFIGURATION FILE - TEAM  -----------------

}
