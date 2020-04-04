package it.uniroma2.ticketingsystem.ml.constant;

import java.io.File;

public class Const {

    //KERNEL TYPE
    public static final String LINEAR_KERNEL = "lin";
    public static final String POLINOMIAL_KERNEL = "pol";

    // SEPARATOR
    public static String s = File.separator;

    //TAG DENSE VECTOR
    public static String START_LINE = "|BDV|";
    public static String CLOSE_LINE = "|EDV|";

    //DATASET NAME.KLP
    public static String DATASET_KLP = "dataset.klp";
    public static String CLUSTERING_KLP = "clustering.klp";
    public static String IDF_KLP = "IDF.klp";
    public static String VECTOR_KLP = "vector.klp";

    //ROOT LOCAL PATH
    public static String LOCAL_PATH = "C:"+s+"Users"+s+"Emiliano"+s+"Desktop"+s+"DatasetS3"+s;
    public static String FILE_LOCAL_PATH = "./";
    //public static String LOCAL_PATH = "./";

    //PATH FOLDER NAME
    public static String CLUSTERING = "clustering";
    public static String DATASET = "dataset";
    public static String FILE = "file";
    public static String CLASSIFICATION = "classification";

    //LOCAL FINAL PATH
    public static String LOCAL_DATASET_PATH = LOCAL_PATH + DATASET;
    public static String LOCAL_CLUSTERING_PATH = LOCAL_PATH + CLUSTERING;
    public static String LOCAL_CLASSIFICATION_PATH = LOCAL_PATH + CLASSIFICATION;

    //BUCKET S3 PATH
    public static String BUCKET_PATH = "sdcc2018";
    public static String DATASET_BUCKET_PATH = "dataset/";
    public static String FILE_BUCKET_PATH = "file/";
    public static String CLUSTERING_BUCKET_PATH = "clustering/";

}
