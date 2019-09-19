import { put, takeEvery } from "redux-saga/effects";
import { generateStore } from "@drizzle/store";
import drizzleOptions from "../../drizzleOptions";
import progressAlerts from "./../redux/reducers/progressAlerts";
import rimbleVisibilityFilter from "./../redux/reducers/visibilityFilter";
import {
  addProgressAlert,
  toggleProgressAlert,
  setProgressAlertTxHash,
  setProgressAlertStatus,
  updateProgressAlertContent
} from "./../redux/actions";

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

// Rimble modal reducers
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
        showTxStartModal: false,
        showTxPendingModal: action.payload.value
      };
    }
    case RIMBLE_TOGGLE_TX_SUCCESS_MODAL: {
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

// Connecting Rimble actions to Drizzle's events
const contractEventNotifier = store => next => action => {
  console.log("reducers: ", action);
  // Tx started but not confirmed or rejected
  if (action.type === "PUSH_TO_TXSTACK") {
    // Update UI
    store.dispatch(toggleTxStartModal(true));
  }

  if (action.type === "SEND_CONTRACT_TX") {
    // Add linking hash property to progressAlert
    store.dispatch(
      setProgressAlertTxHash({
        stackTempKey: action.stackTempKey,
        id: action.stackId
      })
    );
    store.dispatch(
      setProgressAlertStatus({ status: "initiated", id: action.stackId })
    );
  }

  if (action.type === "TX_BROADCASTED") {
    // Update UI
    store.dispatch(toggleTxPendingModal(true));

    store.dispatch(
      setProgressAlertTxHash({
        txHash: action.txHash,
        id: action.stackId
      })
    );
    store.dispatch(
      setProgressAlertStatus({ status: "pending", id: action.stackId })
    );
  }

  //
  if (action.type === "CONTRACT_SYNC_IND") {
  }

  // received confirmation of tx
  if (action.type === "TX_CONFIRMAITON") {
  }

  // tx is successful
  if (action.type === "TX_SUCCESSFUL") {
    store.dispatch(toggleTxSuccessModal(true));
    store.dispatch(
      setProgressAlertStatus({ status: "success", txHash: action.txHash })
    );
    store.dispatch(
      updateProgressAlertContent({
        content: { receipt: { ...action.receipt } },
        txHash: action.txHash
      })
    );
  }

  if (action.type === "TX_ERROR") {
    store.dispatch(toggleTxErrorModal(true));
    store.dispatch(
      setProgressAlertStatus({
        status: "error",
        stackTempKey: action.stackTempKey
      })
    );
    store.dispatch(
      updateProgressAlertContent({
        content: { error: action.error.message },
        stackTempKey: action.stackTempKey
      })
    );
  }
  return next(action);
};

// fetch data from service using sagas
// function* fetchGasPrice(level) {
//   const todos = yield fetch("").then(
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
// const appReducers = combineReducers({
//   rimble: rimbleReducer,
//   progressAlerts: rimbleProgressAlertReducer
// });
const appReducers = {
  rimble: rimbleReducer,
  progressAlerts: progressAlerts,
  visibilityFilter: rimbleVisibilityFilter
};
// const appSagas = [appRootSaga];
const appMiddlewares = [contractEventNotifier, asyncDispatchMiddleware];

export default generateStore({
  drizzleOptions,
  appReducers,
  // appSagas,
  appMiddlewares,
  disableReduxDevTools: false
});
