import {combineReducers} from "redux";
import cuppasReducer from './cuppasReducer';
import teamsReducer from './teamsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  cuppas: cuppasReducer,
  teams: teamsReducer,
  user: userReducer
});

export default rootReducer;