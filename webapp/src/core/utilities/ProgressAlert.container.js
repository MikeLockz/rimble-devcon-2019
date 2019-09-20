import React from "react";
import { drizzleConnect } from "@drizzle/react-plugin";
import { Box } from "rimble-ui";
import { getProgressAlertsByVisibilityFilter } from "./../redux/selectors";
import appConfig from "./../../appConfig";
import ProgressAlertDebug from "./ProgressAlertDebug";
import ProgressAlert from "./components/ProgressAlert";
import { toggleProgressAlert } from "./../redux/actions";
import { VISIBILITY_FILTERS } from "./../redux/constants";

const ProgressAlerts = ({ progressAlerts, toggleProgressAlert }) => {
  const handleToggleProgressAlert = stackId => {
    console.log("handleToggleProgressAlert", stackId);
    toggleProgressAlert(stackId);
  };
  return (
    <>
      {progressAlerts && progressAlerts.length
        ? progressAlerts.map((progressAlert, index) => {
            return (
              <ProgressAlert
                key={`pa-${progressAlert.id}`}
                progressAlert={progressAlert}
                toggleProgressAlert={handleToggleProgressAlert}
              />
            );
          })
        : null}
    </>
  );
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
  const { visibilityFilter } = state;
  const progressAlerts = getProgressAlertsByVisibilityFilter(
    state,
    visibilityFilter
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
