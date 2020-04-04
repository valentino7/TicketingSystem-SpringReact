package it.uniroma2.ticketingsystem.rest;

import it.uniroma2.ticketingsystem.domain.Clusters;
import it.uniroma2.ticketingsystem.domain.DBReference;
import it.uniroma2.ticketingsystem.domain.Ticket;
import it.uniroma2.ticketingsystem.scraping.api.ApiHandler;
import it.uniroma2.ticketingsystem.scraping.api.ApiService;
import it.uniroma2.ticketingsystem.scraping.model.Item;
import it.uniroma2.ticketingsystem.scraping.model.StackOverflowResponse;
import it.uniroma2.ticketingsystem.service.ClusteringService;
import it.uniroma2.ticketingsystem.service.TicketService;
import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

import java.util.Map;

import static it.uniroma2.ticketingsystem.domain.costants.Costants.URL_GENERAL_CLUSTERING;

@RestController
@RequestMapping(path = URL_GENERAL_CLUSTERING)
@CrossOrigin
public class ClusteringRestController {

    @Autowired
    private ClusteringService clusteringService;

    @Autowired
    private TicketService ticketService;

    @RequestMapping(path = "", method = RequestMethod.POST)
    public ResponseEntity<Boolean> clustering(@RequestBody Map<String, Object> clusteringData) {
        Boolean outcome = clusteringService.printClusteringData(clusteringData);
        return new ResponseEntity<>(outcome, outcome ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    ////////////////////////////22222///////////////////////////
    @RequestMapping(path = "/elaborateCluster/{target}/{K}", method = RequestMethod.GET)
    public ResponseEntity<Boolean> clusteringByTarget(@PathVariable String target, @PathVariable int K) throws Exception {

        Boolean outcome = clusteringService.elaborateClusteringByTarget(target, K);
        return new ResponseEntity<>(outcome, outcome ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping(path = "/getStatisticAndLinkByTarget/{target}", method = RequestMethod.GET)
    public ResponseEntity<Clusters> statisticsAndLinksByTarget(@PathVariable String target) throws Exception {

        Clusters clusters = clusteringService.findStatisticsAndLinksByTarget(target);
        return new ResponseEntity<>(clusters, HttpStatus.CREATED);
    }





    ////////////////////////////11111///////////////////////////
    @RequestMapping(path = "/prepareDataset/{target}/{reduction}", method = RequestMethod.GET)
    public ResponseEntity<Boolean> prepareDatasetByTarget(@PathVariable String target, @PathVariable int reduction) {

        Boolean outcome = clusteringService.prepareDatasetByTarget(target, reduction);
        return new ResponseEntity<>(outcome, outcome ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public static String html2text(String html) {
        return Jsoup.parse(html).text();
    }




    ////////////////////////////00000///////////////////////////
    @RequestMapping(path = "/scraping/{page}/{name}", method = RequestMethod.GET)
    public ResponseEntity<Boolean> scraping(@PathVariable int page, @PathVariable String name) {

        //retrofit non è altro che un Adapter (pattern)
        Retrofit retrofit = ApiHandler.getInstance().getRetrofitClient();
        //Si crea un Service per l’adapter retrofit. Utilizziamo l'interfaccia APIService
        ApiService service = retrofit.create(ApiService.class);

        Call<StackOverflowResponse> getQuestionsFromTag = service.getQuestionsFromTag(name, String.valueOf(page));
        getQuestionsFromTag.enqueue(new Callback<StackOverflowResponse>() {

            @Override
            public void onResponse(Call<StackOverflowResponse> call, Response<StackOverflowResponse> response) {

                for (Item item : response.body().getItems()) {
                    Ticket t = new Ticket();
                    item.setTitle(html2text(item.getTitle()));
                    item.setBody(html2text(item.getBody()));
                    t.update_ticket(item.getTitle(), item.getBody(), new DBReference("5b48ad8642c0a43894e53de8", "target"));
                    ticketService.createTicket(t);

                }
            }

            @Override
            public void onFailure(Call<StackOverflowResponse> call, Throwable throwable) {
                System.err.println("Get failed");
            }
        });
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
