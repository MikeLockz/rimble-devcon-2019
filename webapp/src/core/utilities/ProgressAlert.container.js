import React from "react";
import { drizzleConnect } from "@drizzle/react-plugin";
import { Box } from "rimble-ui";
import { getProgressAlertsByVisibilityFilter } from "./../redux/selectors";
import appConfig from "./../../appConfig";
import ProgressAlertDebug from "./ProgressAlertDebug";
import ProgressAlert, {
  MultipleProgressAlerts
} from "./components/ProgressAlert";
import { toggleProgressAlert } from "./../redux/actions";

const ProgressAlerts = ({ progressAlerts, toggleProgressAlert }) => {
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
    return <MultipleProgressAlerts count={progressAlerts.length} />;
  }
  return null;
};

const ProgressAlertContainer = ({ progressAlerts, toggleProgressAlert }) => {
  return (
    <Box>
      <ProgressAlerts
        progressAlerts={progressAlerts}
        toggleProgressAlert={toggleProgressAlert}
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
    progressAlerts: progressAlerts
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleProgressAlert: value => dispatch(toggleProgressAlert(value))
  };
};

export default drizzleConnect(
  ProgressAlertContainer,
  mapStateToProps,
  mapDispatchToProps
);
