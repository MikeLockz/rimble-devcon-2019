import React, { useState, useEffect } from "react";
import { Heading, Box, Flex, Button, Card, Text, Link, Image } from "rimble-ui";
import BuyRimbleTicket from "./components/BuyRimbleTicket";
import ConnectionBanner from "@rimble/connection-banner";

function App(props) {
  const [loading, setLoading] = useState(true);
  const [drizzleState, setDrizzleState] = useState(null);

  useEffect(() => {
    const drizzle = props.drizzle;

    // subscribe to changes in the store
    const unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        console.log("drizzleState", drizzleState);
        setDrizzleState(drizzleState);
        setLoading(false);
      }
    });

    return function cleanup() {
      unsubscribe();
    };
  });

  const getCurrentNetwork = () => {
    if (window.web3) {
      window.web3.version.getNetwork(function(error, network) {
        return network;
      });
    }
  };

  return (
    <Box className="App">
      {loading ? (
        <Box m={4}>
          <ConnectionBanner
            currentNetwork={getCurrentNetwork}
            requiredNetwork={4}
            onWeb3Fallback={null}
          />
        </Box>
      ) : (
        <Box>
          <Flex justifyContent={"flex-end"} p={3}>
            <Button>Connect</Button>
          </Flex>
          <Box maxWidth={"1180px"} p={3} mx={"auto"}>
            <Heading.h1>Buy Tickets</Heading.h1>

            <Text my={4} />
            <Flex justifyContent={"space-between"} mx={-3} flexWrap={"wrap"}>
              <BuyRimbleTicket
                drizzle={props.drizzle}
                drizzleState={drizzleState}
                tokenName={"DevConAttendance"}
              />
              <BuyRimbleTicket
                drizzle={props.drizzle}
                drizzleState={drizzleState}
                tokenName={"DevConFood"}
              />
              <BuyRimbleTicket
                drizzle={props.drizzle}
                drizzleState={drizzleState}
                tokenName={"DevConParties"}
              />
            </Flex>
            <Heading.h4 mt={4} mb={2}>
              About
            </Heading.h4>

            <Text mb={3} />

            <Link href="https://rimble.consensys.design" target="_blank">
              Learn more about Rimble
            </Link>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default App;
