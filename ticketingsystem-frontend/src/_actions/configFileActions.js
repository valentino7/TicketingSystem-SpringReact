import { configFileConstants } from '../_constants';
import { configFileService } from '../_services';
import { alertActions } from './';
import {DEBUG_CONFIGFILE_CACHE} from "../_constants/debugConstants";
import {CACHE_VALIDITY_CONFIGFILE} from "../_constants/configurationConstants";

export const configFileActions = {
    getConfigFile
};

function invalidateConfigFileCache(dispatch) {
  if (DEBUG_CONFIGFILE_CACHE) {
    console.log("Invalidate configFile cache");
    alert("Invalidate configFile cache");
  }

  dispatch(invalidateCache());
  dispatch(getConfigFile());

  function invalidateCache() { return { type: configFileConstants.INVALIDATE_CONFIGFILE_CACHE } }
}

function getConfigFile() {
    //alert("get config file");

    return dispatch => {
        dispatch(request());

        configFileService.getConfigFile()
            .then(
                configFile => {
                  dispatch(success(configFile));
                  setTimeout(invalidateConfigFileCache.bind(null, dispatch), CACHE_VALIDITY_CONFIGFILE);
                },
                error => {
                  dispatch(failure(error));
                  dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: configFileConstants.GET_CONFIGFILE_REQUEST } }
    function success(configFile) { return { type: configFileConstants.GET_CONFIGFILE_SUCCESS, configFile } }
    function failure(error) { return { type: configFileConstants.GET_CONFIGFILE_FAILURE, error } }
}
