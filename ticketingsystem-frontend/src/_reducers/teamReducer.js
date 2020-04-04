import { teamConstants } from '../_constants';

export function teams(state = { isValid: false }, action) {
    switch (action.type) {
    case teamConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case teamConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        teams: action.teams,
        isValid: true
      };
    case teamConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        isValid: false
      };

    case teamConstants.INVALIDATE_TEAM_CACHE:
      return {
        ...state,
        isValid: false
      };

    default:
      return state
  }
}
