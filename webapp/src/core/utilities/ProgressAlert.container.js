import React from "react";
import { drizzleConnect } from "@drizzle/react-plugin";
import { Box, Text, Button } from "rimble-ui";
import { getProgressAlertsByVisibilityFilter } from "./../redux/selectors";
import appConfig from "./../../appConfig";

import {
  addProgressAlert,
  toggleProgressAlert,
  setProgressAlertStatus,
  setProgressAlertTxHash,
  updateProgressAlertContent
} from "./../redux/actions";
import { VISIBILITY_FILTERS } from "./../redux/constants";

const ProgressAlerts = ({ progressAlerts }) => {
  return (
    <>
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
    </>
  );
};

const ProgressAlert = ({ progressAlert }) => {
  return (
    <Text key={progressAlert.id}>
      <pre>{JSON.stringify(progressAlert, null, 2)}</pre>
    </Text>
  );
};

const DebugButtons = ({
  progressAlerts,
  addProgressAlert,
  toggleProgressAlert,
  setProgressAlertStatus,
  setProgressAlertTxHash,
  updateProgressAlertContent
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

  const handleSetProgressAlertTxHash = txHash => {
    setProgressAlertTxHash({ txHash: txHash, id: 0 });
  };

  const handleUpdateProgressAlertContent = ({ txHash }) => {
    updateProgressAlertContent({
      txHash,
      content: { receipt: { confirmations: 3, status: "success" } }
    });
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

        <Button.Outline
          size={"small"}
          onClick={() => {
            handleUpdateProgressAlertContent({
              txHash: "0x123"
            });
          }}
        >
          Update Progress Alert Content by txHash
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
    </Box>
  );
};

const ProgressAlertContainer = ({
  progressAlerts,
  addProgressAlert,
  toggleProgressAlert,
  setProgressAlertStatus,
  setProgressAlertTxHash,
  updateProgressAlertContent
}) => {
  return (
    <Box>
      {appConfig.debugMode && (
        <DebugButtons
          progressAlerts={progressAlerts}
          addProgressAlert={addProgressAlert}
          toggleProgressAlert={toggleProgressAlert}
          setProgressAlertStatus={setProgressAlertStatus}
          setProgressAlertTxHash={setProgressAlertTxHash}
          updateProgressAlertContent={updateProgressAlertContent}
        />
      )}

      <ProgressAlerts progressAlerts={progressAlerts} />
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
    setProgressAlertTxHash: value => dispatch(setProgressAlertTxHash(value)),
    updateProgressAlertContent: value =>
      dispatch(updateProgressAlertContent(value))
  };
};

export default drizzleConnect(
  ProgressAlertContainer,
  mapStateToProps,
  mapDispatchToProps
);

drizzleConnect(DebugButtons, mapStateToProps, mapDispatchToProps);