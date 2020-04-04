package it.uniroma2.ticketingsystem.util.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.context.request.WebRequest;

public class EntityNotFoundException extends Exception {
	private int errorCode;
	private String errorMessage;

	public EntityNotFoundException() {
	}

	public String getErrorMessage() {
		return errorMessage;
	}
}
