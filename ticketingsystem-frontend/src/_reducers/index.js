import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { users } from './usersReducer';
import { tickets } from './ticketsReducer';
import { alert } from './alertReducer';
import {teams } from './teamReducer';
import { loading } from './loadingReducer';
import { configFile } from "./configFileReducer";

const rootReducer = combineReducers({
  authentication,
  users,
  tickets,
  alert,
  teams,
  loading,
  configFile
});

export default rootReducer;
