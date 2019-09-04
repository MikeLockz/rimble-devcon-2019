import React, { useState, useEffect } from "react";
import { Card, Button, Flex, Box, Image, Text } from "rimble-ui";
import styled from "styled-components";

const RainbowBox = styled(Box)`
  background: linear-gradient(
    270deg,
    #efa59e 0%,
    #f5ccd1 17.19%,
    #f7ceb3 33.85%,
    #eccfa5 52.08%,
    #b9d8ae 68.23%,
    #97d6e3 84.37%,
    #9fb1e8 100%
  );
  transform: matrix(-1, 0, 0, 1, 0, 0);
`;

const RainbowBorder = styled(Flex)`
  background: linear-gradient(
    270deg,
    #efa59e 0%,
    #f5ccd1 17.19%,
    #f7ceb3 33.85%,
    #eccfa5 52.08%,
    #b9d8ae 68.23%,
    #97d6e3 84.37%,
    #9fb1e8 100%
  );
  padding: 1px;
`;

const ShadowImage = styled(Image)`
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
`;

function BuyRimbleTicket(props) {
  const [drizzle, setDrizzle] = useState(props.drizzle);
  const [drizzleState, setDrizzleState] = useState(props.drizzleState);
  const [dataKey, setDataKey] = useState(null);
  const [rimbleToken, setRimbleToken] = useState(null);
  const [tokenDisplayName, setTokenDisplayName] = useState(null);
  const [contract, setContract] = useState(
    props.drizzle.contracts.DevConAttendance
  );
  const [stackId, setStackId] = useState(null);
  const [tokenName, setTokenName] = useState(props.tokenName);

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
    const contract = drizzle.contracts[tokenName];

    const dataKey = contract.methods["name"].cacheCall();
    setDataKey(dataKey);
  });

  useEffect(() => {
    setDrizzleState(props.drizzleState);

    if (props.drizzleState) {
      // get the contract state from drizzleState
      const RimbleTokenStore = props.drizzleState.contracts;

      // using the saved `dataKey`, get the variable we're interested in
      setRimbleToken(RimbleTokenStore[tokenName][dataKey]);

      if (RimbleTokenStore[tokenName].name["0x0"]) {
        setTokenDisplayName(RimbleTokenStore[tokenName].name["0x0"].value);
      }
    }
  }, [props.drizzleState]);

  // if it exists, then we display its value
  return (
    <Card
      width={"auto"}
      m={3}
      minWidth={"300px"}
      maxWidth={"333px"}
      p={0}
      borderColor={"#d6d6d6"}
    >
      <RainbowBox height={"5px"} />
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={"column"}
        p={3}
      >
        <Flex justifyContent={"center"} mt={3} mb={4}>
          <RainbowBorder borderRadius={3}>
            <ShadowImage
              height={"200px"}
              width={"200px"}
              border={"none"}
              borderWidth={0}
              borderColor={"white"}
              overflow={"hidden"}
              bg={"white"}
            />
          </RainbowBorder>
        </Flex>

        <Flex justifyContent={"space-between"} width={1}>
          <Text fontWeight={600} lineHeight={"1em"}>
            Conference ticket
          </Text>
          <Text fontWeight={600} lineHeight={"1em"}>
            5.4 ETH
          </Text>
        </Flex>
        <Flex justifyContent={"flex-end"} width={1}>
          <Text color={"#979797"} lineHeight={"1.4em"}>
            $1450 USD
          </Text>
        </Flex>

        <Button onClick={buyTicket} width={[1]} mt={"26px"}>
          Buy ticket
        </Button>
        <Text my={3}>{getTxStatus()}</Text>
      </Flex>
    </Card>
  );
}

export default BuyRimbleTicket;
