import {
  RIMBLE_ADD_PROGRESSALERT,
  RIMBLE_TOGGLE_PROGRESSALERT,
  SET_FILTER
} from "./actionTypes";

// Progress Alert actions
let nextProgressAlertId = 0;
export const addProgressAlert = content => {
  console.log("addProgressAlert content", content);
  return {
    type: RIMBLE_ADD_PROGRESSALERT,
    payload: {
      id: ++nextProgressAlertId,
      content
    }
  };
};

export const toggleProgressAlert = id => {
  console.log("toggleProgressAlert", id);
  return {
    type: RIMBLE_TOGGLE_PROGRESSALERT,
    payload: { id }
  };
};

export const setFilter = filter => {
  console.log("setFilter", filter);
  return { type: SET_FILTER, payload: { filter } };
};
