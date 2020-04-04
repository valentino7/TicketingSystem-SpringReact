package it.uniroma2.ticketingsystem.util.exception;


@SuppressWarnings("serial")
public class MemberWithPendingTickets extends Exception {
	private String errorMessage;

	public MemberWithPendingTickets(){};

	public String getErrorMessage() {
		return errorMessage;
	}
}
