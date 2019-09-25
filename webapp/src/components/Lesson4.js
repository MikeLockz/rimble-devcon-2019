import React from "react";
import RainbowBox from "./RainbowBox";
import { drizzleConnect } from "@drizzle/react-plugin";
import {
  toggleTxPendingModal,
  setCurrentTxId,
  addProgressAlert,
  updateProgressAlertRemainingTime,
  updateProgressAlertTxFee
} from "./../core/redux/actions";
import { Heading, Box, Flex, Button, Pill, Text, Link, Card } from "rimble-ui";

function Lesson4({
  setRoute,
  toggleTxPendingModal,
  setCurrentTxId,
  addProgressAlert,
  updateProgressAlertRemainingTime,
  updateProgressAlertTxFee
}) {
  const handleTxPendingModal = () => {
    addProgressAlert({
      token: {
        id: "DevConAttendance",
        name: "Conference ticket",
        ethPrice: "5.63",
        usdPrice: "1,000.00",
        image: "conference.png",
        successTitle: "You're going to DevCon!",
        successInstructions:
          "Just show this ticket token in your wallet when you arrive at the conference venue.",
        owner: "0xBEFa5641D7681950213b490596cc0e7c3d9f2eAa",
        previousOwner: "0xBEFa5641D7681950213b490596cc0e7c3d9f2eAa"
      }
    });
    updateProgressAlertRemainingTime({
      txHash: "0x123",
      content: {}
    });
    updateProgressAlertTxFee({
      txHash: "0x123",
      content: {}
    });
    setCurrentTxId(0);
    toggleTxPendingModal(true);
  };

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
                  setRoute("Lesson3");
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
                  setRoute("Lesson5");
                }}
              >
                Next
              </Button.Text>
            </Box>
          </Flex>
          <Box style={{ textAlign: "center" }}>
            <Pill mb={3} color="primary">
              Lesson 4
            </Pill>
            <Heading.h1 mb={3} textAlign="center">
              Provide "just-enough" feedback
            </Heading.h1>
            <Text fontSize="5" textAlign="center">
              • Mass market doesn't need technical details
            </Text>
            <Text fontSize="5" textAlign="center">
              • Use existing metaphors
            </Text>
            <Text fontSize="5" textAlign="center">
              • Users don't sit and watch transactions go through
            </Text>
            <Text fontSize="5" textAlign="center">
              • Don't force feedback on users
            </Text>
          </Box>
          <Box my={4} style={{ textAlign: "center" }}>
            <Button size={"medium"} mr={3} mb={3}>
              Show too much feedback
            </Button>
            <Button
              size={"medium"}
              mr={3}
              mb={3}
              onClick={handleTxPendingModal}
            >
              Start transaction
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
    toggleTxPendingModal: value => dispatch(toggleTxPendingModal(value)),
    setCurrentTxId: value => dispatch(setCurrentTxId(value)),
    addProgressAlert: value => dispatch(addProgressAlert(value)),
    updateProgressAlertRemainingTime: value =>
      dispatch(updateProgressAlertRemainingTime(value)),
    updateProgressAlertTxFee: value => dispatch(updateProgressAlertTxFee(value))
  };
};

export default drizzleConnect(Lesson4, null, mapDispatchToProps);
