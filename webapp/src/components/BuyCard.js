import React, { useState } from "react";
import { Card, Button, Flex, Box, Image, Text } from "rimble-ui";
import RainbowBox from "./RainbowBox";
import RainbowImage from "./RainbowImage";

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
    <Box width={[1, 1 / 2, 1 / 3]} p={3}>
      <Card p={0} borderColor={"#d6d6d6"}>
        <RainbowBox height={"5px"} />
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={"column"}
          p={3}
        >
          <Flex justifyContent={"center"} mt={3} mb={4}>
            <RainbowImage src={"/images/" + token.image} />
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
    </Box>
  );
}

export default BuyCard;
