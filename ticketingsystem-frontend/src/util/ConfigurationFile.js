
/* Configuration File APIs */
/*
  Usage examples

  alert(ConfigurationFile.getInternalRoles());
  alert(ConfigurationFile.getExternalRoles());
  alert(ConfigurationFile.getTeamNames());
  alert(ConfigurationFile.getTicketCategories());
  alert(ConfigurationFile.getTicketLifecycles()[0].states);
  alert(ConfigurationFile.getTicketLifecycles()[1].states);

*/

import {configFileActions} from "../_actions";

class ConfigurationFile {

  static store;

  static setStore(store) {
    this.store = store;
  }

  static getInternalRoles() {
    let internalRoles = [];

    if (!this.store.getState().configFile.isValid) {
      this.store.dispatch(configFileActions.getConfigFile());
    }

    if (this.store.getState().configFile.userRolesInternal) {
      this.store.getState().configFile.userRolesInternal.forEach((role, index) => {
        internalRoles[index] = role.name;
      });
    }

    return internalRoles;
  }

  static getExternalRoles() {
    let externalRoles = [];

      if (!this.store.getState().configFile.isValid) {
          this.store.dispatch(configFileActions.getConfigFile());
      }

    if (this.store.getState().configFile.userRolesExternal) {
      this.store.getState().configFile.userRolesExternal.forEach((role, index) => {
        externalRoles[index] = role.name;
      });
    }

    return externalRoles;
  }

  static getTeamNames() {
    let teamNames = [];

      if (!this.store.getState().configFile.isValid) {
          this.store.dispatch(configFileActions.getConfigFile());
      }

    if (this.store.getState().configFile.teamNames) {
      this.store.getState().configFile.teamNames.forEach((teamName, index) => {
        teamNames[index] = teamName.name;
      });
    }

    return teamNames;
  }

  static getTicketCategories() {
    let ticketCategories = [];

      if (!this.store.getState().configFile.isValid) {
          this.store.dispatch(configFileActions.getConfigFile());
      }

    if (this.store.getState().configFile.ticketCategories) {
      this.store.getState().configFile.ticketCategories.forEach((category, index) => {
        ticketCategories[index] = category.name;
      });
    }

    return ticketCategories;
  }

  static getTicketLifecycles() {
    let ticketLifecycles = [];

      if (!this.store.getState().configFile.isValid) {
          this.store.dispatch(configFileActions.getConfigFile());
      }

    if (this.store.getState().configFile.ticketLifecycle) {
      ticketLifecycles = this.store.getState().configFile.ticketLifecycle;
    }

    return ticketLifecycles;
  }

}

export default ConfigurationFile;
