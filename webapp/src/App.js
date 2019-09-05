import React, { useState, useEffect } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import styled from "styled-components";

import HeaderNav from "./components/HeaderNav";
import BuyCard from "./components/BuyCard";
import ConnectionBanner from "@rimble/connection-banner";
import WrongNetwork from "./components/modals/WrongNetwork";
import ConfirmPurchase from "./components/ConfirmPurchase";
import SendingTicket from "./components/SendingTicket";

import { Heading, Box, Flex, Button, Text, Link } from "rimble-ui";

import backgroundImage from "./images/background.jpg";
import tokenDetails from "./tokenDetails";

const BodyBox = styled(Box)`
  background: no-repeat center center url(${backgroundImage}) #fffff8;
`;

function App({ drizzle, drizzleState, appConfig }, props) {
  const [currentNetwork, setCurrentNetwork] = useState(null);
  const [address, setAddress] = useState(null);
  const [showWrongNetwork, setShowWrongNetwork] = useState(false);
  const [showConfirmPurchase, setShowConfirmPurchase] = useState(false);
  const [showSendingTicket, setShowSendingTicket] = useState(true);

  useEffect(() => {
    if (drizzleState) {
      setAddress(drizzleState.accounts["0"]);
      setCurrentNetwork(drizzleState.web3.networkId);
    }
    if (!currentNetwork) {
      getNetwork();
    }
  }, drizzleState);

  const toggleWrongNetwork = () => {
    setShowWrongNetwork(!showWrongNetwork);
  };

  const toggleConfirmPurchase = () => {
    setShowConfirmPurchase(!showConfirmPurchase);
  };

  const toggleSendingTicket = () => {
    setShowSendingTicket(!showSendingTicket);
  };

  const getNetwork = () => {
    window.web3.version.getNetwork((error, networkId) => {
      setCurrentNetwork(parseInt(networkId));
    });
  };

  const preflightCheck = callback => {
    if (currentNetwork !== appConfig.requiredNetwork) {
      toggleWrongNetwork();
      return;
    }
    callback();
  };

  return (
    <BodyBox height={"100%"}>
      <Box>
        <HeaderNav
          drizzle={drizzle}
          drizzleState={drizzleState}
          preflightCheck={preflightCheck}
        />
        {!drizzleState && (
          <Box m={4}>
            <ConnectionBanner
              currentNetwork={currentNetwork}
              requiredNetwork={appConfig.requiredNetwork}
              onWeb3Fallback={null}
            />
          </Box>
        )}
        <Box maxWidth={"1180px"} p={3} mx={"auto"}>
          <Text my={4} />
          <Flex justifyContent={"space-between"} mx={-3} flexWrap={"wrap"}>
            {tokenDetails.map(token => {
              return (
                <BuyCard
                  drizzle={drizzle}
                  drizzleState={drizzleState}
                  token={token}
                  key={token.id}
                  preflightCheck={preflightCheck}
                />
              );
            })}
          </Flex>
          <Heading.h4 mt={4} mb={2}>
            About
          </Heading.h4>

          <Text mb={3} />

          <Link href="https://rimble.consensys.design" target="_blank">
            Learn more about Rimble
          </Link>

          <Box
            my={3}
            p={3}
            borderColor={"gray"}
            borderWidth={1}
            borderRadius={3}
            borderStyle={"solid"}
          >
            <Button size={"small"} onClick={toggleWrongNetwork} mr={3}>
              Toggle Wrong Network modal
            </Button>
            <Button size={"small"} onClick={toggleConfirmPurchase} mr={3}>
              Toggle Confirm Purchase modal
            </Button>
            <Button size={"small"} onClick={toggleSendingTicket} mr={3}>
              Toggle Sending Ticket modal
            </Button>
          </Box>
        </Box>

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
      </Box>
    </BodyBox>
  );
}

export default App;
