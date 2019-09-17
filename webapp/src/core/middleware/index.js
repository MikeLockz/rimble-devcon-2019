import { put, takeEvery } from "redux-saga/effects";
import { generateStore } from "@drizzle/store";
import drizzleOptions from "../../drizzleOptions";

const contractEventNotifier = store => next => action => {
  console.log("contractEventNotifier", action);

  // tx started but not confirmed or rejects
  if (action.type === "PUSH_TO_TXSTACK") {
    // write dispatch to show the started tx modal
  }

  // Show progress alert
  if (action.type === "SEND_CONTRACT_TX") {
  }

  if (action.type === "TX_BROADCASTED") {
    // console.log("action.stackId", action.stackId);
    // go get tx details from stack?

    window.progressAlertProvider.addMessage("Processing", {
      message: "Attempting to ",
      transaction: action.txHash,
      timeEstimate: 60,
      error: {}
    });
  }

  //
  if (action.type === "CONTRACT_SYNC_IND") {
  }

  // received confirmation of tx
  if (action.type === "TX_CONFIRMAITON") {
  }

  // tx is successful
  if (action.type === "TX_SUCCESSFUL") {
  }

  if (action.type === "SHOW_CONFIRMATION_MODAL") {
  }
  return next(action);
};

// Set initial state of UI
const initialRimble = {
  showWrongNetworkModal: false,
  showTxStartModal: false,
  showTxPendingModal: false,
  showTxSuccessModal: false,
  showTxErrorModal: false
};

// selectors
export const getRimbleState = store => {
  console.log("getRimbleState", store);
  return store.rimble;
};

// actions
const RIMBLE_TOGGLE_NETWORK_MODAL = "RIMBLE_TOGGLE_NETWORK_MODAL";
const RIMBLE_TOGGLE_TX_START_MODAL = "RIMBLE_TOGGLE_TX_START_MODAL";
const RIMBLE_TOGGLE_TX_PENDING_MODAL = "RIMBLE_TOGGLE_TX_PENDING_MODAL";
const RIMBLE_TOGGLE_TX_SUCCESS_MODAL = "RIMBLE_TOGGLE_TX_SUCCESS_MODAL";
const RIMBLE_TOGGLE_TX_ERROR_MODAL = "RIMBLE_TOGGLE_TX_ERROR_MODAL";

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

// reducers
const rimbleReducer = (state = initialRimble, action) => {
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
        showTxPendingModal: action.payload.value
      };
    }
    case RIMBLE_TOGGLE_TX_SUCCESS_MODAL: {
      return {
        ...state,
        showTxSuccessModal: action.payload.value
      };
    }
    case RIMBLE_TOGGLE_TX_ERROR_MODAL: {
      return {
        ...state,
        showTxErrorModal: action.payload.value
      };
    }
    default:
      return state;
  }
};

// fetch data from service using sagas
// function* fetchTodos() {
//   const todos = yield fetch("https://jsonplaceholder.typicode.com/todos").then(
//     resp => resp.json()
//   );
//   yield put({ type: TODOS_RECEIVED, todos });
// }

// Combine all your redux concerns

// app root saga
// function* appRootSaga() {
//   yield takeEvery(TODOS_FETCH, fetchTodos);
// }

// app Reducers and Sagas and Middlewares
const appReducers = { rimble: rimbleReducer };
// const appSagas = [appRootSaga];
const appMiddlewares = [contractEventNotifier];

export default generateStore({
  drizzleOptions,
  appReducers,
  // appSagas,
  appMiddlewares,
  disableReduxDevTools: false
});
