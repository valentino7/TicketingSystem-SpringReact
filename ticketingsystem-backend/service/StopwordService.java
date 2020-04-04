package it.uniroma2.ticketingsystem.service;

import it.uniroma2.ticketingsystem.domain.DBReference;
import it.uniroma2.ticketingsystem.domain.Stopword;
import it.uniroma2.ticketingsystem.repository.StopwordRepository;
import it.uniroma2.ticketingsystem.util.exception.MessageErrorException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.io.*;
import java.util.ArrayList;

import static it.uniroma2.ticketingsystem.domain.costants.Costants.*;

@Service
public class StopwordService {

    @Autowired
    private StopwordRepository stopwordRepository;

    @Transactional
    public @NotNull Stopword createStopword(@NotNull Stopword stopword) throws MessageErrorException {
        if (stopwordRepository.findStopwordByValue(stopword.getValue()) != null) {
            Stopword stopwordByValue = stopwordRepository.findStopwordByValue(stopword.getValue());
            if(stopwordByValue.getTargets().isEmpty()) {
                stopwordByValue.insertTarget(stopword.getTargets().get(0).getId());
                return stopwordRepository.save(stopwordByValue);
            }
            System.err.println(stopwordByValue.getTargets().get(0).getId());

            for (DBReference db: stopwordByValue.getTargets()) {
                if(db.getId().equals(stopword.getTargets().get(0).getId()))
                    throw new MessageErrorException(TITLE_CREATE_STOPWORDS_ERROR,TEXT_CREATE_STOPWORDS_ERROR);
            }

            stopwordByValue.insertTarget(stopword.getTargets().get(0).getId());
            return stopwordRepository.save(stopwordByValue);
        }
        return stopwordRepository.save(stopword);
    }

    @Transactional
    public Stopword findStopwordById(@NotNull String id) throws MessageErrorException {
        Stopword stopword = stopwordRepository.findStopwordById(id);
        if (stopword == null)
            throw new MessageErrorException();
        return stopword;
    }

    @Transactional
    public ArrayList<Stopword> findAllStopwordsByTarget(@NotNull String target) {
        return stopwordRepository.findStopwordByTarget(target);
    }

    @Transactional
    public Stopword updateStopword(@NotNull String id, @NotNull String newTarget) throws MessageErrorException {
        Stopword stopwordToUpdate = stopwordRepository.findStopwordById(id);
        if (stopwordToUpdate == null)
            throw new MessageErrorException();

        stopwordToUpdate.insertTarget(newTarget);

        return stopwordRepository.save(stopwordToUpdate);
    }

    @Transactional
    public boolean deleteStopword(@NotNull String value, @NotNull String target) throws MessageErrorException {
        Stopword stopwordToDelete = stopwordRepository.findStopwordByValueAndTarget(value, target);
        if (stopwordToDelete == null)
            throw new MessageErrorException(TITLE_DELETE_STOPWORDS_ERROR,TEXT_DELETE_STOPWORDS_ERROR);
        stopwordToDelete.removeTarget(target);

        stopwordRepository.save(stopwordToDelete);
        return true;
    }

    @Transactional
    public boolean deleteAllStopwordsByTarget(@NotNull String target) {
        System.err.println("sono arrivato qui"+target);

        ArrayList<Stopword> stopwords = stopwordRepository.findStopwordByTarget(target);
        System.err.println("sono arrivato qui");
        for (Stopword stopword : stopwords) {
            stopword.removeTarget(target);
            stopwordRepository.save(stopword);
        }
        System.err.println("sono arrivato qui");
        return true;
    }

    @Transactional
    public Stopword findStopwordByValue(String value) {
        return stopwordRepository.findStopwordByValue(value);
    }

    @Transactional
    public Stopword findStopwordByValueAndTarget(String value, String target) {
        return stopwordRepository.findStopwordByValueAndTarget(value, target);
    }

    @Transactional
    public boolean createBaseStopwords(String target){

        String fileName = "base-stopwords.txt";

        ArrayList<DBReference> targets = new ArrayList<>();
        targets.add(new DBReference(target,"target"));

        try(BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            for(String line; (line = br.readLine()) != null; ) {
                Stopword stopword = new Stopword(line,targets);
                try {
                    createStopword(stopword);
                } catch (MessageErrorException e) {
                    e.printStackTrace();
                }
            }
            // line is not visible here.
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
