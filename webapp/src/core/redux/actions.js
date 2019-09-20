import {
  RIMBLE_ADD_PROGRESSALERT,
  RIMBLE_TOGGLE_PROGRESSALERT,
  RIMBLE_SET_PROGRESSALERT_STATUS,
  RIMBLE_SET_PROGRESSALERT_TX_HASH,
  RIMBLE_UPDATE_PROGRESSALERT_CONTENT,
  SET_FILTER,
  RIMBLE_TOGGLE_NETWORK_MODAL,
  RIMBLE_TOGGLE_TX_START_MODAL,
  RIMBLE_TOGGLE_TX_PENDING_MODAL,
  RIMBLE_TOGGLE_TX_SUCCESS_MODAL,
  RIMBLE_TOGGLE_TX_ERROR_MODAL,
  RIMBLE_TOGGLE_TX_LOW_BALANCE_MODAL,
  RIMBLE_TOGGLE_TX_ACTIVITY_MODAL
} from "./actionTypes";

// Progress Alert actions
let nextProgressAlertId = -1; // We want the first id to be 0 to match Drizzle
export const addProgressAlert = content => {
  return {
    type: RIMBLE_ADD_PROGRESSALERT,
    payload: {
      id: ++nextProgressAlertId,
      content
    }
  };
};

export const toggleProgressAlert = id => {
  return {
    type: RIMBLE_TOGGLE_PROGRESSALERT,
    payload: { id }
  };
};

export const setProgressAlertStatus = ({
  status,
  id,
  stackTempKey,
  txHash
}) => {
  return {
    type: RIMBLE_SET_PROGRESSALERT_STATUS,
    payload: { status, id, stackTempKey, txHash }
  };
};

export const setProgressAlertTxHash = ({ stackTempKey, txHash, id }) => {
  return {
    type: RIMBLE_SET_PROGRESSALERT_TX_HASH,
    payload: { stackTempKey, txHash, id }
  };
};

export const updateProgressAlertContent = ({
  content,
  txHash,
  id,
  stackTempKey
}) => {
  return {
    type: RIMBLE_UPDATE_PROGRESSALERT_CONTENT,
    payload: { content, txHash, id, stackTempKey }
  };
};

export const setFilter = filter => {
  return { type: SET_FILTER, payload: { filter } };
};

// Transaction modal actions
export const toggleWrongNetworkModal = value => {
  return {
    type: RIMBLE_TOGGLE_NETWORK_MODAL,
    payload: { value }
  };
};
export const toggleTxStartModal = value => {
  return {
    type: RIMBLE_TOGGLE_TX_START_MODAL,
    payload: { value }
  };
};
export const toggleTxPendingModal = value => {
  return {
    type: RIMBLE_TOGGLE_TX_PENDING_MODAL,
    payload: { value }
  };
};
export const toggleTxSuccessModal = value => {
  return {
    type: RIMBLE_TOGGLE_TX_SUCCESS_MODAL,
    payload: { value }
  };
};
export const toggleTxErrorModal = value => {
  return {
    type: RIMBLE_TOGGLE_TX_ERROR_MODAL,
    payload: { value }
  };
};
export const toggleTxLowBalanceModal = value => {
  return {
    type: RIMBLE_TOGGLE_TX_LOW_BALANCE_MODAL,
    payload: { value }
  };
};
export const toggleTxActivityModal = value => {
  return {
    type: RIMBLE_TOGGLE_TX_ACTIVITY_MODAL,
    payload: { value }
  };
};
