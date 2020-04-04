import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import {DEBUG_USERLIST_CACHE} from "../_constants/debugConstants";
import {
  ALERT_CREATE_USER_SUCCESS_DURATION,
  ALERT_CREATE_USER_SUCCESS_MESSAGE,
  ALERT_CREATE_USER_SUCCESS_TITLE, ALERT_DELETE_DURATION,
  ALERT_DELETE_MESSAGE,
  ALERT_DELETE_TITLE,
  ALERT_EDIT_PROFILE_SUCCESS_MESSAGE,
  ALERT_REGISTRATION_SUCCESS_DURATION,
  ALERT_REGISTRATION_SUCCESS_MESSAGE,
  ALERT_REGISTRATION_SUCCESS_TITLE,
  ALERT_UPDATE_SUCCESS_DURATION,
  ALERT_UPDATE_SUCCESS_MESSAGE,
  ALERT_UPDATE_SUCCESS_TITLE
} from "../_constants/alertMessages";
import {CACHE_VALIDITY_USER_LIST} from "../_constants/configurationConstants";


export const userActions = {
    login,
    logout,
    register,
    editProfile,
    create,
    update,
    getAll,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));  // set loggingIn flag in the redux store

        userService.login(username, password)
            .then(  // success
                user => {
                    dispatch(success(user));  // add authentication infos to redux store
                    history.push('/');  // redirect to homepage;;
                },
                error => {  // failure
                    dispatch(failure(error)); // reset authentication infos on failure
                    if (error.message)
                        dispatch(alertActions.error(error.message, "LOGIN ERROR"));  // show an error message
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    history.push('/login'); // redirect to login page
    userService.logout(); // remove authentication infos from local storage
    return { type: userConstants.LOGOUT };  // remove authentication infos from redux store
}

function register(user) {
    return dispatch => {
        dispatch(request(user));  // set registering flag in the redux store

        userService.register(user)
            .then(
                user => { // success
                    dispatch(success(user));  // reset registering flag in the redux store on success
                    history.push('/login'); // redirect to login page
                    dispatch(alertActions.success(ALERT_REGISTRATION_SUCCESS_MESSAGE, ALERT_REGISTRATION_SUCCESS_TITLE, ALERT_REGISTRATION_SUCCESS_DURATION)); // show a success message
                },
                error => { // failure
                    dispatch(failure(error)); // reset registering flag in the redux store on failure
                    if (error.message)
                        dispatch(alertActions.error(error.message, "REGISTRATION ERROR"));  // show an error message
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


function editProfile(id, updatedUser) {
  return dispatch => {
    dispatch(request(id, updatedUser));

    userService.editProfile(id, updatedUser)
      .then(
        user => {
          dispatch(success(updatedUser));
          history.push('/');
          dispatch(alertActions.success(ALERT_EDIT_PROFILE_SUCCESS_MESSAGE, ALERT_REGISTRATION_SUCCESS_TITLE, ALERT_REGISTRATION_SUCCESS_DURATION));
        },
        error => {
          dispatch(failure(error));
            if (error.message)
                dispatch(alertActions.error(error.message, "ERROR"));  // show an error message
        }
      );
  };

  function request(id, updatedUser) { return { type: userConstants.EDIT_PROFILE_REQUEST, id, updatedUser } }
  function success(updatedUser) { return { type: userConstants.EDIT_PROFILE_SUCCESS, updatedUser } }
  function failure(error) { return { type: userConstants.EDIT_PROFILE_FAILURE, error } }
}


function create(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user)
      .then(
        user => { // success
          dispatch(success(user));
          //history.push('/');  // redirect to homepage
          dispatch(alertActions.success(ALERT_CREATE_USER_SUCCESS_MESSAGE, ALERT_CREATE_USER_SUCCESS_TITLE, ALERT_CREATE_USER_SUCCESS_DURATION));  // show a success message
        },
        error => {  // failure
          dispatch(failure(error));
            if (error.message)
                dispatch(alertActions.error(error.message, "REGISTRATION ERROR"));  // show an error message
        }
      );
  };

  function request(user) { return { type: userConstants.CREATE_REQUEST, user } }
  function success(user) { return { type: userConstants.CREATE_SUCCESS, user } }
  function failure(error) { return { type: userConstants.CREATE_FAILURE, error } }
}

function invalidateUsersCache(dispatch) {
  if (DEBUG_USERLIST_CACHE) {
    console.log("Invalidate users cache");
    alert("Invalidate users cache");
  }
  dispatch(invalidateCache());

  function invalidateCache() { return { type: userConstants.INVALIDATE_USERS_CACHE } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => {
                  dispatch(success(users));
                  setTimeout(invalidateUsersCache.bind(null, dispatch), CACHE_VALIDITY_USER_LIST);
                },
                error => {
                  dispatch(failure(error));
                    if (error.message)
                        dispatch(alertActions.error(error.message, "ERROR"));  // show an error message
                }
            );

    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function update(index, id, updatedUser) {
  return dispatch => {
    dispatch(request(id, updatedUser));

    userService.update(id, updatedUser)
      .then(
        user => {
          dispatch(success(index, updatedUser));
          //history.push('/');
          dispatch(alertActions.success(ALERT_UPDATE_SUCCESS_MESSAGE, ALERT_UPDATE_SUCCESS_TITLE, ALERT_UPDATE_SUCCESS_DURATION));
        },
        error => {
          dispatch(failure(error));
            if (error.message)
                dispatch(alertActions.error(error.message, "ERROR"));  // show an error message
        }
      );
  };

  function request(id, updatedUser) { return { type: userConstants.UPDATE_REQUEST, id, updatedUser } }
  function success(index, updatedUser) { return { type: userConstants.UPDATE_SUCCESS, index, updatedUser } }
  function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(index, id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => {
                    dispatch(success(index,id));
                    dispatch(alertActions.success(ALERT_DELETE_MESSAGE, ALERT_DELETE_TITLE, ALERT_DELETE_DURATION));
                },
                error => {
                    dispatch(failure(error));
                    if (error.message)
                        dispatch(alertActions.error(error.message, "DELETE ERROR"));  // show an error message
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(index, id) { return { type: userConstants.DELETE_SUCCESS, index, id } }
    function failure(error) { return { type: userConstants.DELETE_FAILURE, error } }
}
