import {
  RIMBLE_TOGGLE_NETWORK_MODAL,
  RIMBLE_TOGGLE_TX_START_MODAL,
  RIMBLE_TOGGLE_TX_PENDING_MODAL,
  RIMBLE_TOGGLE_TX_SUCCESS_MODAL,
  RIMBLE_TOGGLE_TX_ERROR_MODAL
} from "./../actionTypes";

// Set Rimble's initial UI state
const initialRimble = {
  showWrongNetworkModal: false,
  showTxStartModal: false,
  showTxPendingModal: false,
  showTxSuccessModal: false,
  showTxErrorModal: false
};

// Rimble modal reducers
export const txModals = (state = initialRimble, action) => {
  switch (action.type) {
    case RIMBLE_TOGGLE_NETWORK_MODAL: {
      return {
        ...state,
        showWrongNetworkModal: action.payload.value
      };
    }
    case RIMBLE_TOGGLE_TX_START_MODAL: {
      return {
        ...state,
        showTxStartModal: action.payload.value
      };
    }
    case RIMBLE_TOGGLE_TX_PENDING_MODAL: {
      return {
        ...state,
        showTxStartModal: false,
        showTxPendingModal: action.payload.value
      };
    }
    case RIMBLE_TOGGLE_TX_SUCCESS_MODAL: {
      console.log("RIMBLE_TOGGLE_TX_SUCCESS_MODAL", action);
      return {
        ...state,
        showTxStartModal: false,
        showTxPendingModal: false,
        showTxSuccessModal: action.payload.value
      };
    }
    case RIMBLE_TOGGLE_TX_ERROR_MODAL: {
      return {
        ...state,
        showTxStartModal: false,
        showTxPendingModal: false,
        showTxSuccessModal: false,
        showTxErrorModal: action.payload.value
      };
    }
    default:
      return state;
  }
};
