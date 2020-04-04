package it.uniroma2.ticketingsystem.scraping.api;


import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by Emiliano on 08/03/2018.
 */

public class ApiHandler {

    private Retrofit retrofit;
    private OkHttpClient.Builder okHttpClient;

    private static ApiHandler instance = null; // pattern singleton


    /**
     * La libreria utilizza un convertitore del formato JSON chiamato GSON per il parsing automatico.
     *
     * Il baseUrl viene utilizzato come “indirizzo base” per le chiamate da effettuare in modo
     * da non dover scrivere per intero l’intero url dell’api da chiamare ma sarà costruito dinamicamente
     * dal baseUrl unito all’url dell’api.
     */
    protected ApiHandler() {
        retrofit = new Retrofit.Builder() // pattern builder
                .baseUrl(APIUrl.ROOT_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
    }

    public static ApiHandler getInstance() {
        if(instance == null) {
            instance = new ApiHandler();
        }
        return instance;
    }

    public Retrofit getRetrofitClient(){
        return retrofit;
    }

}

