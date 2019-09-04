import React, { useState, useEffect } from "react";
import { Heading, Box, Flex, Button, Card, Text, Link, Image } from "rimble-ui";
import HeaderNav from "./components/HeaderNav";
import BuyCard from "./components/BuyCard";
import ConnectionBanner from "@rimble/connection-banner";
import ConfirmPurchase from "./components/ConfirmPurchase";
import { ThemeProvider } from "styled-components";
import CustomTheme from "./CustomTheme";
import styled from "styled-components";
import backgroundImage from "./images/background.jpg";
import tokenDetails from "./tokenDetails";

const BodyBox = styled(Box)`
  background: no-repeat center center url(${backgroundImage}) #fffff8;
`;

function App(props) {
  const [loading, setLoading] = useState(true);
  const [drizzleState, setDrizzleState] = useState(null);
  const [currentNetwork, setCurrentNetwork] = useState(null);
  const [showConfirmPurchase, setShowConfirmPurchase] = useState(false);

  useEffect(() => {
    const drizzle = props.drizzle;

    // subscribe to changes in the store
    const unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        console.log("drizzleState", drizzleState);
        console.log("drizzle", drizzle);
        setDrizzleState(drizzleState);
        setLoading(false);
        updateCurrentNetwork();
      }
    });

    return function cleanup() {
      unsubscribe();
    };
  });

  const updateCurrentNetwork = () => {
    if (window.web3) {
      window.web3.version.getNetwork(function(error, network) {
        setCurrentNetwork(parseInt(network));
      });
    }
  };

  const toggleConfirmPurchase = () => {
    setShowConfirmPurchase(!showConfirmPurchase);
  };

  return (
    <ThemeProvider theme={CustomTheme} className="App">
      <BodyBox height={"100%"}>
        <ConnectionBanner
          currentNetwork={currentNetwork}
          requiredNetwork={4}
          onWeb3Fallback={null}
        />
        {loading ? (
          <Box m={4}>
            <Text>Loading...</Text>
          </Box>
        ) : (
          <Box>
            <HeaderNav drizzleState={drizzleState} drizzle={props.drizzle} />
            <Box maxWidth={"1180px"} p={3} mx={"auto"}>
              <Text my={4} />
              <Flex justifyContent={"space-between"} mx={-3} flexWrap={"wrap"}>
                {tokenDetails.map(token => {
                  return (
                    <BuyCard
                      drizzle={props.drizzle}
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

            {/* Modals need to go here so they load after drizzleState is available */}
            <ConfirmPurchase
              isOpen={showConfirmPurchase}
              toggleConfirmPurchase={toggleConfirmPurchase}
              address={drizzleState.accounts["0"]}
            />
          </Box>
        )}
      </BodyBox>
    </ThemeProvider>
  );
}

export default App;
