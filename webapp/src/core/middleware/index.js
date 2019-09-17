import { put, takeEvery } from "redux-saga/effects";
import { generateStore } from "@drizzle/store";
import drizzleOptions from "../../drizzleOptions";

const contractEventNotifier = store => next => action => {
  console.log("contractEventNotifier", action);
  console.log("store", store.getState());

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

// const initialRimble = {
//   rimble: {
//     showConfirmation: false
//   }
// };

// const updateTransactionView = (state = initialRimble, action) => {
//   switch (action.type) {
//     case "TOGGLE_CONFIRMATION":
//       return {
//         ...state,
//         rimble: {
//           showConfirmation: !state.rimble.confirmation
//         }
//       };
//     default:
//       return state;
//   }
// };

// actions
const TODOS_FETCH = "MY_APP/TODOS_FETCH";
const TODOS_RECEIVED = "MY_APP/TODOS_RECEIVED";

// reducers
const todosReducer = (state = [], action) => {
  if (action.type === TODOS_RECEIVED) {
    // update your state
    return action.todos;
  }
  return state;
};

// fetch data from service using sagas
function* fetchTodos() {
  const todos = yield fetch("https://jsonplaceholder.typicode.com/todos").then(
    resp => resp.json()
  );
  yield put({ type: TODOS_RECEIVED, todos });
}

// Combine all your redux concerns

// app root saga
function* appRootSaga() {
  yield takeEvery(TODOS_FETCH, fetchTodos);
}

// app Reducers and Sagas and Middlewares
const appReducers = { todos: todosReducer };
const appSagas = [appRootSaga];
const appMiddlewares = [contractEventNotifier];

export default generateStore({
  drizzleOptions,
  appReducers,
  appSagas,
  appMiddlewares,
  disableReduxDevTools: false
});
