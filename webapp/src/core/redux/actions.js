import {
  RIMBLE_ADD_PROGRESSALERT,
  RIMBLE_TOGGLE_PROGRESSALERT,
  RIMBLE_SET_PROGRESSALERT_STATUS,
  RIMBLE_SET_PROGRESSALERT_TX_HASH,
  SET_FILTER
} from "./actionTypes";

// Progress Alert actions
let nextProgressAlertId = -1; // We want the first id to be 0 to match Drizzle
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

export const setProgressAlertStatus = ({ status, id }) => {
  console.log("setProgressAlertStatus", status, id);
  return {
    type: RIMBLE_SET_PROGRESSALERT_STATUS,
    payload: { status, id }
  };
};

export const setProgressAlertTxHash = ({ hash, id }) => {
  console.log("setProgressAlertTxHash", hash, id);
  return {
    type: RIMBLE_SET_PROGRESSALERT_TX_HASH,
    payload: { hash, id }
  };
};

export const setFilter = filter => {
  console.log("setFilter", filter);
  return { type: SET_FILTER, payload: { filter } };
};
