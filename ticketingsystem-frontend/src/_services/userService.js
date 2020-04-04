import {
  URL_DELETE_USER,
  URL_EDIT_PROFILE,
  URL_GET_ALL_USERS,
  URL_LOGIN,
  URL_REGISTER,
  URL_UPDATE_USER
} from "../_constants/configurationConstants";

export const userService = {
    login,
    logout,
    editProfile,
    register,
    getAll,
    //getById,
    update,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(URL_LOGIN, requestOptions)
        .then(response => {
            let json = response.json();

            if (!response.ok) {
                return json.then(Promise.reject.bind(Promise));
            }

            return json;
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.id) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function editProfile(id, updatedUser) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedUser)
  };

  return fetch(URL_EDIT_PROFILE + id, requestOptions)
    .then(response => {
        let json = response.json();

        if (!response.ok) {
            return json.then(Promise.reject.bind(Promise));
        }

        return json;
    })
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user && user.id) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        //headers: authHeader()
    };

    return fetch(URL_GET_ALL_USERS, requestOptions).then(handleResponse);
}

/*
function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users/' + id, requestOptions).then(handleResponse);
}
*/

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(URL_REGISTER, requestOptions).then(handleResponse);
}

function update(id, updatedUser) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
    };

    return fetch(URL_UPDATE_USER + id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE'
    };

    return fetch(URL_DELETE_USER + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    let json = response.json();

    if (!response.ok) {
        return json.then(Promise.reject.bind(Promise));
    }

    return json;
}
