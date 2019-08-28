import React, { useState, useEffect } from "react";
import { Card, Button, Flex, Heading, Image, Text } from "rimble-ui";

function BuyRimbleTicket(props) {
  const [drizzle, setDrizzle] = useState(props.drizzle);
  const [drizzleState, setDrizzleState] = useState(props.drizzleState);
  const [dataKey, setDataKey] = useState(null);
  const [rimbleToken, setRimbleToken] = useState(null);
  const [tokenName, setTokenName] = useState(null);
  const [contract, setContract] = useState(props.drizzle.contracts.RimbleToken);
  const [stackId, setStackId] = useState(null);

  const buyTicket = () => {
    // Get user's current address
    const address = drizzleState.accounts[0];

    // let drizzle know we want to call the `mint` method with `address` as parameter
    const stackId = contract.methods["mint"].cacheSend(address, {
      from: address
    });

    // save the `stackId` for later reference
    setStackId(stackId);
  };

  const getTxStatus = () => {
    if (!drizzleState) {
      return null;
    }
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] &&
      transactions[txHash].status}`;
  };

  useEffect(() => {
    const contract = drizzle.contracts.RimbleToken;

    const dataKey = contract.methods["name"].cacheCall();
    setDataKey(dataKey);
  });

  useEffect(() => {
    setDrizzleState(props.drizzleState);

    if (props.drizzleState) {
      // get the contract state from drizzleState
      const RimbleTokenStore = props.drizzleState.contracts;

      // using the saved `dataKey`, get the variable we're interested in
      setRimbleToken(RimbleTokenStore.RimbleToken[dataKey]);

      if (RimbleTokenStore.RimbleToken.name["0x0"]) {
        setTokenName(RimbleTokenStore.RimbleToken.name["0x0"].value);
      }
    }
  }, [props.drizzleState]);

  // if it exists, then we display its value
  return (
    <Card width={"auto"}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={"column"}
      >
        <Heading.h3 mb={3}>Attendance</Heading.h3>
        <Image height={"200px"} width={"200px"} mb={3} />
        <Button onClick={buyTicket}>Buy</Button>
        <Text my={3}>Purchasing: {tokenName}</Text>
        <Text my={3}>{getTxStatus()}</Text>
      </Flex>
    </Card>
  );
}

export default BuyRimbleTicket;
