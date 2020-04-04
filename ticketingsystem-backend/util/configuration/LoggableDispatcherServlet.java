package it.uniroma2.ticketingsystem.util.configuration;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.HandlerExecutionChain;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;
import java.util.Date;

@Configuration
// La DispatcherServlet reindirizza una  richiesta HTTP verso il metodo Java configurato per servire quella richiesta.
// La redirezione avviene in base ai valori dei seguenti attributi della richiesta HTTP: metodo, URL e parametri.
// Spring offre una implementazione di default, ovvero org.springframework.web.servlet.DispatcherServlet
// La classe LoggableDispatcherServlet estende la DispatcherServlet di default aggiungendo la
public class LoggableDispatcherServlet extends DispatcherServlet {

    public static final int MAX_PAYLOAD_LENGTH_TO_LOG = 5120;
    // Anche per il logging, come per l'accesso alla persistenza, Java definisce un'interfaccia comune chiamata
    // Simple Logging Facade for Java (SLF4J). Questa interfaccia viene implementata dalle varie librerie di logging
    // (tra cui Logback).
    // Spring di default imposta Logback come libreria di Logging, ma può essere modificata aggiungendo un'altra libreria
    // di logging nel file pom.xml.
    // Per prelevare l'istanza del Logger basta usare il factory method.
    private final Log logger = LogFactory.getLog(getClass());

    // metodo di configurazione: quale dispatcher servlet bisogna utilizzare? S
    // Tuttavia, lo sviluppatore può definire uno Spring Bean che ridefinisce i comportamenti dlla DispatcherServlet
    @Bean(name = DispatcherServletAutoConfiguration.DEFAULT_DISPATCHER_SERVLET_BEAN_NAME)
    public DispatcherServlet dispatcherServlet() {
        return new LoggableDispatcherServlet();
    }

    @Override
    protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {
        if (!(request instanceof ContentCachingRequestWrapper)) {
            request = new ContentCachingRequestWrapper(request);
        }

        HandlerExecutionChain handler = getHandler(request);

        try {
            super.doDispatch(request, response);
        } finally {
            log(request, response, handler);
        }
    }

    private void log(HttpServletRequest requestToCache, HttpServletResponse responseToCache, HandlerExecutionChain handler) {
        StringBuilder log = new StringBuilder();
        log.append("\nStatus: ").append(responseToCache.getStatus());
        log.append("\nHttp Method: ").append(requestToCache.getMethod());
        log.append(" Path: ").append(requestToCache.getRequestURI());
        log.append("\nClient Ip: ").append(requestToCache.getRemoteAddr());
        log.append("\nJava method: " + handler.toString());
        log.append("\nRequest body:").append(getRequestPayload(requestToCache));
        log.append("\nResponse body:").append(getResponsePayload(responseToCache));
        Timestamp end = new Timestamp(new Date().getTime());
        log.append("\n------------------End: ").append(end);
        logger.info(log);
    }

    private String getResponsePayload(HttpServletResponse response) {
        ContentCachingResponseWrapper wrapper = WebUtils.getNativeResponse(response, ContentCachingResponseWrapper.class);
        if (wrapper != null) {
            return _extractPayloadFromBuffer(wrapper.getContentAsByteArray(), wrapper.getCharacterEncoding());
        }
        return "[]";
    }


    private String getRequestPayload(HttpServletRequest request) {
        ContentCachingRequestWrapper wrapper = WebUtils.getNativeRequest(request, ContentCachingRequestWrapper.class);
        if (wrapper != null) {
            return _extractPayloadFromBuffer(wrapper.getContentAsByteArray(), wrapper.getCharacterEncoding());
        }
        return "[]";
    }

    private String _extractPayloadFromBuffer(byte[] buf, String characterEncoding) {
        if (buf.length > 0) {
            int length = Math.min(buf.length, MAX_PAYLOAD_LENGTH_TO_LOG);
            try {
                return new String(buf, 0, length, characterEncoding);
            } catch (UnsupportedEncodingException ex) {
                return "[Error extracting payload";
            }
        }
        return "";
    }
}