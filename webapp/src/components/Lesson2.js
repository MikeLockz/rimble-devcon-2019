import React from "react";
import RainbowBox from "./RainbowBox";
import { drizzleConnect } from "@drizzle/react-plugin";
import {
  toggleWrongNetworkModal,
  toggleTxSuccessModal
} from "./../core/redux/actions";
import { Heading, Box, Flex, Button, Pill, Text, Card } from "rimble-ui";

function Lesson2({ setRoute, toggleWrongNetworkModal, toggleTxSuccessModal }) {
  return (
    <Box>
      <Box maxWidth={"1180px"} p={3} mx={"auto"}>
        <Card borderRadius={"15px 15px 15px 15px"} p={0} mx={2} my={2}>
          <RainbowBox
            borderRadius={"15px 15px 0px 0px"}
            height={"10px"}
            borderColor={"#d6d6d6"}
          />
          <Flex alignItems="center">
            <Box width={1 / 2} style={{ textAlign: "left" }}>
              <Button.Text
                ml={3}
                mt={3}
                onClick={() => {
                  setRoute("Lesson1");
                }}
              >
                Previous
              </Button.Text>
            </Box>
            <Box width={1 / 2} style={{ textAlign: "right" }}>
              <Button.Text
                mr={3}
                mt={3}
                onClick={() => {
                  setRoute("Lesson3");
                }}
              >
                Next
              </Button.Text>
            </Box>
          </Flex>
          <Box style={{ textAlign: "center" }}>
            <Pill mb={3} color="primary">
              Lesson 2
            </Pill>
            <Heading.h1 mb={3} textAlign="center">
              Prevention is priority
            </Heading.h1>
            <Text fontSize="5" textAlign="center">
              • Anticipate and design for transaction errors throughout your
              dApp
            </Text>
            <Text fontSize="5" textAlign="center">
              • Transaction failure due to fees "feels like a scam"
            </Text>
            <Text fontSize="5" textAlign="center">
              • What information does a user need to avoid errors?
            </Text>
            <Text fontSize="5" textAlign="center">
              • Friction can help increase trust and confidence
            </Text>
          </Box>
          <Box my={4} style={{ textAlign: "center" }}>
            <Button
              size={"medium"}
              mr={3}
              mb={3}
              onClick={() => {
                toggleWrongNetworkModal(true);
              }}
            >
              Show wrong network modal
            </Button>
            <Button
              size={"medium"}
              mr={3}
              mb={3}
              onClick={() => {
                toggleTxSuccessModal(true);
              }}
            >
              Show transaction confirmation
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

/*
 * Export connected component.
 */

const mapDispatchToProps = dispatch => {
  return {
    toggleWrongNetworkModal: value => dispatch(toggleWrongNetworkModal(value)),
    toggleTxSuccessModal: value => dispatch(toggleTxSuccessModal(value))
  };
};

export default drizzleConnect(Lesson2, null, mapDispatchToProps);
