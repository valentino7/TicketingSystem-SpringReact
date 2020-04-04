package it.uniroma2.ticketingsystem.domain;

import it.uniroma2.sag.kelp.data.clustering.Cluster;
import it.uniroma2.sag.kelp.data.clustering.ClusterList;

import java.util.ArrayList;

public class Clusters {
    private Statistic statistic;
    private Links links;
    private ClusterList clusterList;

    public Clusters(){}

    public Clusters(Statistic statistic, ClusterList clusterList) {
        this.statistic = statistic;
        this.clusterList = clusterList;
    }

    public Statistic getStatistic() {
        return statistic;
    }

    public void setStatistic(Statistic statistic) {
        this.statistic = statistic;
    }

    public ClusterList getClusterList() {
        return clusterList;
    }

    public void setClusterList(ClusterList clusterList) {
        this.clusterList = clusterList;
    }

    public Links getLinks() {
        return links;
    }

    public void setLinks(Links links) {
        this.links = links;
    }
}
