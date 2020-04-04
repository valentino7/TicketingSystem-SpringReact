package it.uniroma2.ticketingsystem.domain.factoryTarget;


public interface Target {
    String getName();
    void setName(String name);
    String getVersion();
    void setVersion(String version);
    void setEnabled(boolean enabled);
    boolean getEnabled();

}
