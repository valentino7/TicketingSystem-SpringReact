package it.uniroma2.ticketingsystem.domain.costants;

public class Costants {

    //Errors
    public static final String TITLE_CREATE_STOPWORDS_ERROR = "STOPWORD ALREADY EXISTS";
    public static final String TEXT_CREATE_STOPWORDS_ERROR = "Stopword has not been successfully created";
    public static final String TITLE_DELETE_STOPWORDS_ERROR = "STOPWORD NOT BEEN DELETED";
    public static final String TEXT_DELETE_STOPWORDS_ERROR = "Stopword has not been successfully deleted";
    public static final String TITLE_CREATE_TARGET_ERROR = "STOPWORD ALREADY EXISTS";
    public static final String TEXT_CREATE_TARGET_ERROR = "Target has not been successfully deleted";
    public static final String TITLE_DELETED_TARGET_ERROR = "STOPWORD NOT EXISTS";
    public static final String TEXT_DELETED_TARGET_ERROR = "Target has not been successfully deleted";
    public static final String TEXT_UPDATED_TARGET_ERROR = "Target has not been successfully updated";
    public static final String TITLE_UPDATED_TARGET_ERROR = "STOPWORD NOT EXISTS";


    //URL
    public static final String URL_GENERAL_TARGET = "/target";
    public static final String URL_GENERAL_STOPWORD = "/stopwords";
    public static final String URL_GENERAL_CLUSTERING = "/clustering";
    public static final String URL_GENERAL_CLASSIFICATION = "/classification";
    public static final String PATH_CREATE_STOPWORD = "/createStopword";
    public static final String PATH_FIND_STOPWORD_BY_TARGET = "/findStopwordsByTarget/{target}";
    public static final String PATH_FIND_STOPWORD_BY_VALUE = "/findStopwordsByValue/{value}";
    public static final String PATH_UPDATE_STOPWORD_BY_ID = "updateStopword/{id}";
    public static final String PATH_FIND_STOPWORD_BY_VALUE_TARGET = "/findStopwordsByValueAndTarget/{value}/{target}";
    public static final String PATH_DELETE_STOPWORD_BY_VALUE_TARGET = "/deleteStopwordByValueAndTarget/{target}";
    public static final String PATH_DELETE_ALL_STOPWORD_BY_TARGET = "/deleteAllStopwordsByTarget/{target}";

}
