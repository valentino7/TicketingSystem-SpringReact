package it.uniroma2.ticketingsystem.ml.data;

import it.uniroma2.sag.kelp.data.clustering.Cluster;
import it.uniroma2.sag.kelp.data.clustering.ClusterExample;
import it.uniroma2.sag.kelp.data.clustering.ClusterList;
import it.uniroma2.ticketingsystem.domain.Ticket;
import it.uniroma2.ticketingsystem.ml.constant.Const;
import it.uniroma2.ticketingsystem.ml.text.TermsDocsElaborator;
import it.uniroma2.ticketingsystem.ml.text.TextElaborator;
import org.apache.commons.math3.linear.RealMatrix;

import java.io.*;
import java.text.DecimalFormat;
import java.util.ArrayList;

public class KeLPUtils {

    static DecimalFormat df = new DecimalFormat("0.00");

    //Funzione per scrivere il dataset dei documenti in formato KLP
    public static boolean writeKelpDataset(RealMatrix matrix, String target, ArrayList<String> documentsID) {

        String fileName = Const.LOCAL_DATASET_PATH // local_dataset_path
                + Const.s + target // /target
                + Const.s + Const.DATASET_KLP; // /dataset.klp

        File file = new File(fileName);
        file.getParentFile().mkdirs();

        BufferedWriter writer = null;
        if (writeDataset(matrix, fileName, documentsID)) return true;

        return false;
    }

    //Funzione per scrivere il dataset del nuovo ticket in formato KLP
    public static String writeVectorDataset(Ticket ticket, String IDFFilePath) {

        String fileName = Const.LOCAL_CLASSIFICATION_PATH // local_classification_path
                + Const.s + ticket.getTarget().getId()// /target_id
                + Const.s + Const.VECTOR_KLP; // /vector.klp

        File file = new File(fileName);
        file.getParentFile().mkdirs();

        BufferedWriter writer = null;
        try {
            if (writeVector(ticket, fileName, IDFFilePath)) return fileName;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        return "";
    }

    //Funzione per scrivere il file contenente IDF
    public static boolean writeDatasetIDF(ArrayList<String> idf, String target) {

        String IDFFileName = Const.LOCAL_DATASET_PATH // local_dataset_path
                + Const.s + target // /target
                + Const.s + Const.IDF_KLP; // /dataset.klp

        File file = new File(IDFFileName);
        file.getParentFile().mkdirs();

        BufferedWriter writer = null;
        if (writeIDF(idf, IDFFileName)) return true;

        return false;
    }

    //funzione che scrive realmente il file .klp
    private static boolean writeDataset(RealMatrix matrix, String fileName, ArrayList<String> documentsID) {
        BufferedWriter writer;
        try {
            writer = new BufferedWriter(new FileWriter(fileName));
            for (int i = 0; i < matrix.getColumnDimension(); i++) {
                //TODO - DOC_N --> Da sostituire con id_del_ticket
                String eachLine = documentsID.get(i) + " " + Const.START_LINE;
                //String eachLine = Const.START_LINE;
                for (int j = 0; j < matrix.getRowDimension(); j++) {
                    eachLine += (df.format(matrix.getEntry(j, i)) + ",");
                }
                eachLine = eachLine.substring(0, eachLine.length() - 1);
                eachLine += ("|EDV|\n");
                System.out.println(eachLine);
                writer.write(eachLine);
            }
            writer.close();
            return true;

        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    //funzione che scrive il file IDF.klp
    private static boolean writeIDF(ArrayList<String> idf, String fileName) {
        BufferedWriter writer;
        try {
            writer = new BufferedWriter(new FileWriter(fileName));
            for (String s : idf) writer.write(s + "\n");

            writer.close();
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    //funzione che scrive il file vector.klp
    private static boolean writeVector(Ticket ticket, String fileName, String IDFFilePath) throws FileNotFoundException {

        ArrayList<String> IDF = new ArrayList<String>();

        try (BufferedReader reader = new BufferedReader(new FileReader(IDFFilePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                IDF.add(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        BufferedWriter writer;
        try {
            writer = new BufferedWriter(new FileWriter(fileName));

            String document = ticket.getObject() + " " + ticket.getDescription();
            double[] vector = TermsDocsElaborator.computeTermDocsVector(TextElaborator.stemmingsAndStopWordsRemover(document), IDF);

            String eachLine = "Ticket " + Const.START_LINE;
            writer.write(eachLine);
            for (int i = 0; i < vector.length; i++) {
                eachLine = (df.format(vector[i]) + ",");
                writer.write(eachLine);
            }
            eachLine = eachLine.substring(0, eachLine.length() - 1);
            eachLine += ("|EDV|\n");

            writer.write(eachLine);

            writer.close();
            return true;

        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

    }

    public static String findClusterNameByClusterlist(ClusterList clusterList, String[] split) {

        String clusterName = "";

        for (Cluster c : clusterList) {
            for (ClusterExample clusterMember : c.getExamples()) {
                for (int i = 0; i < c.getExamples().size(); i++) {
                    if (split[0].contains(clusterMember.getExample().getLabels()[0].toString())) {
                        return c.getLabel();
                    }
                }
            }
        }

        return clusterName;
    }
}
