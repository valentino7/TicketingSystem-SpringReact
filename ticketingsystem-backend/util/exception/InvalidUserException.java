package it.uniroma2.ticketingsystem.util.exception;

public class InvalidUserException extends Exception {

	private int errorCode;
	private String errorMessage;

	public InvalidUserException(Throwable throwable) {
		super(throwable);
	}

	public InvalidUserException(String msg, Throwable throwable) {
		super(msg, throwable);
	}

	public InvalidUserException(String msg) {
		super(msg);
	}

	public InvalidUserException(String message, int errorCode) {
		super();
		this.errorCode = errorCode;
		this.errorMessage = message;
	}


	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}

	public int getErrorCode() {
		return errorCode;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	@Override
	public String toString() {
		return this.errorCode + " : " + this.getErrorMessage();
	}
}
