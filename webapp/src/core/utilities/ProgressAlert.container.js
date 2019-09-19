import React from "react";
import { drizzleConnect } from "@drizzle/react-plugin";
import { Box, Text, Button } from "rimble-ui";
import { getProgressAlertsByVisibilityFilter } from "./../redux/selectors";
import {
  addProgressAlert,
  toggleProgressAlert,
  setProgressAlertStatus,
  setProgressAlertTxHash
} from "./../redux/actions";
import { VISIBILITY_FILTERS } from "./../redux/constants";

const ProgressAlert = ({ progressAlert }) => {
  return (
    <Text key={progressAlert.id}>
      <pre>{JSON.stringify(progressAlert, null, 2)}</pre>
    </Text>
  );
};

const ProgressAlertContainer = ({
  progressAlerts,
  addProgressAlert,
  toggleProgressAlert,
  setProgressAlertStatus,
  setProgressAlertTxHash
}) => {
  const handleAddProgressAlert = () => {
    addProgressAlert({ message: "I am progressAlert!" });
  };

  const handleToggleProgressAlert = () => {
    toggleProgressAlert(0);
  };

  const handleSetProgressAlertStatus = ({
    status,
    id,
    stackTempKey,
    txHash
  }) => {
    setProgressAlertStatus({ status, id, stackTempKey, txHash });
  };

  const handleSetProgressAlertTxHash = hash => {
    setProgressAlertTxHash({ hash: hash, id: 0 });
  };

  return (
    <Box>
      <Text>Progress Alerts:</Text>
      <Button.Outline size={"small"} onClick={handleAddProgressAlert}>
        Add Progress Alert
      </Button.Outline>
      <Button.Outline size={"small"} onClick={handleToggleProgressAlert}>
        Toggle Progress Alert Comlete
      </Button.Outline>
      <Box>
        <Button.Outline
          size={"small"}
          onClick={() => {
            handleSetProgressAlertStatus({ status: "started", id: 0 });
          }}
        >
          Set Progress Alert Status to started
        </Button.Outline>
        <Button.Outline
          size={"small"}
          onClick={() => {
            handleSetProgressAlertStatus({
              status: "pending",
              txHash: "0x123"
            });
          }}
        >
          Set Progress Alert Status to pending by txHash
        </Button.Outline>
        <Button.Outline
          size={"small"}
          onClick={() => {
            handleSetProgressAlertStatus({ status: "success", id: 0 });
          }}
        >
          Set Progress Alert Status to Success
        </Button.Outline>
        <Button.Outline
          size={"small"}
          onClick={() => {
            handleSetProgressAlertStatus({
              status: "error",
              stackTempKey: "123"
            });
          }}
        >
          Set Progress Alert Status to Error by stackTempKey
        </Button.Outline>
      </Box>

      <Button.Outline
        size={"small"}
        onClick={() => {
          handleSetProgressAlertTxHash("0x123..4321");
        }}
      >
        Set Progress Alert Tx Hash
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
        : null}
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
    addProgressAlert: value => dispatch(addProgressAlert(value)),
    toggleProgressAlert: value => dispatch(toggleProgressAlert(value)),
    setProgressAlertStatus: value => dispatch(setProgressAlertStatus(value)),
    setProgressAlertTxHash: value => dispatch(setProgressAlertTxHash(value))
  };
};

export default drizzleConnect(
  ProgressAlertContainer,
  mapStateToProps,
  mapDispatchToProps
);
