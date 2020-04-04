import {
  URL_GET_ALL_TICKETS,
} from "../_constants/configurationConstants";
import {URL_TOTALPAGES_TICKETS,URL_GET_TARGET_TICKETS,URL_GET_CATEGORY_TICKETS} from "../_constants";

export const ticketService = {
    getPage,
    getPageTarget,
    getPageCategory,
};




function getPage(page) {
    const requestOptions = {
        method: 'GET',
    };
    console.log(page);
    return fetch(URL_GET_ALL_TICKETS + '?page=' + page + '&size=' + 10, requestOptions).then(handleResponse);
}

function getPageTarget(page,target) {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(URL_GET_TARGET_TICKETS + target +'?page=' + page + '&size=' + 10, requestOptions).then(handleResponse);
}

function getPageCategory(page,target,category) {
  const requestOptions = {
    method: 'GET',
  };
  return fetch(URL_GET_CATEGORY_TICKETS + category +"/"+ target + '?page=' + page + '&size=' + 10, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}
