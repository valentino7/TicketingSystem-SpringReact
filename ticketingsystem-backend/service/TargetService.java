package it.uniroma2.ticketingsystem.service;


import it.uniroma2.ticketingsystem.domain.Ticket;
import it.uniroma2.ticketingsystem.domain.factoryTarget.FactoryTarget;
import it.uniroma2.ticketingsystem.repository.TargetRepository;
import it.uniroma2.ticketingsystem.util.exception.EntityNotFoundException;
import it.uniroma2.ticketingsystem.util.exception.MessageErrorException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

import static it.uniroma2.ticketingsystem.domain.costants.Costants.*;

@Service
public class TargetService {
    @Autowired
    private TargetRepository targetRepository;

    @Autowired
    private StopwordService stopwordService;

    @Autowired
    private ClusteringService clusteringService;

    @Autowired
    private TicketService ticketService;

    @Transactional
    public FactoryTarget createTarget(FactoryTarget target) throws MessageErrorException{
        //stopwordService.createBaseStopwords(target.getId());
        if(targetRepository.findTargetById(target.getId()) !=null)
            throw new MessageErrorException(TITLE_CREATE_TARGET_ERROR,TEXT_CREATE_TARGET_ERROR);
        return targetRepository.save(target);
    }
    @Transactional
    public List<FactoryTarget> findAllTargets() {
        List<FactoryTarget> targets = targetRepository.findAll();

        targets.removeIf(target-> !target.isEnabled() );
        return targets;
    }

    @Transactional
    public @NotNull FactoryTarget getTargetByName(@NotNull String targetName) {
        FactoryTarget target = targetRepository.findFactoryTargetByName(targetName);
        return target;
    }

    @Transactional
    public boolean deleteTarget(String id) throws MessageErrorException{
        ArrayList<Ticket> ticketByTarget = ticketService.findTicketsByTarget(id);
        for ( Ticket t : ticketByTarget){
            ticketService.deleteTicket(t);
        }

        clusteringService.deleteLinks(id);
        clusteringService.deleteStatistic(id);

        FactoryTarget targetToDelete = targetRepository.findTargetById(id);
        if (targetToDelete == null || !targetToDelete.isEnabled())
            throw new MessageErrorException(TITLE_DELETED_TARGET_ERROR,TEXT_DELETED_TARGET_ERROR);

        targetToDelete.deleteTarget();
        targetRepository.save(targetToDelete);
        System.err.println(id);
        stopwordService.deleteAllStopwordsByTarget(id);
        return true;
    }

    @Transactional
    public FactoryTarget updateTarget(String id, @NotNull FactoryTarget newTarget) throws MessageErrorException {
        FactoryTarget targetToUpdate = targetRepository.findTargetById(id);
        if (targetToUpdate == null || !targetToUpdate.isEnabled())
            throw new MessageErrorException(TITLE_UPDATED_TARGET_ERROR,TEXT_UPDATED_TARGET_ERROR);

        targetToUpdate.updateTarget(newTarget);

        return targetRepository.save(targetToUpdate);
    }
}
