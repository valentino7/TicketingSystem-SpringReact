package it.uniroma2.ticketingsystem.scraping.api;


public class APIUrl {


    //https://api.stackexchange.com/2.2/questions/43225521?&site=stackoverflow&filter=withbody
    public static final String ROOT_URL = "https://api.stackexchange.com/2.2/";

    //https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&tagged=sql&site=stackoverflow

    //https://api.stackexchange.com/2.2/questions/43225521?&site=stackoverflow&filter=withbody
    public static final String QUESTION_RESULT = "questions/";
    public static final String QUESTION_SPECS_RESULT = "?&site=stackoverflow&filter=withbody";


}
