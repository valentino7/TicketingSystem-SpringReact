package it.uniroma2.ticketingsystem.ml.text;

import java.util.ArrayList;
import java.util.HashMap;

public class TermsDocsElaborator {

    public static int NUM_TERMS;
    public static int NUM_DOCS;

    public TermsDocsElaborator(){
        this.NUM_DOCS = 0;
        this.NUM_TERMS = 0;
    }

    public static ArrayList<String> calculateUniqueTermsAmountFromDocs(ArrayList<ArrayList<String>> documents){

        ArrayList<String> uniqueTerms = new ArrayList<String>();

        for (int i = 0; i < documents.size(); i++) {
            for(String term: documents.get(i)){
                if(!uniqueTerms.contains(term)){
                    uniqueTerms.add(term);
                }
            }
        }

        return uniqueTerms;
    }

    public static ArrayList<String> calculateUniqueTermsAmountFromDoc(ArrayList<String> document) {

        ArrayList<String> uniqueTerms = new ArrayList<String>();

        for (String term : document) {
            if (!uniqueTerms.contains(term)) {
                uniqueTerms.add(term);
            }
        }

        return uniqueTerms;
    }

    public static double[][] computeTermDocsMatrix(ArrayList<ArrayList<String>> documents){

        ArrayList<String> uniqueTerms = calculateUniqueTermsAmountFromDocs(documents);
        NUM_TERMS = uniqueTerms.size();
        NUM_DOCS = documents.size();

        double[][] termsDocs = new double[NUM_TERMS][NUM_DOCS];

        for (int i = 0; i < NUM_DOCS; i++) {
            for (int j = 0; j < NUM_TERMS; j++) {
                termsDocs[j][i] = TFIDFElaborator.computeTFIDFOneTerm(documents.get(i),documents,uniqueTerms.get(j));
            }
        }
        return termsDocs;
    }


    public static double[] computeTermDocsVector(ArrayList<String> document, ArrayList<String> idf) {

        NUM_TERMS = idf.size();

        double[] termsDocs = new double[NUM_TERMS];

        for (int i = 0; i < idf.size(); i++) {

            String[] value = idf.get(i).split(" ");

            if (document.contains(value[0])) {
                termsDocs[i] =  TFIDFElaborator.tf(document, value[0])
                                * Double.valueOf(value[1]);
            } else {
                termsDocs[i] = 0;
            }
        }

        return termsDocs;

    }


    public static ArrayList<String> computeOnlyIDF(ArrayList<ArrayList<String>> documents) {

        ArrayList<String> uniqueTerms = calculateUniqueTermsAmountFromDocs(documents);

        NUM_TERMS = uniqueTerms.size();
        NUM_DOCS = documents.size();

        for (int i = 0; i < uniqueTerms.size(); i++) {
            uniqueTerms.set(i, uniqueTerms.get(i) + " " + TFIDFElaborator.idf(documents, uniqueTerms.get(i)));
        }

        return uniqueTerms;
    }

}
