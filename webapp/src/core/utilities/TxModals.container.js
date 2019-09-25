import React from "react";
import { Box, Button } from "rimble-ui";
import { drizzleConnect } from "@drizzle/react-plugin";

import WrongNetwork from "./components/WrongNetwork";
import TxStartModal from "./components/TxStartModal";
import TxPendingModal from "./components/TxPendingModal";
import TxSuccessModal from "./components/TxSuccessModal";
import TxErrorModal from "./components/TxErrorModal";
import TxLowBalanceModal from "./components/TxLowBalanceModal";

import {
  toggleWrongNetworkModal,
  toggleTxStartModal,
  toggleTxPendingModal,
  toggleTxSuccessModal,
  toggleTxErrorModal,
  toggleTxLowBalanceModal,
  toggleTxActivityModal,
  setCurrentTxId,
  addProgressAlert,
  updateProgressAlertRemainingTime,
  updateProgressAlertTxFee
} from "../redux/actions";
import { getProgressAlertById } from "../redux/selectors";

const TxModalsContainer = ({
  address,
  rimble,
  store,
  toggleWrongNetworkModal,
  toggleTxStartModal,
  toggleTxPendingModal,
  toggleTxSuccessModal,
  toggleTxErrorModal,
  toggleTxLowBalanceModal,
  toggleTxActivityModal,
  setCurrentTxId,
  addProgressAlert,
  updateProgressAlertRemainingTime,
  updateProgressAlertTxFee
}) => {
  const handleWrongNetwork = () => {
    toggleWrongNetworkModal(!rimble.showWrongNetworkModal);
  };

  const handleTxStartModal = () => {
    addProgressAlert({
      token: {
        id: "DevConAttendance",
        name: "Conference ticket",
        ethPrice: "5.63",
        usdPrice: "1,000.00",
        image: "conference.png"
      }
    });
    updateProgressAlertRemainingTime({
      txHash: "0x123",
      content: {}
    });
    updateProgressAlertTxFee({
      txHash: "0x123",
      content: {}
    });
    setCurrentTxId(0);
    toggleTxStartModal(!rimble.showTxStartModal);
  };

  const handleTxPendingModal = () => {
    addProgressAlert({
      token: {
        id: "DevConAttendance",
        name: "Conference ticket",
        ethPrice: "5.63",
        usdPrice: "1,000.00",
        image: "conference.png"
      }
    });
    updateProgressAlertRemainingTime({
      txHash: "0x123",
      content: {}
    });
    updateProgressAlertTxFee({
      txHash: "0x123",
      content: {}
    });
    setCurrentTxId(0);
    toggleTxPendingModal(!rimble.showTxPendingModal);
  };

  const handleTxSuccessModal = () => {
    addProgressAlert({
      token: {
        id: "DevConAttendance",
        name: "Conference ticket",
        ethPrice: "5.63",
        usdPrice: "1,000.00",
        image: "conference.png",
        successTitle: "You're going to DevCon!",
        successInstructions:
          "Just show this ticket token in your wallet when you arrive at the conference venue.",
        owner: "0xBEFa5641D7681950213b490596cc0e7c3d9f2eAa",
        previousOwner: "0xBEFa5641D7681950213b490596cc0e7c3d9f2eAa"
      }
    });
    updateProgressAlertRemainingTime({
      txHash: "0x123",
      content: {}
    });
    updateProgressAlertTxFee({
      txHash: "0x123",
      content: {}
    });
    setCurrentTxId(0);
    toggleTxSuccessModal(!rimble.showTxSuccessModal);
  };

  const handleTxErrorModal = () => {
    toggleTxErrorModal(!rimble.showTxErrorModal);
  };

  const handleTxLowBalanceModal = () => {
    toggleTxLowBalanceModal(!rimble.showTxLowBalanceModal);
  };

  const handleTxActivityModal = () => {
    toggleTxActivityModal(!rimble.showTxActivityModal);
  };

  const handleSetCurrentTxId = () => {
    setCurrentTxId(0);
  };

  return (
    <Box
      my={3}
      p={3}
      borderColor={"gray"}
      borderWidth={1}
      borderRadius={3}
      borderStyle={"solid"}
    >
      <Button size={"small"} onClick={handleWrongNetwork} mr={3} mb={3}>
        Toggle Wrong Network modal
      </Button>

      {/* Figure out how to dispatch action that changes the modal visible property */}
      <Button size={"small"} onClick={handleTxStartModal} mr={3} mb={3}>
        Toggle Confirm Purchase modal
      </Button>
      <Button size={"small"} onClick={handleTxPendingModal} mr={3} mb={3}>
        Toggle Sending Ticket modal
      </Button>
      <Button size={"small"} onClick={handleTxSuccessModal} mr={3} mb={3}>
        Toggle Transaction Success modal
      </Button>
      <Button size={"small"} onClick={handleTxErrorModal} mr={3} mb={3}>
        Toggle Transaction Error modal
      </Button>
      <Button size={"small"} onClick={handleTxLowBalanceModal} mr={3} mb={3}>
        Toggle Low Balance modal
      </Button>
      <Button size={"small"} onClick={handleTxActivityModal} mr={3} mb={3}>
        Toggle Tx Activity modal
      </Button>

      <Button size={"small"} onClick={handleSetCurrentTxId} mr={3} mb={3}>
        Set CurrentTxId
      </Button>

      <WrongNetwork
        isOpen={rimble.showWrongNetworkModal}
        toggleModal={handleWrongNetwork}
      />

      {/* Only show when there is a currentTxId value */}
      {rimble.currentTxId && (
        <>
          <TxStartModal
            isOpen={rimble.showTxStartModal}
            toggleModal={() => {
              toggleTxStartModal(false);
            }}
            address={address}
            transaction={getProgressAlertById(
              store,
              rimble.currentTxId.stackId
            )}
          />

          <TxPendingModal
            isOpen={rimble.showTxPendingModal}
            toggleModal={() => {
              toggleTxPendingModal(false);
            }}
            address={address}
            price={"5.4"}
            transactionFee={"0.42"}
            estimatedTime={120}
            transaction={getProgressAlertById(
              store,
              rimble.currentTxId.stackId
            )}
          />

          <TxSuccessModal
            isOpen={rimble.showTxSuccessModal}
            toggleModal={() => {
              toggleTxSuccessModal(false);
            }}
            // token={{
            //   description: "DevCon Conference",
            //   image: "conference.png",
            //   owner: "0xa4738Ca27D069334d5Fe5653324bAcE18627C47e",
            //   previousOwner: "0xBEFa5641D7681950213b490596cc0e7c3d9f2eAa",
            //   price: "5.4",
            //   number: 1,
            //   totalAvailable: 100
            // }}
            transaction={getProgressAlertById(
              store,
              rimble.currentTxId.stackId
            )}
          />
        </>
      )}

      <TxErrorModal
        isOpen={rimble.showTxErrorModal}
        toggleModal={handleTxErrorModal}
      />

      <TxLowBalanceModal
        isOpen={rimble.showTxLowBalanceModal}
        toggleModal={handleTxLowBalanceModal}
        address={address}
      />
    </Box>
  );
};

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts,
    rimble: state.txModals,
    store: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleWrongNetworkModal: value => dispatch(toggleWrongNetworkModal(value)),
    toggleTxStartModal: value => dispatch(toggleTxStartModal(value)),
    toggleTxPendingModal: value => dispatch(toggleTxPendingModal(value)),
    toggleTxSuccessModal: value => dispatch(toggleTxSuccessModal(value)),
    toggleTxErrorModal: value => dispatch(toggleTxErrorModal(value)),
    toggleTxLowBalanceModal: value => dispatch(toggleTxLowBalanceModal(value)),
    toggleTxActivityModal: value => dispatch(toggleTxActivityModal(value)),
    setCurrentTxId: value => dispatch(setCurrentTxId(value)),
    addProgressAlert: value => dispatch(addProgressAlert(value)),
    updateProgressAlertRemainingTime: value =>
      dispatch(updateProgressAlertRemainingTime(value)),
    updateProgressAlertTxFee: value => dispatch(updateProgressAlertTxFee(value))
  };
};

export default drizzleConnect(
  TxModalsContainer,
  mapStateToProps,
  mapDispatchToProps
);
