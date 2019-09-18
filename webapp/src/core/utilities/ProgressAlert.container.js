import React from "react";
import { drizzleConnect } from "@drizzle/react-plugin";
import { addProgressAlert } from "./../middleware";
import { Box, Text, Button } from "rimble-ui";
import { getProgressAlertsByVisibilityFilter } from "./../redux/selectors";
import { VISIBILITY_FILTERS } from "./../redux/constants";

const ProgressAlert = ({ progressAlert }) => {
  console.log("ProgressAlert", progressAlert);
  return <Text key={progressAlert.id}>{progressAlert.content.message}</Text>;
};

const ProgressAlertContainer = ({ progressAlerts, addProgressAlert }) => {
  const handleAddProgressAlert = () => {
    addProgressAlert({ message: "I am progressAlert!" });
  };

  console.log("ProgressAlertContainer", progressAlerts);

  return (
    <Box>
      <Text>Progress Alerts:</Text>
      <Button.Outline size={"small"} onClick={handleAddProgressAlert}>
        Add Progress Alert
      </Button.Outline>
      {progressAlerts && progressAlerts.length
        ? progressAlerts.map((progressAlert, index) => {
            return (
              <ProgressAlert
                key={progressAlert.id}
                progressAlert={progressAlert}
              />
            );
          })
        : "No todos, yay!"}
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
    addProgressAlert: value => dispatch(addProgressAlert(value))
  };
};

export default drizzleConnect(
  ProgressAlertContainer,
  mapStateToProps,
  mapDispatchToProps
);
