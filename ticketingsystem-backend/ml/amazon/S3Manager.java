package it.uniroma2.ticketingsystem.ml.amazon;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.GetObjectRequest;

import java.io.File;

public class S3Manager {

    private static BasicAWSCredentials awsCreds = new BasicAWSCredentials("AKIAIJSBRAROMHLDTGTQ", "qi2iDZdlaKFemL5K8u02YOcTjaq66BASducByS7+");
    private static AmazonS3 s3Client;


    public static void writeTargetDataset(String bktname, String key, String pathFile) {

        s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds)).withRegion("eu-west-1")
                .build();

        if (!s3Client.doesBucketExistV2(bktname)) {
            s3Client.createBucket(bktname);
        }

        s3Client.putObject(bktname, key, new File(pathFile));

    }

    public static void writeIDFList(String bktname, String key, String pathFile) {

        s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds)).withRegion("eu-west-1")
                .build();

        if (!s3Client.doesBucketExistV2(bktname)) {
            s3Client.createBucket(bktname);
        }

        s3Client.putObject(bktname, key, new File(pathFile));

    }


    public static void writeUserFile(String bktname, String key, String pathFile) {

        s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds)).withRegion("eu-west-1")
                .build();

        if (!s3Client.doesBucketExistV2(bktname)) {
            s3Client.createBucket(bktname);
        }

        s3Client.putObject(bktname, key, new File(pathFile));

    }

    public static void getFileFromBucket(String bktname, String key, String pathFile) {

        s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds)).withRegion("eu-west-1")
                .build();
        try{
            s3Client.getObject(new GetObjectRequest(bktname, key), new File(pathFile));
        }catch (AmazonS3Exception e){
            System.err.println(e.toString());
        }
    }

}
