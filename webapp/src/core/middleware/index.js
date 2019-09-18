import { put, takeEvery } from "redux-saga/effects";
import { generateStore } from "@drizzle/store";
import drizzleOptions from "../../drizzleOptions";
import rimbleVisibilityFilter from "./../redux/reducers/visibilityFilter";

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

// Progress Alert actions
const RIMBLE_ADD_PROGRESSALERT = "RIMBLE_ADD_PROGRESSALERT";

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

// Initialize rimbleAlert store
const initialRimbleProgressAlert = {
  allIds: [],
  byIds: {}
};

// Managing progressAlert component's state
const rimbleProgressAlertReducer = (
  state = initialRimbleProgressAlert,
  action
) => {
  console.log("rimbleProgressAlertReducer", action);
  switch (action.type) {
    case RIMBLE_ADD_PROGRESSALERT: {
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false
          }
        }
      };
    }
    default: {
      return state;
    }
  }
};

// Connecting Rimble actions to Drizzle's events
const contractEventNotifier = store => next => action => {
  console.log("contractEventNotifier", action);

  // Tx started but not confirmed or rejected
  if (action.type === "PUSH_TO_TXSTACK") {
    // Update UI
    store.dispatch(toggleTxStartModal(true));
  }

  if (action.type === "SEND_CONTRACT_TX") {
  }

  if (action.type === "TX_BROADCASTED") {
    // Update UI
    store.dispatch(toggleTxStartModal(false));
    store.dispatch(toggleTxPendingModal(true));

    window.progressAlertProvider.addMessage("Processing", {
      message: "Attempting to ",
      transaction: action.txHash,
      timeEstimate: 10,
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
  progressAlerts: rimbleProgressAlertReducer,
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
