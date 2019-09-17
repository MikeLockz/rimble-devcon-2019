import { put, takeEvery } from "redux-saga/effects";
import { generateStore } from "@drizzle/store";
import drizzleOptions from "../../drizzleOptions";

// This middleware will just add the property "async dispatch"
// to actions with the "async" propperty set to true
const asyncDispatchMiddleware = store => next => action => {
  let syncActivityFinished = false;
  let actionQueue = [];

  function flushQueue() {
    actionQueue.forEach(a => store.dispatch(a)); // flush queue
    actionQueue = [];
  }

  function asyncDispatch(asyncAction) {
    actionQueue = actionQueue.concat([asyncAction]);

    if (syncActivityFinished) {
      flushQueue();
    }
  }

  const actionWithAsyncDispatch = Object.assign({}, action, { asyncDispatch });

  const res = next(actionWithAsyncDispatch);

  syncActivityFinished = true;
  flushQueue();

  return res;
};

// Set Rimble's initial UI state
const initialRimble = {
  showWrongNetworkModal: false,
  showTxStartModal: false,
  showTxPendingModal: false,
  showTxSuccessModal: false,
  showTxErrorModal: false
};

// Rimble's selectors
export const getRimbleState = store => {
  // console.log("getRimbleState", store);
  return store.rimble;
};

// Rimble's actions
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

// Rimble's reducers
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

// Connecting Rimble actions to Drizzle's events
const contractEventNotifier = store => next => action => {
  console.log("contractEventNotifier", action);

  // tx started but not confirmed or rejects
  if (action.type === "PUSH_TO_TXSTACK") {
    console.log("New tx started");
    store.dispatch(toggleTxStartModal(true));
  }

  // Show progress alert
  if (action.type === "SEND_CONTRACT_TX") {
    store.dispatch(toggleTxStartModal(false));
    store.dispatch(toggleTxPendingModal(true));
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
    store.dispatch(toggleTxPendingModal(false));
    store.dispatch(toggleTxSuccessModal(true));
  }

  if (action.type === "SHOW_CONFIRMATION_MODAL") {
  }
  return next(action);
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
const appMiddlewares = [contractEventNotifier, asyncDispatchMiddleware];

export default generateStore({
  drizzleOptions,
  appReducers,
  // appSagas,
  appMiddlewares,
  disableReduxDevTools: false
});
