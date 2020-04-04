package it.uniroma2.ticketingsystem.rest;

import com.fasterxml.jackson.databind.util.JSONPObject;
import it.uniroma2.ticketingsystem.domain.Stopword;
import it.uniroma2.ticketingsystem.service.StopwordService;
import it.uniroma2.ticketingsystem.util.exception.MessageErrorException;
import jdk.nashorn.api.scripting.JSObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

import static it.uniroma2.ticketingsystem.domain.costants.Costants.*;

@RestController
@RequestMapping(path = URL_GENERAL_STOPWORD)
@CrossOrigin
@ControllerAdvice
public class StopwordRestController {

    @Autowired
    private StopwordService stopwordService;


    @RequestMapping(path = PATH_CREATE_STOPWORD, method = RequestMethod.POST)
    public ResponseEntity<Stopword> create(@RequestBody Stopword stopword) throws MessageErrorException {
        Stopword savedStopword = stopwordService.createStopword(stopword);
        System.out.println(savedStopword);

        return new ResponseEntity<>(savedStopword, HttpStatus.OK);

    }

    @RequestMapping(path = PATH_FIND_STOPWORD_BY_TARGET, method = RequestMethod.GET)
    public ResponseEntity<ArrayList<Stopword>> findByTarget(@PathVariable String target) {
        ArrayList<Stopword> stopwords = stopwordService.findAllStopwordsByTarget(target);
        return new ResponseEntity<>(stopwords, HttpStatus.OK);
    }

    @RequestMapping(path = PATH_FIND_STOPWORD_BY_VALUE, method = RequestMethod.GET)
    public ResponseEntity<Stopword> findByValue(@PathVariable String value) {
        Stopword retrievedStopword = stopwordService.findStopwordByValue(value);
        return new ResponseEntity<>(retrievedStopword, retrievedStopword == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @RequestMapping(path = PATH_FIND_STOPWORD_BY_VALUE_TARGET, method = RequestMethod.GET)
    public ResponseEntity<Stopword> findByValueAndTarget(@PathVariable String value, @PathVariable String target) {
        Stopword stopword = stopwordService.findStopwordByValueAndTarget(value, target);
        System.err.println(stopword.getValue());
        return new ResponseEntity<>(stopword, HttpStatus.OK);
    }

    @RequestMapping(path = PATH_UPDATE_STOPWORD_BY_ID, method = RequestMethod.PUT)
    public ResponseEntity<Stopword> update(@PathVariable String id, @RequestBody String newTarget) throws MessageErrorException {
        Stopword updatedStopword = null;
        updatedStopword = stopwordService.updateStopword(id, newTarget);
        return new ResponseEntity<>(updatedStopword, HttpStatus.OK);
    }

    @RequestMapping(path = PATH_DELETE_STOPWORD_BY_VALUE_TARGET, method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> delete(@RequestBody Stopword stopword, @PathVariable String target) throws MessageErrorException {
        System.err.println("\n\nTARGET : " + target);
        System.err.println("VALUE : " + stopword.getValue());
        boolean deleted = stopwordService.deleteStopword(stopword.getValue(), target);

        return new ResponseEntity<>(deleted, deleted ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = PATH_DELETE_ALL_STOPWORD_BY_TARGET, method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteAll(@PathVariable String target) {
        boolean deleted = stopwordService.deleteAllStopwordsByTarget(target);
        return new ResponseEntity<>(deleted, deleted ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

}
