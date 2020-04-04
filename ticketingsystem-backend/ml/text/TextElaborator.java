package it.uniroma2.ticketingsystem.ml.text;

import java.util.ArrayList;
import java.util.Arrays;

import static it.uniroma2.ticketingsystem.ml.text.StopWordsRemover.removeStopWords;

public class TextElaborator {

    static Stemmer stemmer = new Stemmer();

    public static ArrayList<String> stemmingsAndStopWordsRemover(String text){

        ArrayList<String> terms = new ArrayList<>(Arrays.asList(text.split(" ")));
        terms.replaceAll(s -> s = stemmer.stem(s));
        terms = removeStopWords(String.join(" ", terms));

        System.out.println(terms);

        return terms;
    }
}
