package it.uniroma2.ticketingsystem.util.exception;

public class InvalidUsernameException extends Exception {

	public InvalidUsernameException(String m){
	    super(m);
	}

	public String toString(){
		return "Incorrect username";
	}
}

