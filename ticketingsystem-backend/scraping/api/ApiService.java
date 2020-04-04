package it.uniroma2.ticketingsystem.scraping.api;


import it.uniroma2.ticketingsystem.scraping.model.StackOverflowResponse;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;


public interface ApiService {

    //https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&tagged=sql&site=stackoverflow

    /*
    Inserisco come parametro dell'annotazione @Query il parametro da riempire nell'URL .
    Tale parametro verrà riempito dall'attributo che segue l'annotazione, in questo caso "tag".
    */

    ///2.2/questions?page=1&pagesize=100&order=desc&sort=activity&site=stackoverflow
    @GET("questions?order=desc&sort=activity&site=stackoverflow&filter=withbody&pagesize=15")
    Call<StackOverflowResponse> getQuestionsFromTag(@Query("tagged") String tag, @Query("page") String page);

    //https://api.stackexchange.com/2.2/questions/43225521?&site=stackoverflow&filter=withbody
    @GET("questions/{id}")
    Call<StackOverflowResponse> getQuestionFromId(
            @Path("id") String id,
            @Query("site") String site,
            @Query("filter") String filter
    );

}
