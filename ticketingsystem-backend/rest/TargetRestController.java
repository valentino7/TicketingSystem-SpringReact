package it.uniroma2.ticketingsystem.rest;

import it.uniroma2.ticketingsystem.domain.factoryTarget.FactoryTarget;
import it.uniroma2.ticketingsystem.service.TargetService;
import it.uniroma2.ticketingsystem.util.exception.MessageErrorException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

import static it.uniroma2.ticketingsystem.domain.costants.Costants.URL_GENERAL_TARGET;

@RestController
@RequestMapping(path = URL_GENERAL_TARGET)
@CrossOrigin
public class TargetRestController {

    @Autowired
    private TargetService targetService;


    @RequestMapping(path="",method = RequestMethod.POST)
    public ResponseEntity<FactoryTarget> saveTarget(@RequestBody FactoryTarget t) throws MessageErrorException {
        return new ResponseEntity<>( targetService.createTarget(t), HttpStatus.CREATED);
    }

    @RequestMapping(path="",method = RequestMethod.GET)
    public ResponseEntity<List<FactoryTarget>> findAllTargets(){
        return new ResponseEntity<>( targetService.findAllTargets(), HttpStatus.CREATED);
    }


    @RequestMapping(path="{id}",method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteTarget(@PathVariable String id) throws  MessageErrorException {
        boolean deleted = targetService.deleteTarget(id);
        return new ResponseEntity<>( deleted,  deleted ? HttpStatus.OK : HttpStatus.NOT_FOUND );
    }

    @RequestMapping(path = "{id}", method = RequestMethod.PUT)
    public ResponseEntity<FactoryTarget> updateTarget(@PathVariable String id, @RequestBody FactoryTarget target) throws MessageErrorException {
        FactoryTarget updatedTarget;
        updatedTarget = targetService.updateTarget(id, target);
        return new ResponseEntity<>(updatedTarget, HttpStatus.OK);
    }

}


