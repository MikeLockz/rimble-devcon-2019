import { generateStore } from "@drizzle/store";
import drizzleOptions from "../../drizzleOptions";
import progressAlerts from "./../redux/reducers/progressAlerts";
import rimbleVisibilityFilter from "./../redux/reducers/visibilityFilter";
import { txModals } from "./../redux/reducers/txModals";
import {
  toggleTxStartModal,
  toggleTxPendingModal,
  toggleTxSuccessModal,
  toggleTxErrorModal,
  setProgressAlertTxHash,
  setProgressAlertStatus,
  updateProgressAlertContent,
  updateProgressAlertRemainingTime,
  setCurrentTxId,
  updateProgressAlertTxFee,
  enableBuyButton
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

// Connecting Rimble actions to Drizzle's events
const contractEventNotifier = store => next => action => {
  console.log("reducers: ", action);
  // Tx started but not confirmed or rejected
  if (action.type === "PUSH_TO_TXSTACK") {
    store.dispatch(toggleTxStartModal(true));
    const id = store.getState().progressAlerts.allIds.length - 1;
    store.dispatch(setCurrentTxId(id));
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

    store.dispatch(
      updateProgressAlertTxFee({ stackTempKey: action.stackTempKey })
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

    store.dispatch(updateProgressAlertRemainingTime({ id: action.stackId }));

    store.dispatch(setCurrentTxId(action.stackId));
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

  if (action.type === "DRIZZLE_INITIALIZED") {
    store.dispatch(enableBuyButton(true));
  }
  return next(action);
};

const appReducers = {
  progressAlerts: progressAlerts,
  visibilityFilter: rimbleVisibilityFilter,
  txModals: txModals
};

const appMiddlewares = [contractEventNotifier, asyncDispatchMiddleware];

export default generateStore({
  drizzleOptions,
  appReducers,
  appMiddlewares,
  disableReduxDevTools: false
});
