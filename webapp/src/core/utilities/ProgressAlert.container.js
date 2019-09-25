import React from "react";
import { drizzleConnect } from "@drizzle/react-plugin";
import { Box } from "rimble-ui";
import TxModalsContainer from "./TxModals.container";
import { getProgressAlertsByVisibilityFilter } from "./../redux/selectors";
import appConfig from "./../../appConfig";
import ProgressAlertDebug from "./ProgressAlertDebug";
import ProgressAlert, {
  MultipleProgressAlerts
} from "./components/ProgressAlert";
import TxActivityModal from "./components/TxActivityModal";
import { toggleProgressAlert, toggleTxActivityModal } from "./../redux/actions";

const ProgressAlerts = ({
  progressAlerts,
  toggleProgressAlert,
  toggleTxActivityModal,
  getPercentComplete,
  getTimeToCompletionString
}) => {
  const handleToggleProgressAlert = stackId => {
    toggleProgressAlert(stackId);
  };

  if (progressAlerts && progressAlerts.length === 1) {
    const { id } = progressAlerts[0];

    return (
      <ProgressAlert
        key={`pa-${id}`}
        progressAlert={progressAlerts[0]}
        toggleProgressAlert={handleToggleProgressAlert}
        getPercentComplete={getPercentComplete}
        getTimeToCompletionString={getTimeToCompletionString}
      />
    );
  }
  if (progressAlerts.length > 1) {
    return (
      <MultipleProgressAlerts
        count={progressAlerts.length}
        toggleTxActivityModal={toggleTxActivityModal}
      />
    );
  }
  return null;
};

const ProgressAlertContainer = ({
  rimble,
  progressAlerts,
  transactions,
  toggleProgressAlert,
  toggleTxActivityModal,
  address,
  store
}) => {
  // Put functions to calculate progress bar percentage here so that it can be shared between progress alerts and modal
  const getPercentComplete = ({ startTime, timeEstimate }) => {
    // Can't calculate percent
    if (timeEstimate === null) {
      return null;
    }
    const estimatedCompletionTime = startTime + timeEstimate;
    const percentComplete =
      ((Date.now() - startTime) / (estimatedCompletionTime - startTime)) * 100;

    // Return max 100
    if (Math.round(percentComplete) > 100) {
      return 100;
    } else {
      return Math.round(percentComplete);
    }
  };

  // Reads the value of RemainingTime and outputs a hunman-friendly string of time remaining
  const getTimeToCompletionString = ({ timeEstimate, startTime }) => {
    let timeString = "Calculating remaining time..";

    // Not enough info, leave value alone
    if (timeEstimate === null) {
      return timeString;
    }

    const now = Date.now();
    const remainingSeconds = Math.round(
      (timeEstimate + startTime - Date.now()) / 1000
    );
    console.log("remainingSeconds", remainingSeconds);

    const timeObject = new Date();
    const estimatedCompletion = new Date(
      timeObject.getTime() + remainingSeconds
    );

    let diff = now - estimatedCompletion;
    diff = Math.abs(Math.floor(diff));

    const days = Math.floor(diff / (24 * 60 * 60));
    let leftSec = diff - days * 24 * 60 * 60;

    const hrs = Math.floor(leftSec / (60 * 60));
    leftSec = leftSec - hrs * 60 * 60;

    const min = Math.floor(leftSec / 60);
    leftSec = leftSec - min * 60;

    if (min > 1) {
      timeString = "~" + min + " minutes";
    } else if (min === 1) {
      timeString = "~ 1 minute remaining";
    } else if (leftSec > 30) {
      timeString = "less than 1 minute remaining";
    } else if (leftSec > 5) {
      timeString = "less than 30 seconds remaining";
    } else {
      timeString = "expected to finish soon";
    }

    console.log("timeString", timeString);
    return timeString;
  };

  return (
    <Box>
      <ProgressAlerts
        progressAlerts={progressAlerts}
        toggleProgressAlert={toggleProgressAlert}
        toggleTxActivityModal={toggleTxActivityModal}
        getPercentComplete={getPercentComplete}
        getTimeToCompletionString={getTimeToCompletionString}
      />
      <TxActivityModal
        isOpen={rimble.showTxActivityModal}
        transactions={transactions}
        toggleModal={() => {
          toggleTxActivityModal(!rimble.showTxActivityModal);
        }}
        getPercentComplete={getPercentComplete}
        getTimeToCompletionString={getTimeToCompletionString}
      />

      <TxModalsContainer address={address} store={store} />
      {appConfig.debugMode && <ProgressAlertDebug />}
    </Box>
  );
};

/*
 * Export connected component.
 */
const mapStateToProps = state => {
  const progressAlerts = getProgressAlertsByVisibilityFilter(
    state,
    "incomplete"
  );
  return {
    rimble: state.txModals,
    progressAlerts: progressAlerts,
    transactions: progressAlerts
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleProgressAlert: value => dispatch(toggleProgressAlert(value)),
    toggleTxActivityModal: value => dispatch(toggleTxActivityModal(value))
  };
};

export default drizzleConnect(
  ProgressAlertContainer,
  mapStateToProps,
  mapDispatchToProps
);
