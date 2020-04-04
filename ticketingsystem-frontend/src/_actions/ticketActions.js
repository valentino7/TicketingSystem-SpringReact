import { ticketConstants } from '../_constants';
import { ticketService } from '../_services';
import { alertActions } from './';
import { CACHE_VALIDITY_TICKET_LIST } from "../_constants/configurationConstants";

export const ticketActions = {
    getPage,
    getPageTarget,
    getPageCategory,
    invalidateTicketsCache
};


function invalidateTicketsPageCache(dispatch, page) {
    dispatch(invalidateCache(page));

    function invalidateCache(page) { return { type: ticketConstants.INVALIDATE_TICKETS_PAGE_CACHE, page } }
}

function invalidateTicketsTargetPageCache(dispatch, page) {
  dispatch(invalidateCache(page));

  function invalidateCache(page) { return { type: ticketConstants.INVALIDATE_TICKETS_PAGE_CACHE_TARGET, page } }
}

function invalidateTicketsCategoryPageCache(dispatch, page) {
  dispatch(invalidateCache(page));

  function invalidateCache(page) { return { type: ticketConstants.INVALIDATE_TICKETS_PAGE_CACHE_CATEGORY, page } }
}

function getPage(page, size) {
    return dispatch => {
        dispatch(request());

        ticketService.getPage(page, size)
            .then(
                tickets => {
                    dispatch(success(tickets, page));
                    setTimeout(invalidateTicketsPageCache.bind(null, dispatch, page), CACHE_VALIDITY_TICKET_LIST);
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: ticketConstants.GETPAGE_REQUEST } }
    function success(tickets, page) { return { type: ticketConstants.GETPAGE_SUCCESS, tickets, page } }
    function failure(error) { return { type: ticketConstants.GETPAGE_FAILURE, error } }
}

function getPageTarget(page,target,size) {
  return dispatch => {
    dispatch(request());

    //invalidateTicketsTargetPageCache.bind(null, dispatch, page);

    ticketService.getPageTarget(page,target,size)
      .then(
        tickets => {
          dispatch(success(tickets, page, target));
          setTimeout(invalidateTicketsTargetPageCache.bind(null, dispatch, page), CACHE_VALIDITY_TICKET_LIST);
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request() { return { type: ticketConstants.GETPAGE_REQUEST_TARGET } }
  function success(tickets, page, target) { return { type: ticketConstants.GETPAGE_SUCCESS_TARGET, tickets, page, target } }
  function failure(error) { return { type: ticketConstants.GETPAGE_FAILURE_TARGET, error } }
}

function getPageCategory(page,target,category,size) {
  return dispatch => {
    dispatch(request());

    ticketService.getPageCategory(page,target,category,size)
      .then(
        tickets => {
          dispatch(success(tickets, page, target, category));
          setTimeout(invalidateTicketsCategoryPageCache.bind(null, dispatch, page), CACHE_VALIDITY_TICKET_LIST);
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request() { return { type: ticketConstants.GETPAGE_REQUEST_CATEGORY } }
  function success(tickets, page, target, category) { return { type: ticketConstants.GETPAGE_SUCCESS_CATEGORY, tickets, page, target, category } }
  function failure(error) { return { type: ticketConstants.GETPAGE_FAILURE_CATEGORY, error } }
}


function invalidateTicketsCache() { return { type: ticketConstants.INVALIDATE_TICKETS_CACHE } }



