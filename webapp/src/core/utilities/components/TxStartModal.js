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
  Tooltip
} from "rimble-ui";
import EyeIcon from "./EyeIcon";
import MetaMaskLoader from "./MetaMaskLoader";
import shortenAddress from "./../shortenAddress";
import { drizzleConnect } from "@drizzle/react-plugin";

function TxStartModal({ isOpen, toggleModal, address, transaction }, props) {
  console.log("TxStartModal - transaction", transaction);
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
            Double check the details here &ndash; this transaction can't be
            refunded.
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
            <Box bg={"primary"} px={3} py={2}>
              <Text color={"white"}>{transaction.content.token.name}</Text>
            </Box>

            <Flex p={3} borderBottom={"1px solid #ccc"} alignItems={"center"}>
              <MetaMaskLoader />
              <Box>
                <Text fontWeight={"600"} fontSize={1} lineHeight={"1.25em"}>
                  Waiting for confirmation...
                </Text>
                <Text
                  fontSize={1}
                  fontWeight={100}
                  lineHeight={"1.25em"}
                  color={"primary"}
                >
                  Don't see the MetaMask popup?
                </Text>
              </Box>
            </Flex>

            <Flex justifyContent={"space-between"} bg={"#E8E8E8"} p={3}>
              <Text fontSize={1} color={"#444"} fontWeight={600}>
                Your account
              </Text>
              <Link
                fontWeight={"normal"}
                href={"https://rinkeby.etherscan.io/address/" + address}
                target={"_blank"}
                color={"primary"}
                hoverColor={"primary"}
              >
                <Flex alignItems={"center"}>
                  <Text fontSize={1} fontWeight={600} color={"primary"}>
                    {shortenAddress(address)}
                  </Text>
                  <EyeIcon />
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
                  {transaction.content.token.ethPrice} ETH
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
                <Link href ml={1}>
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
                  {transaction.txFee.eth} ETH
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
              <Text fontSize={1} color={"#444"}>
                Less than 2 minutes
              </Text>
            </Flex>
          </Flex>

          <Button.Outline
            onClick={() => {
              toggleModal(isOpen);
              // How can we call the web3 api here to cancel the tx?
            }}
            width={[1]}
          >
            Cancel purchase
          </Button.Outline>
        </Flex>
      </Card>
    </Modal>
  );
}

export default TxStartModal;
