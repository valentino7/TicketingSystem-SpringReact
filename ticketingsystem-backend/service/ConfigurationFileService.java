package it.uniroma2.ticketingsystem.service;

import it.uniroma2.ticketingsystem.domain.*;
import it.uniroma2.ticketingsystem.domain.factoryTarget.FactoryTarget;
import it.uniroma2.ticketingsystem.repository.ConfigurationFileRepository;
import it.uniroma2.ticketingsystem.repository.TargetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class ConfigurationFileService {

    private int INDEX_CONFIG_FILE = 0;

    @Autowired
    private ConfigurationFileRepository mRepo_ConfigurationFile;
    @Autowired
    private TargetRepository targetRepository;

    @Transactional
    public boolean createConfigFile(ConfigurationFile configurationFile){
        mRepo_ConfigurationFile.save(configurationFile);
        return true;
    }

    @Transactional
    public ConfigurationFile findConfigurationFileBy(String id){
        return mRepo_ConfigurationFile.findConfigurationFileBy(id);
    }

    @Transactional
    public ArrayList<ConfigurationFile> findAllConfigurationFiles() {
        return mRepo_ConfigurationFile.findAll();
    }

    @Transactional
    public ArrayList<UserRole> findInternalUserRoles() {
        return mRepo_ConfigurationFile.findAll().get(INDEX_CONFIG_FILE).getUserSettings().getUserRolesInternal();
    }

    @Transactional
    public ArrayList<UserRole> findExternalUserRoles() {
        return mRepo_ConfigurationFile.findAll().get(INDEX_CONFIG_FILE).getUserSettings().getUserRolesInternal();
    }

    @Transactional
    public ArrayList<TicketCategory> getTicketCategories() {
        return mRepo_ConfigurationFile.findAll().get(INDEX_CONFIG_FILE).getTicketSettings().getTicketCategories();
    }

    @Transactional
    public ArrayList<TicketCategory> getActiveTicketCategories() {
        ArrayList<TicketCategory> ticketCategories =
                mRepo_ConfigurationFile.findAll().get(INDEX_CONFIG_FILE).getTicketSettings().getTicketCategories();
        ticketCategories.removeIf(ticketCategory -> !ticketCategory.isEnabled());
        return ticketCategories;
    }

    @Transactional
    public ArrayList<TeamName> getTeams() {
        return mRepo_ConfigurationFile.findAll().get(INDEX_CONFIG_FILE).getTeamSettings().getTeamNames();
    }

    @Transactional
    public ArrayList<TeamName> getActiveTeams() {
        ArrayList<TeamName> teamNames =
                mRepo_ConfigurationFile.findAll().get(INDEX_CONFIG_FILE).getTeamSettings().getTeamNames();
        teamNames.removeIf(teamName -> !teamName.isEnabled());
        return teamNames;
    }

    @Transactional
    public boolean addCategory(@NotNull String category) {

        ConfigurationFile configurationFile = findAllConfigurationFiles().get(INDEX_CONFIG_FILE);
        ArrayList<TicketCategory> categories = configurationFile.getTicketSettings().getTicketCategories();

        return true;
    }

    @Transactional
    public ArrayList<TicketAdditionalField> getTicketAdditionalFields() {
        return  mRepo_ConfigurationFile.findAll().get(INDEX_CONFIG_FILE).getTicketSettings().getAdditionalField();
    }

    @Transactional
    public boolean addTicketTypology(Typology typology) {
        ConfigurationFile configurationFile = findAllConfigurationFiles().get(INDEX_CONFIG_FILE);
        ArrayList<Typology> typologies = configurationFile.getTicketSettings().getTypologies();
        Optional<Typology> t = typologies
                .stream()
                .max(Comparator.comparing(Typology::getId));
        if ( t.isPresent() ){
            typology.setId(t.get().getId()+1);
        }
        else {
            typology.setId(1);
        }
        typologies.add(typology);
        configurationFile.getTicketSettings().setTypologies(typologies);
        mRepo_ConfigurationFile.save(configurationFile);
        return true;
    }

    @Transactional
    public ArrayList<Typology> getTicketTypology() {
        ArrayList<Typology> listoToReturn = mRepo_ConfigurationFile.findAll().get(INDEX_CONFIG_FILE).getTicketSettings().getTypologies();
        ArrayList<TicketAdditionalField> defaultField = this.getTicketAdditionalFields();



        for ( Typology t : listoToReturn){
            ArrayList<AdditionalField> temp = t.getAdditionalFields();
            for (AdditionalField a : temp ){
                FieldReference f = a.getRef();
                f.setType(defaultField
                        .stream()
                        .filter(element -> element.getId() == f.getId())
                        .findFirst()
                        .get().getType());
            }
        }
        return listoToReturn;


    }

    @Transactional
    public Typology getTypologyById(int id) {
        ConfigurationFile configurationFile = findAllConfigurationFiles().get(INDEX_CONFIG_FILE);
        ArrayList<TicketAdditionalField> defaultFields = this.getTicketAdditionalFields();
        Optional<Typology> typologyToGet = configurationFile.getTicketSettings().getTypologies()
                .stream()
                .filter(element -> element.getId() == id)
                .findFirst();
        if ( typologyToGet.isPresent()) {
            for ( AdditionalField ad : typologyToGet.get().getAdditionalFields()) {
                ad.getRef().setType(defaultFields
                        .stream()
                        .filter(element -> element.getId() == ad.getRef().getId())
                        .findFirst()
                        .get().getType()
                );
            }
        } else
            return null;
        return typologyToGet.get();
    }

    @Transactional
    public Boolean addTypologyAdditionalField(int id, AdditionalField additionalField) {
        ConfigurationFile configurationFile = findAllConfigurationFiles().get(INDEX_CONFIG_FILE);
        ArrayList<Typology> tip = configurationFile.getTicketSettings().getTypologies();
        for ( Typology t : tip){
            if ( t.getId() == id ) {
                ArrayList<AdditionalField> ad = t.getAdditionalFields();
                Optional<AdditionalField> lastAdditionalField = ad
                        .stream()
                        .max(Comparator.comparing(AdditionalField::getId));
                if ( lastAdditionalField.isPresent() )
                    additionalField.setId(lastAdditionalField.get().getId() +1);
                else
                    additionalField.setId(1);
                ad.add(additionalField);
                t.setAdditionalFields(ad);
                configurationFile.getTicketSettings().setTypologies(tip);
            }
        }
        mRepo_ConfigurationFile.save(configurationFile);
        return true;
    }

    @Transactional
    public Boolean deleteTypology(int id) {
        List<FactoryTarget> targetList = targetRepository.findAll();
        for ( FactoryTarget ft : targetList){
            if ( ft.getTypId() == id ){
                ft.setTypId(0);
            }
        }
        targetRepository.saveAll(targetList);
        ConfigurationFile configurationFile = findAllConfigurationFiles().get(INDEX_CONFIG_FILE);
        configurationFile.getTicketSettings().getTypologies().removeIf(element -> element.getId() == id);
        mRepo_ConfigurationFile.save(configurationFile);
        return true;
    }

    @Transactional
    public Boolean deleteAdditionalField(int idTypology, int idField) {
        ConfigurationFile configurationFile = findAllConfigurationFiles().get(INDEX_CONFIG_FILE);
        configurationFile.getTicketSettings().getTypologies().get(idTypology-1).getAdditionalFields().removeIf(element -> element.getId() == idField);
        mRepo_ConfigurationFile.save(configurationFile);
        return true;
    }

}
