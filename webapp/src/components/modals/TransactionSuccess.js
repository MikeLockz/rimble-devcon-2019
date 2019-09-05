import React, { useState } from "react";
import {
  Button,
  Flex,
  Box,
  Modal,
  Text,
  Heading,
  Icon,
  Link,
  Loader
} from "rimble-ui";
import RainbowBox from "../RainbowBox";
import RainbowImage from "../RainbowImage";
import shortenAddress from "../../core/utilities/shortenAddress";

function SuccessBody({
  toggleShowTokenDetails,
  shareNews,
  giftTicket,
  ticket
}) {
  return (
    <Box>
      <Heading.h3>You're going to DevCon!</Heading.h3>
      <Text my={3}>
        Just show this ticket token in your wallet when you arrive at the
        conference venue.
      </Text>

      <Flex alignItems={"center"} mt={3} mb={4} flexDirection={"column"}>
        <RainbowImage src={"images/" + ticket.image} />
        <Text mt={4} fontSize={3} lineHeight={1} fontWeight={600}>
          {ticket.description} #{ticket.number}
        </Text>
        <Link
          fontWeight={"normal"}
          textAlign={"center"}
          color={"primary"}
          size={1}
          onClick={toggleShowTokenDetails}
        >
          See token details
        </Link>
      </Flex>

      <Button.Outline onClick={shareNews} width={[1]} mb={3}>
        Share the good news
      </Button.Outline>
      <Button.Outline onClick={giftTicket} width={[1]}>
        Gift your ticket
      </Button.Outline>
    </Box>
  );
}

function TokenDetails({ toggleShowTokenDetails, ticket }) {
  return (
    <Box>
      <Flex mb={3}>
        <Link onClick={toggleShowTokenDetails}>Back</Link>
      </Flex>

      <Heading.h3>
        {ticket.description} #{ticket.number}
      </Heading.h3>

      <Flex alignItems={"center"} mt={3} mb={4} flexDirection={"column"}>
        <RainbowImage src={"/images/conference.png"} />
      </Flex>

      <Flex
        alignItems={"stretch"}
        flexDirection={"column"}
        borderRadius={2}
        borderColor={"#ccc"}
        borderWidth={1}
        borderStyle={"solid"}
        overflow={"hidden"}
        mt={4}
      >
        <Box bg={"primary"} px={3} py={2}>
          <Text color={"white"}>Ticket details</Text>
        </Box>

        <Flex justifyContent={"space-between"} bg={"#E8E8E8"} p={3}>
          <Text fontSize={1} color={"#444"} fontWeight={600}>
            Owner address
          </Text>
          <Link
            fontWeight={"normal"}
            href={"https://rinkeby.etherscan.io/address/" + ticket.owner}
            target={"_blank"}
          >
            <Flex alignItems={"center"}>
              <Text fontSize={1} fontWeight={600} color={"primary"}>
                {shortenAddress(ticket.owner)}
              </Text>
              <Box ml={2} p={1} borderRadius={"50%"} bg={"#d3c6d3"}>
                <Icon color={"primary"} name="Star" size={"12px"} />
              </Box>
            </Flex>
          </Link>
        </Flex>

        <Flex
          justifyContent={"space-between"}
          bg={"#EEE"}
          p={3}
          alignItems={"center"}
        >
          <Text fontSize={1} color={"#444"} fontWeight={600}>
            Previous owner
          </Text>
          <Link
            fontWeight={"normal"}
            href={
              "https://rinkeby.etherscan.io/address/" + ticket.previousOwner
            }
            target={"_blank"}
          >
            <Flex alignItems={"center"}>
              <Text fontSize={1} fontWeight={600} color={"primary"}>
                {shortenAddress(ticket.previousOwner)}
              </Text>
              <Box ml={2} p={1} borderRadius={"50%"} bg={"#d3c6d3"}>
                <Icon color={"primary"} name="Star" size={"12px"} />
              </Box>
            </Flex>
          </Link>
        </Flex>

        <Flex
          justifyContent={"space-between"}
          bg={"#E8E8E8"}
          py={2}
          px={3}
          alignItems={"center"}
        >
          <Text fontSize={1} color={"#444"} fontWeight={600}>
            Price
          </Text>
          <Flex alignItems={"flex-end"} flexDirection={"column"}>
            <Text color={"#444"} lineHeight={"1em"}>
              {ticket.price} ETH
            </Text>
            <Text color={"#615E66"} fontSize={"10px"}>
              $1450 USD
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
            Issue number
          </Text>
          <Text fontSize={1} color={"#444"}>
            {ticket.number}/{ticket.totalAvailable}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

function TransactionSuccess({ isOpen, toggleModal, ticket }, props) {
  const [showTokenDetails, setShowTokenDetails] = useState(false);

  const toggleShowTokenDetails = () => {
    setShowTokenDetails(!showTokenDetails);
  };
  const shareNews = () => {
    return;
  };
  const giftTicket = () => {
    return;
  };

  return (
    <Modal isOpen={isOpen}>
      <Box maxWidth={"436px"} bg={"background"}>
        <RainbowBox height={"5px"} />

        <Flex justifyContent={"flex-end"}>
          <Link onClick={toggleModal} color={"#CCC"} p={3} title={"Close"}>
            <Icon name="Close" />
          </Link>
        </Flex>
        <Flex
          flexDirection={"column"}
          justifyContent={"space-between"}
          mx={5}
          mb={5}
        >
          {showTokenDetails ? (
            <TokenDetails
              toggleShowTokenDetails={toggleShowTokenDetails}
              ticket={ticket}
            />
          ) : (
            <SuccessBody
              toggleShowTokenDetails={toggleShowTokenDetails}
              shareNews={shareNews}
              giftTicket={giftTicket}
              ticket={ticket}
            />
          )}
        </Flex>
      </Box>
    </Modal>
  );
}

export default TransactionSuccess;
