import React, { useState } from "react";
import { Button, Flex, Box, Modal, Text, Heading, Icon, Link } from "rimble-ui";
import RainbowBox from "../RainbowBox";
import RainbowImage from "../RainbowImage";
import EyeIcon from "./EyeIcon";
import shortenAddress from "../../core/utilities/shortenAddress";

function SuccessBody({
  toggleModal,
  toggleShowTokenDetails,
  shareNews,
  giftTicket,
  token
}) {
  return (
    <Box>
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
        <Heading.h3>{token.successTitle}</Heading.h3>
        <Text my={3}>{token.successInstructions}</Text>

        <Flex alignItems={"center"} mt={3} mb={4} flexDirection={"column"}>
          <RainbowImage src={"images/" + token.image} />
          <Text mt={4} fontSize={3} lineHeight={1} fontWeight={600}>
            {token.description}
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
      </Flex>
    </Box>
  );
}

function TokenDetails({ toggleModal, toggleShowTokenDetails, token }) {
  return (
    <Box>
      <Flex justifyContent={"space-between"}>
        <Flex p={3}>
          <Link onClick={toggleShowTokenDetails}>Back</Link>
        </Flex>

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
        <Heading.h3>{token.description}</Heading.h3>

        <Flex alignItems={"center"} mt={3} mb={4} flexDirection={"column"}>
          <RainbowImage src={"images/" + token.image} />
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
            <Text fontSize={1} color={"#444"} fontWeight={600} mr={3}>
              Owner address
            </Text>
            <Link
              fontWeight={"normal"}
              href={"https://rinkeby.etherscan.io/address/" + token.owner}
              target={"_blank"}
            >
              <Flex alignItems={"center"}>
                <Text fontSize={1} fontWeight={600} color={"primary"}>
                  {token.owner && shortenAddress(token.owner)}
                </Text>
                <EyeIcon />
              </Flex>
            </Link>
          </Flex>

          <Flex
            justifyContent={"space-between"}
            bg={"#EEE"}
            p={3}
            alignItems={"center"}
          >
            <Text fontSize={1} color={"#444"} fontWeight={600} mr={3}>
              Previous owner
            </Text>
            <Link
              fontWeight={"normal"}
              href={
                "https://rinkeby.etherscan.io/address/" + token.previousOwner
              }
              target={"_blank"}
            >
              <Flex alignItems={"center"}>
                <Text fontSize={1} fontWeight={600} color={"primary"}>
                  {token.owner && shortenAddress(token.previousOwner)}
                </Text>
                <EyeIcon />
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
                {token.ethPrice} ETH
              </Text>
              <Text color={"#615E66"} fontSize={"10px"}>
                ${token.usdPrice} USD
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
              {token.number}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

function TxSuccessModal({ isOpen, toggleModal, transaction }, props) {
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

  const token = { ...transaction.content.token };
  console.log("token", token);

  return (
    <Modal isOpen={isOpen}>
      <Box maxWidth={"436px"} bg={"background"}>
        <RainbowBox height={"5px"} />
        {showTokenDetails ? (
          <TokenDetails
            toggleModal={toggleModal}
            toggleShowTokenDetails={toggleShowTokenDetails}
            token={token}
          />
        ) : (
          <SuccessBody
            toggleModal={toggleModal}
            toggleShowTokenDetails={toggleShowTokenDetails}
            shareNews={shareNews}
            giftTicket={giftTicket}
            token={token}
          />
        )}
      </Box>
    </Modal>
  );
}

export default TxSuccessModal;
