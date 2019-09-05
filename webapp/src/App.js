import React, { useState, useEffect } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import styled from "styled-components";

import HeaderNav from "./components/HeaderNav";
import BuyCard from "./components/BuyCard";
import ConnectionBanner from "@rimble/connection-banner";
import ConfirmPurchase from "./components/ConfirmPurchase";

import { Heading, Box, Flex, Button, Text, Link } from "rimble-ui";

import backgroundImage from "./images/background.jpg";
import tokenDetails from "./tokenDetails";

const BodyBox = styled(Box)`
  background: no-repeat center center url(${backgroundImage}) #fffff8;
`;

function App({ drizzleState }, props) {
  const [currentNetwork, setCurrentNetwork] = useState(null);
  const [address, setAddress] = useState(null);
  const [showConfirmPurchase, setShowConfirmPurchase] = useState(false);

  useEffect(() => {
    console.log("useEffect.drizzleState", drizzleState);
    if (drizzleState) {
      setAddress(drizzleState.accounts["0"]);
      setCurrentNetwork(drizzleState.web3.networkId);
    }
  });

  const toggleConfirmPurchase = () => {
    setShowConfirmPurchase(!showConfirmPurchase);
  };

  return (
    <DrizzleContext.Consumer>
      {drizzleContext => {
        console.log("drizzleContext", drizzleContext);

        const { drizzle, drizzleState, initialized } = drizzleContext;

        return (
          <BodyBox height={"100%"}>
            <Box>
              <HeaderNav drizzleState={drizzleState} drizzle={drizzle} />
              {!initialized && (
                <Box m={4}>
                  <ConnectionBanner
                    currentNetwork={1}
                    requiredNetwork={4}
                    onWeb3Fallback={null}
                  />
                </Box>
              )}
              <Box maxWidth={"1180px"} p={3} mx={"auto"}>
                <Text my={4} />
                <Flex
                  justifyContent={"space-between"}
                  mx={-3}
                  flexWrap={"wrap"}
                >
                  {tokenDetails.map(token => {
                    return (
                      <BuyCard
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        token={token}
                        key={token.id}
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
                  <Button size={"small"} onClick={toggleConfirmPurchase}>
                    Toggle Confirm Purchase modal
                  </Button>
                </Box>
              </Box>

              <ConfirmPurchase
                isOpen={showConfirmPurchase}
                toggleConfirmPurchase={toggleConfirmPurchase}
                address={address}
              />
            </Box>
          </BodyBox>
        );
      }}
    </DrizzleContext.Consumer>
  );
}

export default App;
