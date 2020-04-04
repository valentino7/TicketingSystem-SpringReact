package it.uniroma2.ticketingsystem.util.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@ControllerAdvice
public class ControllerException extends ResponseEntityExceptionHandler {

/*
    @ResponseStatus(value=HttpStatus.INTERNAL_SERVER_ERROR, reason="Stopword has not been successfully created")
    @ExceptionHandler(MessageErrorException.class)
    @ResponseBody
    public void handleServerErrorException(){
    }*/

   /* @ExceptionHandler(value = { MessageErrorException.class })
    @ResponseBody
    protected ResponseEntity<Object> handleConflict(MessageErrorException ex, WebRequest request) {
        System.err.println(request);
        if(request.toString().contains("/ticketingsystem/stopwords/createStopword/")) {
            MessageErrorException bodyOfResponse = new MessageErrorException("STOPWORD ALREADY EXISTS", "Stopword has not been successfully created");
            return handleExceptionInternal(ex, bodyOfResponse,
                    new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
        }else if(request.toString().contains("deleteStopwordByValueAndTarget/")){
            MessageErrorException bodyOfResponse = new MessageErrorException("STOPWORD NOT BEEN DELETED", "Stopword has not been successfully deleted");
            return handleExceptionInternal(ex, bodyOfResponse,
                    new HttpHeaders(), HttpStatus.NOT_FOUND, request);
        }
        return null;
    }*/
   @ExceptionHandler(MessageErrorException.class)
   @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
   @ResponseBody
   public Object processInternalError(MessageErrorException ex) {
       String result = ex.getText();
       System.err.println("###########"+result);
       return ex;
   }



}