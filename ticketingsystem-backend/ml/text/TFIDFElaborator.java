package it.uniroma2.ticketingsystem.ml.text;

import java.util.ArrayList;
import java.util.List;

public class TFIDFElaborator {

    public static double log2(double num) { return (Math.log(num)/Math.log(2)); }

    /**
     * @param doc  list of strings
     * @param term String represents a term
     * @return term frequency of term in document
     */
    public static double tf(ArrayList<String> doc, String term) {
        double result = 0;
        for (String word : doc) {
            if (term.equalsIgnoreCase(word))
                result++;
        }
        return result / doc.size();
    }

    /**
     * @param docs list of list of strings represents the dataset
     * @param term String represents a term
     * @return the inverse term frequency of term in documents
     */
    public static double idf(ArrayList<ArrayList<String>> docs, String term) {
        double n = 0;
        for (List<String> doc : docs) {
            for (String word : doc) {
                if (term.equalsIgnoreCase(word)) {
                    n++;
                    break;
                }
            }
        }
        return log2(docs.size()/n);
    }

    /**
     * @param doc  a text document
     * @param docs all documents
     * @param term term
     * @return the TF-IDF of term
     */
    public double tfIdf(ArrayList<String> doc, ArrayList<ArrayList<String>> docs, String term) {
        return tf(doc, term) * idf(docs, term);
    }

    public static double computeTFIDFOneTerm(ArrayList<String> args, ArrayList<ArrayList<String>> documents, String term) {

        TFIDFElaborator calculator = new TFIDFElaborator();
        return calculator.tfIdf(args, documents, term);

    }

}
