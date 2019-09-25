import React from "react";
import { drizzleConnect } from "@drizzle/react-plugin";
import { Box } from "rimble-ui";
import { getProgressAlertsByVisibilityFilter } from "./../redux/selectors";
import appConfig from "./../../appConfig";
import ProgressAlertDebug from "./ProgressAlertDebug";
import ProgressAlert, {
  MultipleProgressAlerts
} from "./components/ProgressAlert";
import TxActivityModal from "./components/TxActivityModal";
import { toggleProgressAlert, toggleTxActivityModal } from "./../redux/actions";

const ProgressAlerts = ({
  rimble,
  progressAlerts,
  toggleProgressAlert,
  toggleTxActivityModal,
  getPercentComplete
}) => {
  const handleToggleProgressAlert = stackId => {
    toggleProgressAlert(stackId);
  };

  if (progressAlerts && progressAlerts.length === 1) {
    const { id } = progressAlerts[0];
    const { startTime, timeEstimate } = progressAlerts[0].remainingTime;

    return (
      <ProgressAlert
        key={`pa-${id}`}
        progressAlert={progressAlerts[0]}
        toggleProgressAlert={handleToggleProgressAlert}
        getPercentComplete={getPercentComplete}
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
  toggleTxActivityModal
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

  // how to run this every second here?

  return (
    <Box>
      <ProgressAlerts
        progressAlerts={progressAlerts}
        toggleProgressAlert={toggleProgressAlert}
        toggleTxActivityModal={toggleTxActivityModal}
        getPercentComplete={getPercentComplete}
      />
      <TxActivityModal
        isOpen={rimble.showTxActivityModal}
        transactions={transactions}
        toggleModal={() => {
          toggleTxActivityModal(!rimble.showTxActivityModal);
        }}
        getPercentComplete={getPercentComplete}
      />
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
