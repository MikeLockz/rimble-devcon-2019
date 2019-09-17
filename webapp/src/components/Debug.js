import React, { useState } from "react";
import { Box, Button } from "rimble-ui";
import { drizzleConnect } from "@drizzle/react-plugin";

import WrongNetwork from "./modals/WrongNetwork";
import ConfirmPurchase from "./ConfirmPurchase";
import SendingTicket from "./SendingTicket";
import TransactionSuccess from "./modals/TransactionSuccess";

const Debug = ({ address, store }) => {
  const [showWrongNetwork, setShowWrongNetwork] = useState(false);
  const [showConfirmPurchase, setShowConfirmPurchase] = useState(false);
  const [showSendingTicket, setShowSendingTicket] = useState(false);
  const [showTransactionSuccess, setShowTransactionSuccess] = useState(false);

  const toggleWrongNetwork = () => {
    setShowWrongNetwork(!showWrongNetwork);
  };

  const toggleConfirmPurchase = () => {
    setShowConfirmPurchase(!showConfirmPurchase);
  };

  const toggleSendingTicket = () => {
    setShowSendingTicket(!showSendingTicket);
  };

  const toggleTransactionSuccess = () => {
    setShowTransactionSuccess(!showTransactionSuccess);
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
      <Button size={"small"} onClick={toggleWrongNetwork} mr={3} mb={3}>
        Toggle Wrong Network modal
      </Button>
      <Button size={"small"} onClick={toggleConfirmPurchase} mr={3} mb={3}>
        Toggle Confirm Purchase modal
      </Button>
      <Button size={"small"} onClick={toggleSendingTicket} mr={3} mb={3}>
        Toggle Sending Ticket modal
      </Button>
      <Button size={"small"} onClick={toggleTransactionSuccess} mr={3} mb={3}>
        Toggle Transaction Success modal
      </Button>

      <WrongNetwork
        isOpen={showWrongNetwork}
        toggleWrongNetwork={toggleWrongNetwork}
      />

      <ConfirmPurchase
        isOpen={showConfirmPurchase}
        toggleModal={toggleConfirmPurchase}
        address={address}
      />

      <SendingTicket
        isOpen={showSendingTicket}
        toggleModal={toggleSendingTicket}
        address={address}
        price={"5.4"}
        transactionFee={"0.42"}
        estimatedTime={120}
      />

      <TransactionSuccess
        isOpen={showTransactionSuccess}
        toggleModal={toggleTransactionSuccess}
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
    </Box>
  );
};

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  };
};

export default drizzleConnect(Debug, mapStateToProps);
