//import { authHeader } from '../_helpers';
import { URL_GET_CONFIGFILE } from "../_constants/configurationConstants";

export const configFileService = {
    getConfigFile
};

function getConfigFile() {
    const requestOptions = {
        method: 'GET',
        //headers: authHeader()
    };

    return fetch(URL_GET_CONFIGFILE, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}
