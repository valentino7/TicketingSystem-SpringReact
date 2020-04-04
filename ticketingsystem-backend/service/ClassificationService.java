package it.uniroma2.ticketingsystem.service;

import it.uniroma2.ticketingsystem.domain.Ticket;
import it.uniroma2.ticketingsystem.ml.amazon.S3Manager;
import it.uniroma2.ticketingsystem.ml.classification.CSVMElaborator;
import it.uniroma2.ticketingsystem.ml.constant.Const;
import it.uniroma2.ticketingsystem.ml.data.KeLPUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ClassificationService {

    @Transactional
    public Ticket classifyTicket(Ticket ticket) throws Exception {

        String IDFFileName = Const.LOCAL_DATASET_PATH // local_dataset_path
                + Const.s + ticket.getTarget().getId() // /target
                + Const.s + Const.IDF_KLP; // /IDF.klp

        S3Manager.getFileFromBucket(Const.BUCKET_PATH,
                Const.DATASET_BUCKET_PATH + ticket.getTarget().getId() + "/" + Const.IDF_KLP,
                IDFFileName);

        String fileName = KeLPUtils.writeVectorDataset(ticket, IDFFileName);

        ticket = CSVMElaborator.computeCSVM(Const.LINEAR_KERNEL, 10, ticket, IDFFileName);

        return ticket;
    }

}
