import React from "react";
import { Box, Button } from "rimble-ui";
import { drizzleConnect } from "@drizzle/react-plugin";

import WrongNetwork from "./modals/WrongNetwork";
import TxStartModal from "./modals/TxStartModal";
import TxPendingModal from "./modals/TxPendingModal";
import TxSuccessModal from "./modals/TxSuccessModal";
import TxErrorModal from "./modals/TxErrorModal";
import TxLowBalanceModal from "./modals/TxLowBalanceModal";

import {
  toggleWrongNetworkModal,
  toggleTxStartModal,
  toggleTxPendingModal,
  toggleTxSuccessModal,
  toggleTxErrorModal,
  toggleTxLowBalanceModal,
  toggleTxActivityModal
} from "../core/redux/actions";

const TxModalsContainer = ({
  address,
  rimble,
  toggleWrongNetworkModal,
  toggleTxStartModal,
  toggleTxPendingModal,
  toggleTxSuccessModal,
  toggleTxErrorModal,
  toggleTxLowBalanceModal,
  toggleTxActivityModal
}) => {
  const handleWrongNetwork = () => {
    toggleWrongNetworkModal(!rimble.showWrongNetworkModal);
  };

  const handleTxStartModal = () => {
    toggleTxStartModal(!rimble.showTxStartModal);
  };

  const handleTxPendingModal = () => {
    toggleTxPendingModal(!rimble.showTxPendingModal);
  };

  const handleTxSuccessModal = () => {
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

      <WrongNetwork
        isOpen={rimble.showWrongNetworkModal}
        toggleModal={handleWrongNetwork}
      />

      <TxStartModal
        isOpen={rimble.showTxStartModal}
        toggleModal={handleTxStartModal}
        address={address}
      />

      <TxPendingModal
        isOpen={rimble.showTxPendingModal}
        toggleModal={handleTxPendingModal}
        address={address}
        price={"5.4"}
        transactionFee={"0.42"}
        estimatedTime={120}
      />

      <TxSuccessModal
        isOpen={rimble.showTxSuccessModal}
        toggleModal={handleTxSuccessModal}
        ticket={{
          description: "DevCon Conference",
          image: "conference.png",
          owner: "0xa4738Ca27D069334d5Fe5653324bAcE18627C47e",
          previousOwner: "0xBEFa5641D7681950213b490596cc0e7c3d9f2eAa",
          price: "5.4",
          number: 1,
          totalAvailable: 100
        }}
      />

      <TxErrorModal
        isOpen={rimble.showTxErrorModal}
        toggleModal={handleTxErrorModal}
      />

      <TxLowBalanceModal
        isOpen={rimble.showTxLowBalanceModal}
        toggleModal={handleTxLowBalanceModal}
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
    rimble: state.txModals
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
    toggleTxActivityModal: value => dispatch(toggleTxActivityModal(value))
  };
};

export default drizzleConnect(
  TxModalsContainer,
  mapStateToProps,
  mapDispatchToProps
);
