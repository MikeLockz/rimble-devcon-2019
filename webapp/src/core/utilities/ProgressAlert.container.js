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
  toggleTxActivityModal
}) => {
  const handleToggleProgressAlert = stackId => {
    console.log("handleToggleProgressAlert", stackId);
    toggleProgressAlert(stackId);
  };

  if (progressAlerts && progressAlerts.length === 1) {
    return (
      <ProgressAlert
        key={`pa-${progressAlerts[0].id}`}
        progressAlert={progressAlerts[0]}
        toggleProgressAlert={handleToggleProgressAlert}
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
  return (
    <Box>
      <ProgressAlerts
        progressAlerts={progressAlerts}
        toggleProgressAlert={toggleProgressAlert}
        toggleTxActivityModal={toggleTxActivityModal}
      />
      <TxActivityModal
        isOpen={rimble.showTxActivityModal}
        transactions={transactions}
        toggleModal={() => {
          toggleTxActivityModal(!rimble.showTxActivityModal);
        }}
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
