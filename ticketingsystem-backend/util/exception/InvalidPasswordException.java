package it.uniroma2.ticketingsystem.util.exception;

public class InvalidPasswordException extends Exception {

	public InvalidPasswordException(String m){
		super(m);
	}

	public String toString(){
		return "Incorrect password";
	}
}

