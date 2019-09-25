import React from "react";
import { drizzleConnect } from "@drizzle/react-plugin";
import { Box, Text, Button, Heading } from "rimble-ui";
import { getProgressAlertsByVisibilityFilter } from "./../redux/selectors";

import {
  addProgressAlert,
  toggleProgressAlert,
  setProgressAlertStatus,
  setProgressAlertTxHash,
  updateProgressAlertContent,
  updateProgressAlertRemainingTime,
  updateProgressAlertTxFee
} from "./../redux/actions";

const ProressAlertsText = ({ progressAlerts }) => {
  return (
    <>
      {progressAlerts && progressAlerts.length
        ? progressAlerts.map((progressAlert, index) => {
            return (
              <ProgressAlertText
                key={`pat-${progressAlert.id}`}
                progressAlert={progressAlert}
              />
            );
          })
        : null}
    </>
  );
};

const ProgressAlertText = ({ progressAlert }) => {
  return (
    <Text key={progressAlert.id}>
      <pre>{JSON.stringify(progressAlert, null, 2)}</pre>
    </Text>
  );
};

const ProgressAlertDebug = ({
  progressAlerts,
  addProgressAlert,
  toggleProgressAlert,
  setProgressAlertStatus,
  setProgressAlertTxHash,
  updateProgressAlertContent,
  updateProgressAlertRemainingTime,
  updateProgressAlertTxFee
}) => {
  const handleAddProgressAlert = () => {
    addProgressAlert({
      message: "I am progressAlert!",
      token: {
        id: "DevConAttendance",
        name: "Conference ticket",
        ethPrice: "5.63",
        usdPrice: "1,000.00",
        image: "conference.png"
      }
    });
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

  const handleUpdateProgressAlertRemainingTime = ({ txHash }) => {
    updateProgressAlertRemainingTime({
      txHash,
      content: { receipt: { confirmations: 3, status: "success" } }
    });
  };

  const handleUpdateProgressAlertTxFee = ({ txHash }) => {
    updateProgressAlertTxFee({
      txHash,
      content: {}
    });
  };
  return (
    <Box m={3}>
      <Heading as={"h4"}>Progress Alert Debug</Heading>
      <Box
        p={3}
        borderColor={"gray"}
        borderWidth={1}
        borderRadius={3}
        borderStyle={"solid"}
      >
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

          <Button.Outline
            size={"small"}
            onClick={() => {
              handleUpdateProgressAlertRemainingTime({
                txHash: "0x123"
              });
            }}
          >
            Update Progress Alert RemainingTime by txHash
          </Button.Outline>

          <Button.Outline
            size={"small"}
            onClick={() => {
              handleUpdateProgressAlertTxFee({
                txHash: "0x123"
              });
            }}
          >
            Update Progress Alert TxFee by txHash
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

        <Box mt={3}>
          <Text>Progress Alerts Text</Text>
          <ProressAlertsText progressAlerts={progressAlerts} />
        </Box>
      </Box>
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
      dispatch(updateProgressAlertContent(value)),
    updateProgressAlertRemainingTime: value =>
      dispatch(updateProgressAlertRemainingTime(value)),
    updateProgressAlertTxFee: value => dispatch(updateProgressAlertTxFee(value))
  };
};

export default drizzleConnect(
  ProgressAlertDebug,
  mapStateToProps,
  mapDispatchToProps
);
