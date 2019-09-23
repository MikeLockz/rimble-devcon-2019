import {
  RIMBLE_TOGGLE_NETWORK_MODAL,
  RIMBLE_TOGGLE_TX_START_MODAL,
  RIMBLE_TOGGLE_TX_PENDING_MODAL,
  RIMBLE_TOGGLE_TX_SUCCESS_MODAL,
  RIMBLE_TOGGLE_TX_ERROR_MODAL,
  RIMBLE_TOGGLE_TX_LOW_BALANCE_MODAL,
  RIMBLE_TOGGLE_TX_ACTIVITY_MODAL,
  RIMBLE_SET_CURRENT_TX_ID
} from "./../actionTypes";

// Set Rimble's initial UI state
const initialRimble = {
  showWrongNetworkModal: false,
  showTxStartModal: false,
  showTxPendingModal: false,
  showTxSuccessModal: false,
  showTxErrorModal: false,
  showTxLowBalanceModal: false,
  showTxActivityModal: false
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
    case RIMBLE_TOGGLE_TX_LOW_BALANCE_MODAL: {
      return {
        ...state,
        showTxLowBalanceModal: action.payload.value
      };
    }
    case RIMBLE_TOGGLE_TX_ACTIVITY_MODAL: {
      return {
        ...state,
        showTxActivityModal: action.payload.value
      };
    }
    case RIMBLE_SET_CURRENT_TX_ID: {
      if (action.payload.value.key === "stackTempKey") {
        // Get the length of the current progressAlert collection
        // Use that number as the currentTxId property
        return;
      }
      return {
        ...state,
        currentTxId: {
          [action.payload.value.key]: action.payload.value.value
        }
      };
    }
    default:
      return state;
  }
};
