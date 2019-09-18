import { combineReducers } from "redux";
import progressAlerts from "./progressAlerts";
import visibilityFilter from "./visibilityFilter";

export default combineReducers({ progressAlerts, visibilityFilter });
