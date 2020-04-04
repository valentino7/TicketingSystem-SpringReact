import { userConstants } from '../_constants';

export function users(state = { users: [], isValid: false, ext_team_isValid: true }, action) {
  switch (action.type) {
    case userConstants.CREATE_REQUEST:
      return {
        ...state
      };
    case userConstants.CREATE_SUCCESS:
      return {
        ...state,
        users: [
          ...state.users,
          ...[action.user]
        ]
      };
    case userConstants.CREATE_FAILURE:
      return {
        ...state,
        error: action.error
      };


    case userConstants.GETALL_REQUEST:
      return {
        ...state
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        users: action.users,
	ext_team_isValid: true,
        isValid: true
      };
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        isValid: false
      };

    case userConstants.UPDATE_REQUEST:
      return {
        ...state,
        error: ""
      };
    case userConstants.UPDATE_SUCCESS:
      let newUsers = state.users.slice(0);
      //newUsers.splice(action.index, 1);
      newUsers[action.index] = action.updatedUser;
      return {
        ...state,
	ext_team_isValid: false,
        error: "",
        users: [
          ...newUsers,
          //...[action.updatedUser]
        ]
      };
    case userConstants.UPDATE_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case userConstants.DELETE_REQUEST:
      return {
        ...state,
      };
      /*
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
      */
    case userConstants.DELETE_SUCCESS:
      let newUsersDel = state.users.slice(0);
      newUsersDel.splice(action.index, 1);
      return {
        ...state,
	ext_team_isValid: false,
        error: "",
        users: [
          ...newUsersDel
        ]
      };
      /*
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
      */
    case userConstants.DELETE_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case userConstants.INVALIDATE_USERS_CACHE:
      return {
        ...state,
	ext_team_isValid: true,
        isValid: false
      };

    default:
      return state
  }
}
