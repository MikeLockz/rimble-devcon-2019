import React from "react";
import {
  Modal,
  Box,
  Icon,
  Link,
  Button,
  Flex,
  Heading,
  Text,
  Card,
  Tooltip,
  EthAddress
} from "rimble-ui";
import ProgressBar from "./../../core//utilities/components/ProgressBar";
import ProgressPercentCircle from "./../../core//utilities/components/ProgressPercentCircle";

function TxPendingModal(
  { isOpen, toggleModal, address, transaction, drizzleState },
  props
) {
  console.log("drizzleState", drizzleState);
  return (
    <Modal width={"auto"} m={3} minWidth={"300px"} isOpen={isOpen}>
      <Card borderRadius={1} maxWidth={"436px"}>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={"column"}
        >
          <Heading.h3 mb={3}>Sending your ticket...</Heading.h3>
          <Text>
            Nice one! Your ticket should be with your account shortly.
          </Text>

          <Flex
            alignItems={"stretch"}
            flexDirection={"column"}
            borderRadius={2}
            borderColor={"#ccc"}
            borderWidth={1}
            borderStyle={"solid"}
            overflow={"hidden"}
            my={4}
          >
            <Box>
              <Box bg={"primary"}>
                <ProgressBar
                  percent={transaction.remainingTime.percent}
                  height={"10px"}
                />
                <Box px={3} py={2}>
                  <Flex alignItems={"center"}>
                    <ProgressPercentCircle
                      percent={transaction.remainingTime.percent}
                      mr={3}
                    />
                    <Text color={"white"} ml={3}>
                      In progress
                    </Text>
                  </Flex>
                </Box>
              </Box>
            </Box>

            <Flex justifyContent={"space-between"} bg={"#E8E8E8"} p={3}>
              <Text fontSize={1} color={"#444"} fontWeight={600}>
                Your account
              </Text>
              <Link
                fontWeight={"normal"}
                href={"https://rinkeby.etherscan.io/address/" + address}
                target={"_blank"}
              >
                <Flex alignItems={"center"}>
                  <EthAddress
                    fontSize={1}
                    fontWeight={600}
                    address={address}
                    truncate
                  />
                  <Box ml={2} p={1} borderRadius={"50%"} bg={"#d3c6d3"}>
                    <Icon color={"primary"} name="Star" size={"12px"} />
                  </Box>
                </Flex>
              </Link>
            </Flex>

            <Flex
              justifyContent={"space-between"}
              bg={"#EEE"}
              py={2}
              px={3}
              alignItems={"center"}
            >
              <Text fontSize={1} color={"#444"} fontWeight={600}>
                Price
              </Text>
              <Flex alignItems={"flex-end"} flexDirection={"column"}>
                <Text color={"#444"} lineHeight={"1em"}>
                  {transaction.content.token.ethPrice}
                </Text>
                <Text color={"#615E66"} fontSize={"10px"}>
                  ${transaction.content.token.usdPrice} USD
                </Text>
              </Flex>
            </Flex>

            <Flex
              justifyContent={"space-between"}
              bg={"#E8E8E8"}
              py={2}
              px={3}
              alignItems={"center"}
            >
              <Flex alignItems={"center"}>
                <Text fontSize={1} color={"#444"} fontWeight={600}>
                  Transaction fee
                </Text>
                <Link href="#" ml={1}>
                  <Tooltip
                    message="Pays the Ethereum network to process your transaction. Spent even if the transaction fails."
                    position="top"
                  >
                    <Icon name={"InfoOutline"} size={"14px"} />
                  </Tooltip>
                </Link>
              </Flex>
              <Flex alignItems={"flex-end"} flexDirection={"column"}>
                <Text color={"#444"} lineHeight={"1em"}>
                  ${transaction.txFee.usd}
                </Text>
                <Text color={"#615E66"} fontSize={"10px"}>
                  {transaction.txFee.usd} ETH
                </Text>
              </Flex>
            </Flex>

            <Flex
              justifyContent={"space-between"}
              bg={"#EEE"}
              p={3}
              alignItems={"center"}
            >
              <Text fontSize={1} color={"#444"} fontWeight={600}>
                Estimated Time
              </Text>
              <Text fontSize={1} color={"#444"} ml={3}>
                Less than 2 minutes
              </Text>
            </Flex>
          </Flex>

          <Button.Outline
            onClick={() => {
              toggleModal(isOpen);
            }}
            width={[1]}
          >
            Close
          </Button.Outline>
        </Flex>
      </Card>
    </Modal>
  );
}

export default TxPendingModal;
