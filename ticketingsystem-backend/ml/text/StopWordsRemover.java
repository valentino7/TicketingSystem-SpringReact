package it.uniroma2.ticketingsystem.ml.text;

import org.apache.lucene.analysis.CharArraySet;
import org.apache.lucene.analysis.StopFilter;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.Tokenizer;
import org.apache.lucene.analysis.en.EnglishAnalyzer;
import org.apache.lucene.analysis.standard.StandardTokenizer;
import org.apache.lucene.analysis.tokenattributes.CharTermAttribute;
import org.apache.lucene.util.AttributeFactory;

import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;

public class StopWordsRemover {

    public static ArrayList<String> removeStopWords(String queryStr) {

        ArrayList<String> tokens = new ArrayList<String>();
        AttributeFactory factory = AttributeFactory.DEFAULT_ATTRIBUTE_FACTORY;
        Tokenizer tokenizer = new StandardTokenizer(factory);
        tokenizer.setReader(new StringReader(queryStr));
        CharArraySet stopWords = EnglishAnalyzer.getDefaultStopSet();
        TokenStream tokenStream = new StopFilter(tokenizer, stopWords);

        CharTermAttribute charTermAttribute = tokenizer.addAttribute(CharTermAttribute.class);
        try {
            tokenStream.reset();
            while (tokenStream.incrementToken()) {
                String term = charTermAttribute.toString();
                tokens.add(term);
            }

            tokenStream.end();
            tokenStream.close();

            tokenizer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return tokens;
    }

}
