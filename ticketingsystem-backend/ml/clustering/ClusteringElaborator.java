package it.uniroma2.ticketingsystem.ml.clustering;

import it.uniroma2.sag.kelp.data.clustering.Cluster;
import it.uniroma2.sag.kelp.data.clustering.ClusterExample;
import it.uniroma2.sag.kelp.data.clustering.ClusterList;
import it.uniroma2.sag.kelp.data.dataset.SimpleDataset;
import it.uniroma2.sag.kelp.learningalgorithm.clustering.kmeans.LinearKMeansCluster;
import it.uniroma2.sag.kelp.learningalgorithm.clustering.kmeans.LinearKMeansEngine;
import it.uniroma2.sag.kelp.utils.JacksonSerializerWrapper;
import it.uniroma2.sag.kelp.utils.ObjectSerializer;
import it.uniroma2.sag.kelp.utils.evaluation.ClusteringEvaluator;
import it.uniroma2.ticketingsystem.domain.*;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;

import static it.uniroma2.sag.kelp.utils.evaluation.ClusteringEvaluator.getMI;

import static it.uniroma2.sag.kelp.utils.evaluation.ClusteringEvaluator.getPurity;
public class ClusteringElaborator {

    public static Clusters computeClustering(String filename, int K) throws Exception {

        // Number of iteration of the Kernel-based K-means algorithm
        int tMax = 10;
        // Load the dataset
        SimpleDataset dataset = new SimpleDataset();
        dataset.populate(filename);

        // The representation considered from the algorithm
        String representationName = "0";

        // Initializing the clustering engine
        LinearKMeansEngine clusteringEngine = new LinearKMeansEngine(
                representationName, K, tMax);

        // Example of serialization of the engine via JSON
        ObjectSerializer serializer = new JacksonSerializerWrapper();
        System.out.println(serializer.writeValueAsString(clusteringEngine));

        // Run the clustering
        ClusterList clusterList = clusteringEngine.cluster(dataset);

        System.out.println("\n==================");
        System.out.println("Resulting clusters");
        System.out.println("==================\n");
        // Writing the resulting clusters and cluster members

        Clusters clu = new Clusters();

        Links links = new Links();

        DBReference dbReference = null;
        ArrayList<DBReference> db = null;

        for (Cluster cluster : clusterList) {
            db = new ArrayList<>();
            for (ClusterExample clusterMember : cluster.getExamples()) {
                dbReference = new DBReference(clusterMember.getExample().getLabels()[0].toString(), "ticket");
                float dist = (clusterMember).getDist();
                dbReference.setValue(Float.toString(dist));
                db.add(dbReference);
                System.out.println(dist + "\t" + cluster.getLabel() + "\t" + clusterMember.getExample());
            }
            System.out.println();
        }

        clu.setClusterList(clusterList);

        //LinearKMeansCluster mantiene salvati i centroidi
        ArrayList<LinearKMeansCluster> c = new ArrayList<LinearKMeansCluster>(K);
        ArrayList<ClusterName> nameCentroid = new ArrayList<>();
        SingolLink singolLink = null;
        ArrayList<SingolLink> ls = new ArrayList<>();
        for (Cluster cluster : clusterList) {
            LinearKMeansCluster l = (LinearKMeansCluster) cluster;
            c.add(l);
            for (Cluster destCluster : clusterList) {
                LinearKMeansCluster euclideanDistanceCluster = (LinearKMeansCluster) destCluster;
                if (!cluster.getLabel().equals(destCluster.getLabel()) && !nameCentroid.contains(euclideanDistanceCluster.getLabel())) {
                    singolLink = new SingolLink();
                    singolLink.setSource(cluster.getLabel());
                    singolLink.setTarget(destCluster.getLabel());
                    singolLink.setValue(l.getCentroid().euclideanDistance(euclideanDistanceCluster.getCentroid()));
                    ls.add(singolLink);
                }
            }
            nameCentroid.add(new ClusterName(l.getLabel()));

            //test
            System.out.println("Distanza dei centroidi dal centroide 0: " + c.get(0).getCentroid() + " = " + l.getCentroid().euclideanDistance(c.get(0).getCentroid()) + '\n');
        }
        links.setName(nameCentroid);
        links.setLink(ls);
        System.out.println(ClusteringEvaluator.getStatistics(clusterList));
        String statistics = ClusteringEvaluator.getStatistics(clusterList);
        String[] stats = statistics.split("\n");

        Date currentDate = GregorianCalendar.getInstance().getTime();
        DateFormat df = DateFormat.getDateInstance();
        String dateString = df.format(currentDate);

        clu.setStatistic(new Statistic(getPurity(clusterList),
                getMI(clusterList),
                Float.parseFloat(stats[2].split("\t")[1]),
                Float.parseFloat(stats[3].split("\t")[1]),dateString));

        clu.setLinks(links);
        return clu;
    }


}