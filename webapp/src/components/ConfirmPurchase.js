import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Icon,
  Link,
  Button,
  Flex,
  Heading,
  Text,
  Card
} from "rimble-ui";

function ConfirmPurchase({ isOpen, toggleConfirmPurchase }) {
  return (
    <Modal width={"auto"} m={3} minWidth={"300px"} isOpen={isOpen}>
      <Card borderRadius={1} maxWidth={"436px"}>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={"column"}
        >
          <Heading.h3 mb={3}>Confirm your purchase in MetaMask</Heading.h3>
          <Text>
            Double check the details here - this transaction can't be refunded.
          </Text>

          <Flex
            alignItems={"stretch"}
            flexDirection={"column"}
            borderRadius={2}
            borderColor={"gray"}
            borderWidth={1}
            borderStyle={"solid"}
            overflow={"hidden"}
            my={3}
          >
            <Box bg={"purple"} p={2}>
              <Text color={"white"} textAlign={"center"}>
                Buying DevCon V ticket #1
              </Text>
            </Box>

            <Flex p={2}>
              <Icon name="Star" m={3} />
              <Box>
                <Text>Waiting for confirmation...</Text>
                <Text color={"purple"}>Don't see the MetaMask popup?</Text>
              </Box>
            </Flex>

            <Flex justifyContent={"space-between"} background={"gray"} p={2}>
              <Text>Your account</Text>
              <Link>
                <Flex alignItems={"center"}>
                  0xAc03...1e5A
                  <Icon name={"Star"} />
                </Flex>
              </Link>
            </Flex>

            <Flex justifyContent={"space-between"} background={"gray"} p={2}>
              <Text>Your account</Text>
              <Flex alignItems={"flex-end"} flexDirection={"column"}>
                <Text>5.4 ETH</Text>
                <Text fontSize={1}>$1450 USD</Text>
              </Flex>
            </Flex>

            <Flex justifyContent={"space-between"} background={"gray"} p={2}>
              <Flex alignItems={"center"}>
                <Text>Transaction fee</Text>
                <Link>
                  <Icon name={"Star"} />
                </Link>
              </Flex>
              <Flex alignItems={"flex-end"} flexDirection={"column"}>
                <Text>$0.42</Text>
                <Text fontSize={1}>0.00112 ETH</Text>
              </Flex>
            </Flex>

            <Flex justifyContent={"space-between"} background={"gray"} p={2}>
              <Text>Estimated Time</Text>
              <Text>Less than 2 minutes</Text>
            </Flex>
          </Flex>
          <Button.Outline
            onClick={() => {
              toggleConfirmPurchase(isOpen);
            }}
            width={[1]}
          >
            Cancel Purchase
          </Button.Outline>
        </Flex>
      </Card>
    </Modal>
  );
}

export default ConfirmPurchase;
