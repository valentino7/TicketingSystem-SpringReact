import { configFileConstants } from '../_constants';

export function configFile(state = { isValid: false }, action) {
  switch (action.type) {
    case configFileConstants.GET_CONFIGFILE_REQUEST:
      return {
        ...state
      };
    case configFileConstants.GET_CONFIGFILE_SUCCESS:
      return {
        ...state,
        id: action.configFile.id,
        userRolesInternal: action.configFile.userSettings.userRolesInternal,
        userRolesExternal: action.configFile.userSettings.userRolesExternal,
        teamNames: action.configFile.teamSettings.teamNames,
        ticketCategories: action.configFile.ticketSettings.ticketCategories,
        ticketLifecycle: action.configFile.ticketSettings.lifecycleVersion,
        isValid: true
      };
    case configFileConstants.GET_CONFIGFILE_FAILURE:
      return {
        ...state
      };

    case configFileConstants.INVALIDATE_CONFIGFILE_CACHE:
      return {
        ...state,
        isValid: false
      };

    default:
      return state
  }
}
