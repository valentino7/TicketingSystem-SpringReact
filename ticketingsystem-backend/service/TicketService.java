package it.uniroma2.ticketingsystem.service;


import it.uniroma2.ticketingsystem.domain.AdditionalField;
import it.uniroma2.ticketingsystem.domain.AdditionalFieldsValue;
import it.uniroma2.ticketingsystem.domain.DBReference;
import it.uniroma2.ticketingsystem.domain.Ticket;
import it.uniroma2.ticketingsystem.domain.factoryTarget.FactoryTarget;
import it.uniroma2.ticketingsystem.ml.constant.Const;
import it.uniroma2.ticketingsystem.repository.TargetRepository;
import it.uniroma2.ticketingsystem.repository.TicketRepository;
import it.uniroma2.ticketingsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.function.Consumer;
import java.util.function.Function;

import static it.uniroma2.ticketingsystem.ml.amazon.S3Manager.writeTargetDataset;
import static it.uniroma2.ticketingsystem.ml.amazon.S3Manager.writeUserFile;

@Service
public class TicketService {


    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private TargetRepository targetRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ConfigurationFileService configurationFileService;
    @Autowired
    private ClassificationService classificationService;

    @Transactional
    public Ticket createTicket(Ticket ticket) {
        Ticket ticketML;
        try {
            ticketML = classificationService.classifyTicket(ticket);
            return ticketRepository.save(ticketML);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ticketRepository.save(ticket);
    }

    // TODO Implementare tramite campo enabled
    @Transactional
    public boolean deleteTicket(Ticket ticketToDelete) {

        if (ticketToDelete == null) {
            return false;
        }
        ticketToDelete.deleteTicket();
        return true;

    }

    @Transactional
    public boolean updateFiles(MultipartFile[] files, String username){
        boolean transferSuccessful = true;
        for (MultipartFile file : files) {
            //String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.'));

            String newFileName = file.getOriginalFilename();// + extension; //set unique name when saving on server
            File newFile;

            File fileFolder = new File(Const.FILE_LOCAL_PATH+username);
            //check if parent folders exist else create it
            if (fileFolder.exists() || fileFolder.mkdirs()) {
                newFile = new File(fileFolder.getAbsolutePath() + "\\" + newFileName);
                try {
                    file.transferTo(newFile);
                } catch (IOException e) {
                    e.printStackTrace();
                    transferSuccessful = false;
                }
            } else {
                transferSuccessful = false;
            }
            String fileName = Const.FILE_LOCAL_PATH // local_dataset_path
                    + Const.s + username // /utente
                    + Const.s + newFileName; // /nomefile.pdf
            writeUserFile(Const.BUCKET_PATH , Const.FILE_BUCKET_PATH + username + "/" + newFileName, fileName);
        }

        return transferSuccessful;
    }

    @Transactional
    public ArrayList<Ticket> findTicketsByObject(String object){
        ArrayList<Ticket> arrayList= ticketRepository.findTicketsByObject(object);
        ArrayList<Ticket> output=new ArrayList<>();
        for (Ticket ticket:arrayList){
            if (ticket.getEnabled())
                output.add(ticket);
        }
        return parseTicket(output);
    }

    @Transactional
    public ArrayList<Ticket> findTicketsByState(String state) {
        ArrayList<Ticket> arrayList = ticketRepository.findTicketsByState(state);
        ArrayList<Ticket> output = new ArrayList<>();
        for (Ticket ticket : arrayList) {
            if (ticket.getEnabled())
                output.add(ticket);
        }
        return parseTicket(output);
    }

    @Transactional
    public ArrayList<Ticket> parseTicket(ArrayList<Ticket> arrayList) {
        ArrayList<Ticket> output = new ArrayList<>();
        for (Ticket ticket : arrayList) {
            FactoryTarget ft = targetRepository.findTargetById(ticket.getTarget().getId());
            ticket.getTarget().setValue(ft.getName());
            ticket.getSource().setValue(userRepository.findUserById(ticket.getSource().getId()).getUsername());
            ticket.getAssegnee().setValue(userRepository.findUserById(ticket.getSource().getId()).getUsername());
            if (ft.getTypId() != 0 ) {
                ArrayList<AdditionalField> ad = configurationFileService.getTypologyById(ft.getTypId()).getAdditionalFields();

                int i = 0;
                for (AdditionalFieldsValue adv : ticket.getAdditionalFieldsValue()) {
                    adv.getAdditionalFieldRef().setName(ad.get(i).getName());
                    i++;
                }
            }
            if (ticket.getEnabled())
                output.add(ticket);
        }
        return output;
    }

    @Transactional
    public ArrayList<Ticket> findTicketsByTarget(String target) {
        ArrayList<Ticket> arrayList = ticketRepository.findTicketsByTarget(target);
        ArrayList<Ticket> output = new ArrayList<>();
        for (Ticket ticket : arrayList) {
            if (ticket.getEnabled())
                output.add(ticket);
        }
        return parseTicket(output);
    }

    @Transactional
    public ArrayList<Ticket> findTicketsByCustomerPriority(int priority) {
        ArrayList<Ticket> arrayList = ticketRepository.findTicketsByCustomerPriority(priority);
        ArrayList<Ticket> output = new ArrayList<>();
        for (Ticket ticket : arrayList) {
            if (ticket.getEnabled())
                output.add(ticket);
        }
        return parseTicket(output);
    }

    @Transactional
    public ArrayList<Ticket> findTicketsByTeamPriority(int priority) {
        ArrayList<Ticket> arrayList = ticketRepository.findTicketsByTeamPriority(priority);
        ArrayList<Ticket> output = new ArrayList<>();
        for (Ticket ticket : arrayList) {
            if (ticket.getEnabled())
                output.add(ticket);
        }
        return parseTicket(output);
    }

    @Transactional
    public ArrayList<Ticket> findTicketsByUserID(String userID) {
        ArrayList<Ticket> arrayList = ticketRepository.findTicketsByAssegnee(userID);
        ArrayList<Ticket> output = new ArrayList<>();
        for (Ticket ticket : arrayList) {
            if (ticket.getEnabled())
                output.add(ticket);
        }
        return parseTicket(output);
    }

    @Transactional
    public ArrayList<Ticket> findAllTickets() {
        ArrayList<Ticket> tickets = ticketRepository.findAll();
        return parseTicket(tickets);
    }

    @Transactional
    public ArrayList<Ticket> findAllTickets2(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Ticket> tickets = ticketRepository.findAll(pageable);
        ArrayList<Ticket> output = new ArrayList<>();
        for (Ticket t : tickets.getContent()) {
            output.add(t);
        }
        return parseTicket(output);
    }

    @Transactional
    public void changeTicketOwner(DBReference oldTeamLeader, DBReference newTeamLeader) {
        ArrayList<Ticket> arrayList = ticketRepository.findTicketsByAssegnee(oldTeamLeader);
        for (Ticket ticket : arrayList) {
            ticket.setAssegneee(newTeamLeader);
            ticketRepository.save(ticket);
        }

    }

    @Transactional
    public Integer findPageNumber(int number) {
        ArrayList<Ticket> tickets = ticketRepository.findAll();
        int totalPage = tickets.size()/number;
        if (totalPage == 0 )
                return 1;
        return totalPage;
    }

    @Transactional
    public boolean updateCategory(String id, String category){

        Ticket ticket = ticketRepository.findTicketById(id);
        ticket.setCategory(category);
        ticketRepository.save(ticket);

        return true;
    }

    @Transactional
    public ArrayList<Ticket> findTicketsByCategoryAndTarget(String category, String target, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Ticket> tickets = ticketRepository.findTicketByCategoryAndTarget(target,category,pageable);
        ArrayList<Ticket> output = new ArrayList<>();
        for (Ticket t : tickets.getContent()) {
            output.add(t);
        }
        return parseTicket(output);
    }

    @Transactional
    public Integer findPageTargetNumber(int number,String target) {
        ArrayList<Ticket> arrayList = ticketRepository.findTicketsByTarget(target);
        return arrayList.size()/number;

    }

    @Transactional
    public Integer findPageTargetAndCategoryNumber(int number,String target,String category) {
        ArrayList<Ticket> tickets = ticketRepository.findTicketByCategoryAndTarget2(category,target);
        return tickets.size()/number;
    }

    @Transactional
	public void changeTicketOwner_higher_order(DBReference oldTeamLeader, ArrayList<DBReference> members, Function<ArrayList<DBReference>, DBReference> function) {
        ArrayList<Ticket> arrayList = ticketRepository.findTicketsByAssegnee(oldTeamLeader);
        for (Ticket ticket : arrayList) {
            ticket.setAssegneee(function.apply(members));
            ticketRepository.save(ticket);
        }
	}

	@Transactional
    public ArrayList<Ticket> findTicketsByTarget2(String target, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        ArrayList<Ticket> output = new ArrayList<>();
        Page<Ticket> tickets = ticketRepository.findTicketsByTarget2(target,pageable);
        for (Ticket t : tickets.getContent()) {
            output.add(t);
        }
        return parseTicket(output);

    }

    @Transactional
    public boolean checkPendingTicketForMember(DBReference member) {
        return ticketRepository.findTicketsByAssegnee(member).size() > 0;
    }

    @Transactional
    public ArrayList<Ticket> findTicketsByCategoryAndTarget2(String category, String target) {
        ArrayList<Ticket> tickets = ticketRepository.findTicketByCategoryAndTarget2(category,target);
        return parseTicket(tickets);

    }
}
