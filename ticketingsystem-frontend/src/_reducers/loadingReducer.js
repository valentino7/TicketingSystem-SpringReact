import { ticketConstants, userConstants, teamConstants } from '../_constants';

export function loading(state = { isFetching: false }, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { ...state, isRegistering: true };
    case userConstants.REGISTER_SUCCESS:
      return { ...state, isRegistering: false };
    case userConstants.REGISTER_FAILURE:
      return { ...state, isRegistering: false };

    case userConstants.EDIT_PROFILE_REQUEST:
      return { ...state, isFetching: true };
    case userConstants.EDIT_PROFILE_SUCCESS:
      return { ...state, isFetching: false };
    case userConstants.EDIT_PROFILE_FAILURE:
      return { ...state, isFetching: false };

    case userConstants.LOGIN_REQUEST:
      return { ...state, isLoggingIn: true };
    case userConstants.LOGIN_SUCCESS:
      return { ...state, isLoggingIn: false };
    case userConstants.LOGIN_FAILURE:
      return { ...state, isLoggingIn: false };

    case ticketConstants.GETALL_REQUEST:
      return { ...state, isFetching: true };
    case ticketConstants.GETALL_SUCCESS:
      return { ...state, isFetching: false };
    case ticketConstants.GETALL_FAILURE:
      return { ...state, isFetching: false };

    case ticketConstants.GETPAGE_REQUEST:
        return { ...state, isFetching: true };
    case ticketConstants.GETPAGE_SUCCESS:
        return { ...state, isFetching: false };
    case ticketConstants.GETPAGE_FAILURE:
        return { ...state, isFetching: false };

    case ticketConstants.GETPAGE_REQUEST_TARGET:
      return { ...state, isFetching: true };
    case ticketConstants.GETPAGE_SUCCESS_TARGET:
      return { ...state, isFetching: false };
    case ticketConstants.GETPAGE_FAILURE_TARGET:
      return { ...state, isFetching: false };

    case ticketConstants.GETPAGE_REQUEST_CATEGORY:
      return { ...state, isFetching: true };
    case ticketConstants.GETPAGE_SUCCESS_CATEGORY:
      return { ...state, isFetching: false };
    case ticketConstants.GETPAGE_FAILURE_CATEGORY:
      return { ...state, isFetching: false };

    case userConstants.CREATE_REQUEST:
      return { ...state, isFetching: true };
    case userConstants.CREATE_SUCCESS:
      return { ...state, isFetching: false };
    case userConstants.CREATE_FAILURE:
      return { ...state, isFetching: false };

    case userConstants.GETALL_REQUEST:
      return { ...state, isFetching: true };
    case userConstants.GETALL_SUCCESS:
      return { ...state, isFetching: false };
    case userConstants.GETALL_FAILURE:
      return { ...state, isFetching: false };

    case userConstants.UPDATE_REQUEST:
      return { ...state, isFetching: true };
    case userConstants.UPDATE_SUCCESS:
      return { ...state, isFetching: false };
    case userConstants.UPDATE_FAILURE:
      return { ...state, isFetching: false };

    case userConstants.DELETE_REQUEST:
      return { ...state, isFetching: true };
    case userConstants.DELETE_SUCCESS:
      return { ...state, isFetching: false };
    case userConstants.DELETE_FAILURE:
      return { ...state, isFetching: false };


    case teamConstants.CREATE_REQUEST:
      return { ...state, isFetching: true };
    case teamConstants.CREATE_SUCCESS:
      return { ...state, isFetching: false };
    case teamConstants.CREATE_FAILURE:
      return { ...state, isFetching: false };

    case teamConstants.GETALL_REQUEST:
      return { ...state, isFetching: true };
    case teamConstants.GETALL_SUCCESS:
      return { ...state, isFetching: false };
    case teamConstants.GETALL_FAILURE:
      return { ...state, isFetching: false };

    case teamConstants.UPDATE_REQUEST:
      return { ...state, isFetching: true };
    case teamConstants.UPDATE_SUCCESS:
      return { ...state, isFetching: false };
    case teamConstants.UPDATE_FAILURE:
      return { ...state, isFetching: false };

    case teamConstants.DELETE_REQUEST:
      return { ...state, isFetching: true };
    case teamConstants.DELETE_SUCCESS:
      return { ...state, isFetching: false };
    case teamConstants.DELETE_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state
  }
}
