package it.uniroma2.ticketingsystem.util.exception;

public class UserAlreadyRegisteredException extends Exception {

	private int errorCode;
	private String errorMessage;

	public UserAlreadyRegisteredException(Throwable throwable) {
		super(throwable);
	}

	public UserAlreadyRegisteredException(String msg, Throwable throwable) {
		super(msg, throwable);
	}

	public UserAlreadyRegisteredException(String msg) {
		super(msg);
	}

	public UserAlreadyRegisteredException(String message, int errorCode) {
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
