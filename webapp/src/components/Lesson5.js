import React from "react";
import RainbowBox from "./RainbowBox";
import { drizzleConnect } from "@drizzle/react-plugin";
import {
  toggleTxSuccessModal,
  setCurrentTxId,
  addProgressAlert,
  updateProgressAlertRemainingTime,
  updateProgressAlertTxFee
} from "./../core/redux/actions";
import { Heading, Box, Flex, Button, Pill, Text, Card } from "rimble-ui";

function Lesson5({
  setRoute,
  toggleTxSuccessModal,
  setCurrentTxId,
  addProgressAlert,
  updateProgressAlertRemainingTime,
  updateProgressAlertTxFee
}) {
  const handleTxSuccessModal = () => {
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
    toggleTxSuccessModal(true);
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
                  setRoute("Lesson4");
                }}
              >
                Previous
              </Button.Text>
            </Box>
            <Box width={1 / 2} style={{ textAlign: "right" }}></Box>
          </Flex>
          <Box style={{ textAlign: "center" }}>
            <Pill mb={3} color="primary">
              Lesson 5
            </Pill>
            <Heading.h1 mb={3} textAlign="center">
              Design for next steps
            </Heading.h1>
            <Text fontSize="5" textAlign="center">
              • Consider the post-purchase experience
            </Text>
            <Text fontSize="5" textAlign="center">
              • It's not always clear what's next
            </Text>
            <Text fontSize="5" textAlign="center">
              • Understand the greater job or task the user wants to do
            </Text>
            <Text fontSize="5" textAlign="center">
              • Support the eco-system
            </Text>
          </Box>
          <Box my={4} style={{ textAlign: "center" }}>
            <Button
              size={"medium"}
              mr={3}
              mb={3}
              onClick={handleTxSuccessModal}
            >
              Show transaction success
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
    toggleTxSuccessModal: value => dispatch(toggleTxSuccessModal(value)),
    setCurrentTxId: value => dispatch(setCurrentTxId(value)),
    addProgressAlert: value => dispatch(addProgressAlert(value)),
    updateProgressAlertRemainingTime: value =>
      dispatch(updateProgressAlertRemainingTime(value)),
    updateProgressAlertTxFee: value => dispatch(updateProgressAlertTxFee(value))
  };
};

export default drizzleConnect(Lesson5, null, mapDispatchToProps);
