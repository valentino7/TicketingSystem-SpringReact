package it.uniroma2.ticketingsystem.rest;


import it.uniroma2.ticketingsystem.domain.Ticket;
import it.uniroma2.ticketingsystem.domain.TicketCategory;
import it.uniroma2.ticketingsystem.service.TicketCategoryService;
import it.uniroma2.ticketingsystem.service.TicketService;
import it.uniroma2.ticketingsystem.util.exception.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;


@RestController
@RequestMapping(path = "/ticket")
@CrossOrigin
public class TicketRestController {

    @Autowired
   private TicketService ticketService;

    @Autowired
    private TicketCategoryService ticketCategoryService;

    @RequestMapping(path = "", method = RequestMethod.POST)
    public ResponseEntity<Ticket> saveTicket(@RequestBody Ticket t) {
        return new ResponseEntity<>(ticketService.createTicket(t), HttpStatus.CREATED);
    }

    //response body dovrebbe essere inutile con l'annotation @RestController (sarebbe stato utile se l'annotation fosse stata @Controller)
    @RequestMapping(value = "/uploadFiles/{username}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Boolean> uploadFiles(HttpServletRequest request, @RequestParam("files") MultipartFile[] files, @PathVariable String username) {
        boolean transferSuccessful = ticketService.updateFiles(files, username);
        return new ResponseEntity<>(transferSuccessful, transferSuccessful ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    // TODO testare questi due metodi
    @RequestMapping(path = "/search/object/{object}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<Ticket>> findTicketByObject(@PathVariable String object) {
        ArrayList<Ticket> arrayList = ticketService.findTicketsByObject(object);
        return new ResponseEntity<>(arrayList, arrayList != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/search/state/{state}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<Ticket>> findTicketByState(@PathVariable String state) {
        ArrayList<Ticket> arrayList = ticketService.findTicketsByState(state);
        return new ResponseEntity<>(arrayList, arrayList != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/search/target/{target}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<Ticket>> findTicketByTarget(@PathVariable String target) {
        ArrayList<Ticket> arrayList = ticketService.findTicketsByTarget(target);
        return new ResponseEntity<>(arrayList, arrayList != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/search/priority/customer/{priority}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<Ticket>> findTicketByCustomerPriority(@PathVariable int priority) {
        ArrayList<Ticket> arrayList = ticketService.findTicketsByCustomerPriority(priority);
        return new ResponseEntity<>(arrayList, arrayList != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/search/priority/team/{priority}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<Ticket>> findTicketByTeamPriority(@PathVariable int priority) {
        ArrayList<Ticket> arrayList = ticketService.findTicketsByTeamPriority(priority);
        return new ResponseEntity<>(arrayList, arrayList != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/search/category/{category}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<TicketCategory>> findTicketCategoryByName(@PathVariable String category) {
        ArrayList<TicketCategory> arrayList = ticketCategoryService.findTicketCategoryByName(category);
        return new ResponseEntity<>(arrayList, arrayList != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }


    @RequestMapping(path = "/search/{userid}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<Ticket>> findTicketByUserID(@PathVariable String userid) {
        ArrayList<Ticket> arrayList = ticketService.findTicketsByUserID(userid);
        return new ResponseEntity<>(arrayList, arrayList != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }


    @RequestMapping(path = "/pageNumber/{number}", method = RequestMethod.GET)
    public ResponseEntity<Integer> findPageNumber(@PathVariable int number) {
        Integer totalPages = ticketService.findPageNumber(number);
        return new ResponseEntity<>(totalPages, HttpStatus.OK);
    }
    @RequestMapping(path = "/pageTargetNumber/{target}/{number}", method = RequestMethod.GET)
    public ResponseEntity<Integer> findPageTargetNumber(@PathVariable String target,@PathVariable int number) {
        Integer totalPages = ticketService.findPageTargetNumber(number,target);
        return new ResponseEntity<>(totalPages, HttpStatus.OK);
    }
    @RequestMapping(path = "/pageTargetAndCategoryNumber/{target}/{category}/{number}", method = RequestMethod.GET)
    public ResponseEntity<Integer> findPageTargetAndCategoryNumber(@PathVariable int number,@PathVariable String target,@PathVariable String category) {
        Integer totalPages = ticketService.findPageTargetAndCategoryNumber(number,target,category);
        return new ResponseEntity<>(totalPages, HttpStatus.OK);
    }

    //chiamata per la paginazione
    @RequestMapping(path = "", params = {"page", "size"}, method = RequestMethod.GET)
    public ResponseEntity<ArrayList<Ticket>> findAll(@RequestParam("page") int page, @RequestParam("size") int size) {
        System.err.println("parametro"+page);
        ArrayList<Ticket> tickets = ticketService.findAllTickets2(page, size);
        return new ResponseEntity<>(tickets, HttpStatus.OK);
    }

    //chiamata per la paginazione
    @RequestMapping(path = "/search/targetPage/{target}", params = {"page", "size"}, method = RequestMethod.GET)
    public ResponseEntity<ArrayList<Ticket>> findTicketByTargetPage(@PathVariable String target, @RequestParam("page") int page, @RequestParam("size") int size) {
        ArrayList<Ticket> arrayList = ticketService.findTicketsByTarget2(target,page,size);
        return new ResponseEntity<>(arrayList, arrayList != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }
    //chiamata per la paginazione
    @RequestMapping(path = "/findByCategoryAndTarget/{category}/{target}", params = {"page", "size"}, method = RequestMethod.GET)
    public ResponseEntity<ArrayList<Ticket>> findTickeByCategoryAndTarget(@PathVariable String category, @PathVariable String target, @RequestParam("page") int page, @RequestParam("size") int size) throws Exception {

        ArrayList<Ticket> tickets = ticketService.findTicketsByCategoryAndTarget(category,target,page,size);
        return new ResponseEntity<>(tickets, tickets!= null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/findByCategoryAndTarget2/{category}/{target}",  method = RequestMethod.GET)
    public ResponseEntity<ArrayList<Ticket>> findTickeByCategoryAndTarget2(@PathVariable String category, @PathVariable String target) throws Exception {

        ArrayList<Ticket> tickets = ticketService.findTicketsByCategoryAndTarget2(category,target);
        return new ResponseEntity<>(tickets,HttpStatus.FOUND);
    }


}
