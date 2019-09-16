import React from "react";
import { ToastMessage, Button } from "rimble-ui";
import ProgressAlertProvider from "./components/ProgressAlertProvider";

const ProgressAlertUtil = props => {
  const triggerErrorProgressAlert = () => {
    window.progressAlertProvider.addMessage("Processing", {
      message: "Attempting to " + "test",
      transaction: "123x321",
      timeEstimate: 60,
      error: { error: "error" }
    });
  };

  const triggerTxProgressAlert = () => {
    window.progressAlertProvider.addMessage("Processing", {
      message: "Attempting to " + "testMethod",
      transaction: "123x321",
      timeEstimate: 200,
      error: {}
    });
  };

  return (
    <div>
      <Button size={"small"} onClick={triggerErrorProgressAlert} mr={3}>
        Trigger Error ProgressAlert
      </Button>

      <Button size={"small"} onClick={triggerTxProgressAlert}>
        Trigger tx ProgressAlert
      </Button>

      <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
      <ProgressAlertProvider
        ref={node => (window.progressAlertProvider = node)}
      />
    </div>
  );
};

export default ProgressAlertUtil;
