import React from "react";
import RainbowBox from "./RainbowBox";
import { drizzleConnect } from "@drizzle/react-plugin";
import {
  toggleTxStartModal,
  toggleTxPendingModal,
  toggleTxLowBalanceModal
} from "./../core/redux/actions";
import { Heading, Box, Button, Text, Card, Pill } from "rimble-ui";

function Lesson1({
  setRoute,
  toggleTxStartModal,
  toggleTxPendingModal,
  toggleTxLowBalanceModal
}) {
  return (
    <Box>
      <Box maxWidth={"1180px"} p={3} mx={"auto"}>
        <Card borderRadius={"15px 15px 15px 15px"} p={0} mx={2} my={2}>
          <RainbowBox
            borderRadius={"15px 15px 0px 0px"}
            height={"10px"}
            borderColor={"#d6d6d6"}
          />
          <Box style={{ textAlign: "right" }}>
            <Button.Text
              mt={3}
              mr={3}
              onClick={() => {
                setRoute("Lesson2");
              }}
            >
              Next
            </Button.Text>
          </Box>
          <Box style={{ textAlign: "center" }}>
            <Pill color="primary" mb={3}>
              Lesson 1
            </Pill>
            <Heading.h1 mb={3} textAlign="center">
              Don't rely on wallet UX
            </Heading.h1>
            <Text fontSize="5" textAlign="center">
              • Wallets can't be specific
            </Text>
            <Text fontSize="5" textAlign="center">
              • It's not in their remit to make your dApp usable
            </Text>
            <Text fontSize="5" textAlign="center">
              • Your messaging can speak to the task at hand
            </Text>
            <Text fontSize="5" textAlign="center">
              • Phrase your communication around what the user is doing
            </Text>
          </Box>
          <Box my={4} style={{ textAlign: "center" }}>
            <Button
              size={"medium"}
              mr={3}
              mb={3}
              onClick={() => {
                toggleTxStartModal(true);
              }}
            >
              Show transaction confirmation
            </Button>
            <Button
              size={"medium"}
              mr={3}
              mb={3}
              onClick={() => {
                toggleTxPendingModal(true);
              }}
            >
              Show transaction sending
            </Button>
            <Button
              size={"medium"}
              mr={3}
              mb={3}
              onClick={() => {
                toggleTxLowBalanceModal(true);
              }}
            >
              Show No ETH warning
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
    toggleTxStartModal: value => dispatch(toggleTxStartModal(value)),
    toggleTxPendingModal: value => dispatch(toggleTxPendingModal(value)),
    toggleTxLowBalanceModal: value => dispatch(toggleTxLowBalanceModal(value))
  };
};

export default drizzleConnect(Lesson1, null, mapDispatchToProps);
