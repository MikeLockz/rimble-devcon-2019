import React from "react";
import { Card, Button, Flex, Box, Text } from "rimble-ui";
import RainbowBox from "./RainbowBox";
import RainbowImage from "./RainbowImage";
import { ContractForm } from "@drizzle/react-components";
import EthToFiat from "./../core/utilities/components/EthToFiat";

function BuyCard({
  token,
  drizzle,
  drizzleState,
  address,
  preflightCheck,
  enableBuyButton
}) {
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
              $<EthToFiat eth={token.ethPrice} /> USD
            </Text>
          </Flex>
          {/* Use drizzle's ContractForm component, with custom renderprop for styling. This way we can get contract events from the redux store */}
          {drizzleState && enableBuyButton ? (
            <ContractForm
              contract={token.id}
              method="mint"
              drizzle={drizzle}
              drizzleState={drizzleState}
              render={({ handleInputChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Button
                    width={[1]}
                    mt={"26px"}
                    mb={2}
                    type={"text"} // manually set properties on the button so that the handleInputChange and handleSubmit still work properly
                    name={"recepient"} // set the name to the method's argument key
                    onClick={e => {
                      e.target.value = drizzleState.accounts[0]; // set the recepient contract argument after drizzleState is available

                      // This function will get ran once all preflight checks pass
                      const callback = e => {
                        handleInputChange(e);
                      };

                      // Pass the event into the preflight check so that it can be passed again into the callback
                      const event = e;

                      // Passing to intercepting function to make sure network and balance will allow tx to happen
                      preflightCheck({
                        token,
                        drizzle,
                        address: drizzleState.accounts[0],
                        callback,
                        event
                      });
                    }}
                  >
                    Buy
                  </Button>
                </form>
              )}
            />
          ) : (
            <Button
              mt={"26px"}
              mb={2}
              type={"text"} // manually set properties on the button so that the handleInputChange and handleSubmit still work properly
              name={"recepient"} // set the name to the method's argument key
            >
              Buy
            </Button>
          )}
        </Flex>
      </Card>
    </Box>
  );
}

export default BuyCard;
