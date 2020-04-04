import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { error: "", loggedIn: true, user } : {error: "", loading: false, loggingIn: false, loggedIn: false, user: {}};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.EDIT_PROFILE_REQUEST:
      return {
        ...state,
        error: ""
      };
    case userConstants.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.updatedUser,
        error: ""
      };
    case userConstants.EDIT_PROFILE_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggedIn: false,
        user: {}
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        user: {}
      };

    case userConstants.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: {}
      };
    default:
      return state;
  }
}
