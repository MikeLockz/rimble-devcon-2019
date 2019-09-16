import { generateStore } from "@drizzle/store";
import drizzleOptions from "../../drizzleOptions";

const contractEventNotifier = store => next => action => {
  console.log("contractEventNotifier", action);
  console.log("store", store.getState());

  // tx started but not confirmed or rejects
  if (action.type === "PUSH_TO_TXSTACK") {
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
  return next(action);
};

const appMiddlewares = [contractEventNotifier];

export default generateStore({
  drizzleOptions,
  appMiddlewares,
  disableReduxDevTools: false
});
