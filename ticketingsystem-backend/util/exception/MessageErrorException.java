package it.uniroma2.ticketingsystem.util.exception;

public class MessageErrorException extends Exception {
    private String title;
    private String text;


    public MessageErrorException(String title, String text){
        this.title= title;
        this.text=text;
    }

    public MessageErrorException(  ){
        super();
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }




    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }


}
