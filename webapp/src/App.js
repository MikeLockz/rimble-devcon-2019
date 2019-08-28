import React, { useState, useEffect } from "react";
import { Heading, Box, Flex, Button, Card, Text, Link, Image } from "rimble-ui";
import BuyRimbleTicket from "./components/BuyRimbleTicket";

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
        setLoading(false);
        // console.log("drizzleState", drizzleState);
        setDrizzleState(drizzleState);
      }
    });

    return function cleanup() {
      unsubscribe();
    };
  });

  return (
    <Box className="App">
      <Flex justifyContent={"flex-end"} p={3}>
        <Button>Connect</Button>
      </Flex>
      {loading ? (
        <Flex justifyContent={"center"}>
          <Heading.h3>Loading...</Heading.h3>
        </Flex>
      ) : (
        <Box maxWidth={"1180px"} p={3} mx={"auto"}>
          <Heading.h1>Buy Tickets</Heading.h1>

          <Text my={4} />
          <Flex justifyContent={"space-between"}>
            <BuyRimbleTicket
              drizzle={props.drizzle}
              drizzleState={drizzleState}
            />

            <Card width={"auto"}>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={"column"}
              >
                <Heading.h3 mb={3}>Food</Heading.h3>
                <Image height={"200px"} width={"200px"} mb={3} />
                <Button>Buy</Button>
              </Flex>
            </Card>

            <Card width={"auto"}>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={"column"}
              >
                <Heading.h3 mb={3}>Parties</Heading.h3>
                <Image height={"200px"} width={"200px"} mb={3} />
                <Button>Buy</Button>
              </Flex>
            </Card>
          </Flex>
          <Heading.h4 mt={4} mb={2}>
            About
          </Heading.h4>

          <Text mb={3} />

          <Link href="https://rimble.consensys.design" target="_blank">
            Learn more about Rimble
          </Link>
        </Box>
      )}
    </Box>
  );
}

export default App;
