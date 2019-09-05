import React, { useState } from "react";
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

function BuyCard({ token, drizzle, drizzleState, preflightCheck }, props) {
  const [stackId, setStackId] = useState(null);

  const buyTicket = tokenId => {
    // Get user's current address
    const address = drizzleState.accounts[0];

    // let drizzle know we want to call the `mint` method with `address` as parameter
    const stackId = drizzle.contracts[tokenId].methods["mint"].cacheSend(
      address,
      {
        from: address
      }
    );

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
              src={"/images/" + token.image}
            />
          </RainbowBorder>
        </Flex>

        <Flex justifyContent={"space-between"} width={1}>
          <Text fontWeight={600} lineHeight={"1em"}>
            {token.name}
          </Text>
          <Text fontWeight={600} lineHeight={"1em"}>
            {token.ethPrice} ETH
          </Text>
        </Flex>
        <Flex justifyContent={"flex-end"} width={1}>
          <Text color={"#979797"} lineHeight={"1.4em"}>
            ${token.usdPrice} USD
          </Text>
        </Flex>

        <Button
          onClick={() => {
            preflightCheck(() => {
              buyTicket(token.id);
            });
          }}
          width={[1]}
          mt={"26px"}
        >
          Buy ticket
        </Button>
        <Text my={3}>{getTxStatus()}</Text>
      </Flex>
    </Card>
  );
}

export default BuyCard;
