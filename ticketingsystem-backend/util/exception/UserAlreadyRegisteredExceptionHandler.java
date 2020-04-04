package it.uniroma2.ticketingsystem.util.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

public class UserAlreadyRegisteredExceptionHandler {

    @ExceptionHandler(UserAlreadyRegisteredException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public Object processValidationError(UserAlreadyRegisteredException ex) {
        String result = ex.getErrorMessage();
        System.out.println("###########"+result);
        return ex;
    }
}