package it.uniroma2.ticketingsystem.service;

import it.uniroma2.sag.kelp.data.clustering.Cluster;
import it.uniroma2.sag.kelp.data.clustering.ClusterExample;
import it.uniroma2.sag.kelp.data.clustering.ClusterList;
import it.uniroma2.ticketingsystem.domain.*;
import it.uniroma2.ticketingsystem.ml.clustering.ClusteringElaborator;
import it.uniroma2.ticketingsystem.ml.constant.Const;
import it.uniroma2.ticketingsystem.ml.data.KeLPUtils;
import it.uniroma2.ticketingsystem.ml.text.LSAElaborator;
import it.uniroma2.ticketingsystem.ml.text.TermsDocsElaborator;
import it.uniroma2.ticketingsystem.repository.LinksRepository;
import it.uniroma2.ticketingsystem.repository.StatisticRepository;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.io.*;
import java.util.ArrayList;
import java.util.Map;

import static it.uniroma2.ticketingsystem.ml.amazon.S3Manager.*;
import static it.uniroma2.ticketingsystem.ml.data.KeLPUtils.writeKelpDataset;
import static it.uniroma2.ticketingsystem.ml.text.TextElaborator.stemmingsAndStopWordsRemover;

@Service
public class ClusteringService {

    @Autowired
    StatisticRepository statisticsRepository;

    @Autowired
    LinksRepository linksRepository;


    @Autowired
    TicketService ticketService;

    @Autowired
    TargetService targetService;

    public Boolean printClusteringData(Map<String, Object> data) {
        System.out.println("The JSON object of clustering data is: " + data + "\n");
        return Boolean.TRUE;
    }

    @Transactional
    public Boolean prepareDatasetByTarget(String target, int reduction) {

        try {
            ArrayList<Ticket> tickets = ticketService.findTicketsByTarget(target);

            //Costruisco un HashMap con gli id_del_ticket ed il testo del ticket
            ArrayList<ArrayList<String>> documents = new ArrayList<>();
            ArrayList<String> documentsID = new ArrayList<>();

            for (Ticket t : tickets) {
                //stemming riduce la parola alla radice
                documents.add(stemmingsAndStopWordsRemover(t.getObject() + " " + t.getDescription()));
                documentsID.add(t.getId());
            }

            String fileName = Const.LOCAL_DATASET_PATH // local_dataset_path
                    + Const.s + target // /target
                    + Const.s + Const.DATASET_KLP; // /dataset.klp

            String IDFFileName = Const.LOCAL_DATASET_PATH // local_dataset_path
                    + Const.s + target // /target
                    + Const.s + Const.IDF_KLP; // /IDF.klp

            //Scrivo il file IDF per classificazione
            if (KeLPUtils.writeDatasetIDF(TermsDocsElaborator.computeOnlyIDF(documents), target))
                writeIDFList(Const.BUCKET_PATH, Const.DATASET_BUCKET_PATH + target + "/" + Const.IDF_KLP, IDFFileName);
            else return Boolean.FALSE;

            //Scrivo il file dataset che userò per il clustering
            if (writeKelpDataset(LSAElaborator.computeLSA(TermsDocsElaborator.computeTermDocsMatrix(documents), reduction), target, documentsID))
                writeTargetDataset(Const.BUCKET_PATH, Const.DATASET_BUCKET_PATH + target + "/" + Const.DATASET_KLP, fileName);
            else return Boolean.FALSE;

            return Boolean.TRUE;

        } catch (Exception e) {
            System.err.println(e.toString());
            return Boolean.FALSE;
        }

    }

    @Transactional
    public Clusters findStatisticsAndLinksByTarget(String target) {
        Clusters clusters= new Clusters();
        clusters.setStatistic(statisticsRepository.findStatisticByTarget(target));
       // Statistic statistic = statisticsRepository.findStatisticByTarget(target);
        clusters.setLinks(linksRepository.findLinksByTarget(target));
        //Clusters clusters=statisticsRepository.findStatisticByTarget(target);
        return clusters;
    }

    @Transactional
    public @NonNull boolean deleteStatistic(@NonNull String target){
        Statistic deleteStatistic;
        if ((deleteStatistic=statisticsRepository.findStatisticByTarget(target)) != null) {
            statisticsRepository.delete(deleteStatistic);
            return true;
        }
        return true;
    }

    @Transactional
    public @NonNull boolean deleteLinks(@NonNull String target){
        Links deleteLinks;
        if ((deleteLinks=linksRepository.findLinksByTarget(target)) != null) {
            linksRepository.delete(deleteLinks);
            return true;
        }
        return true;
    }

    @Transactional
    public @NotNull Statistic createStatistic(@NotNull Statistic statistic) {
        Statistic deleteStatistic;
        if ((deleteStatistic=statisticsRepository.findStatisticByTarget(statistic.getTarget_reference().getId())) != null) {
            statisticsRepository.delete(deleteStatistic);
            return statisticsRepository.save(statistic);
        }
        return statisticsRepository.save(statistic);
    }

    @Transactional
    public @NotNull Links createLinks(@NotNull Links links) {
        Links deleteLinks;
        if ((deleteLinks=linksRepository.findLinksByTarget(links.getTarget_reference().getId())) != null) {
            linksRepository.delete(deleteLinks);
            return linksRepository.save(links);
        }
        return linksRepository.save(links);
    }


    @Transactional
    public Boolean elaborateClusteringByTarget(String target, int K) throws Exception {

        String filename = Const.LOCAL_CLUSTERING_PATH //  /local_clustering_path
                + Const.s + target // /target
                + Const.s + Const.DATASET_KLP; // /dataset.klp

        //Prende il file da Amazon S3
        getFileFromBucket(Const.BUCKET_PATH, Const.DATASET_BUCKET_PATH + target + "/" + Const.DATASET_KLP, filename);

        Clusters c = ClusteringElaborator.computeClustering(filename, K);
        c.getStatistic().setTarget_reference(new DBReference(target, "target"));
        this.createStatistic(c.getStatistic());
        c.getLinks().setTarget_reference(new DBReference(target, "target"));
        this.createLinks(c.getLinks());

        if (!updateDatasetPostClustering(filename, c.getClusterList(), target)) {
            return Boolean.FALSE;
        }
        updateTicketPostClustering(c.getClusterList());

        return Boolean.TRUE;
    }

    @Transactional
    public boolean updateDatasetPostClustering(String filename, ClusterList clusterList, String target) {

        String clusteringFilename = Const.LOCAL_CLUSTERING_PATH //  /local_clustering_path
                + Const.s + target // /target
                + Const.s + Const.CLUSTERING_KLP; // /dataset_clustering.klp

        BufferedWriter writer;
        try {
            writer = new BufferedWriter(new FileWriter(clusteringFilename));
            try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    String clusterName = KeLPUtils.findClusterNameByClusterlist(clusterList, line.split(" ",1));
                    writer.write(line.replaceFirst("\\S+", clusterName)+"\n");
                }
            }

            writer.close();

        } catch (IOException e) {
            e.printStackTrace();
            return Boolean.FALSE;
        }

        return Boolean.TRUE;
    }

    @Transactional
    public Boolean updateTicketPostClustering(ClusterList clusters) {

        try {
            for (Cluster cluster : clusters) {
                for (ClusterExample clusterMember : cluster.getExamples()) {
                    ticketService.updateCategory(clusterMember.getExample().getLabels()[0].toString(), cluster.getLabel());
                }
                System.out.println();
            }
        } catch (Exception e) {
            System.err.println(e.toString());
            return Boolean.FALSE;
        }
        return Boolean.TRUE;
    }


}
