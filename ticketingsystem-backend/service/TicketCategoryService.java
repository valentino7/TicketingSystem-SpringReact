package it.uniroma2.ticketingsystem.service;

import it.uniroma2.ticketingsystem.domain.TicketCategory;
import it.uniroma2.ticketingsystem.repository.TicketCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class TicketCategoryService {

    @Autowired
    private TicketCategoryRepository ticketCategoryRepository;

    @Transactional
    public ArrayList<TicketCategory> findTicketCategoryByName(String name) {
        ArrayList<TicketCategory> arrayList = ticketCategoryRepository.findTicketCategoriesByName(name);
        ArrayList<TicketCategory> output = new ArrayList<>();
        for (TicketCategory ticket : arrayList) {
            output.add(ticket);

        }
        return output;

    }

}
