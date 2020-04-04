import { ticketConstants } from '../_constants';

export function tickets(state = { isValid: false, ticketsPages: [], ticketsTarget :[],ticketsCategory:[] }, action) {
    switch (action.type) {

    case ticketConstants.GETPAGE_REQUEST:
        return {
            ...state
        };
    case ticketConstants.GETPAGE_SUCCESS:
        //var page = action.page;
        let page = action.page;
        /*
        if (action.page !== 0) {
            page = 1
        } else {
            page = 0;
        }
        */

        let newTicketPages = state.ticketsPages;
        newTicketPages[page % 5] = {
            tickets: action.tickets,
            isValid: true,
            page: page + 1
        };
        return {
            ...state,
            ticketsPages: newTicketPages
        };
    case ticketConstants.GETPAGE_FAILURE:
        return {
            ...state,
            error: action.error,
            isValid: false
        };

    case ticketConstants.GETPAGE_REQUEST_TARGET:
      return {
        ...state
      };
    case ticketConstants.GETPAGE_SUCCESS_TARGET:
      //var page = action.page;
      let pageTarget = action.page;

      let newTicketTargetPages = state.ticketsTarget;
      newTicketTargetPages[pageTarget % 5] = {
        tickets: action.tickets,
        isValid: true,
        page: pageTarget + 1,
          target: action.target
      };
      return {
        ...state,
        ticketsTarget: newTicketTargetPages
      };
    case ticketConstants.GETPAGE_FAILURE_TARGET:
      return {
        ...state,
        error: action.error,
        isValid: false
      };

    case ticketConstants.GETPAGE_REQUEST_CATEGORY:
      return {
        ...state
      };
    case ticketConstants.GETPAGE_SUCCESS_CATEGORY:
      //var page = action.page;
      let pageCategory = action.page;

      let newTicketCategoryPages = state.ticketsCategory;
      newTicketCategoryPages[pageCategory % 5] = {
        tickets: action.tickets,
        isValid: true,
        page: pageCategory + 1,
          target: action.target,
          cartegory: action.category
      };
      return {
        ...state,
        ticketsCategory: newTicketCategoryPages
      };
    case ticketConstants.GETPAGE_FAILURE_CATEGORY:
      return {
        ...state,
        error: action.error,
        isValid: false
      };

    case ticketConstants.INVALIDATE_TICKETS_CACHE:
    return {
        ...state,
        ticketsPages: [],
        ticketsTarget :[],
        ticketsCategory:[]
    };

    case ticketConstants.INVALIDATE_TICKETS_PAGE_CACHE_TARGET:
        page = action.page;

        if (state.ticketsTarget[page % 5].page !== page) {
          return state;
        }

        return {
          ...state,
          ticketsTarget: {
            ...state.ticketsTarget,
            [page % 5]: {
              ...state.ticketsTarget[page % 5],
              isValid: false
            }
          }
        };
    case ticketConstants.INVALIDATE_TICKETS_PAGE_CACHE_CATEGORY:
        page = action.page;

        if (state.ticketsCategory[page % 5].page !== page) {
          return state;
        }

        return {
          ...state,
          ticketsCategory: {
            ...state.ticketsCategory,
            [page % 5]: {
              ...state.ticketsCategory[page % 5],
              isValid: false
            }
          }
        };


    case ticketConstants.INVALIDATE_TICKETS_PAGE_CACHE:
        page = action.page;

        if (state.ticketsPages[page % 5].page !== page) {
            return state;
        }

        return {
            ...state,
            ticketsPages: {
                ...state.ticketPages,
                [page % 5]: {
                    ...state.ticketsPages[page % 5],
                    isValid: false
                }
            }
        };

    default:
        return state
  }
}
