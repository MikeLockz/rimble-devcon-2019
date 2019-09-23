import React from "react";
import RainbowBox from "./RainbowBox";
import { drizzleConnect } from "@drizzle/react-plugin";
import { toggleTxSuccessModal } from "../core/redux/actions";
import { Heading, Box, Flex, Button, Pill, Image, Card } from "rimble-ui";
import diagramHeading from "./../images/rimble-ethereum-transaction-flow-headers.png";
import diagramSwimlanes from "./../images/rimble-ethereum-transaction-flow-swimlanes.png";

function Diagram({ setRoute, toggleTxSuccessModal }) {
  return (
    <Box zIndex={"9"}>
      <Box maxWidth={"1180px"} p={3} mx={"auto"}>
        <Card borderRadius={"15px 15px 15px 15px"} p={0} mx={2} my={2}>
          <RainbowBox
            borderRadius={"15px 15px 0px 0px"}
            height={"10px"}
            borderColor={"#d6d6d6"}
          />
          <Box my={2} style={{ textAlign: "center" }}>
            <Image src={diagramHeading} />
            <Box height={"50vh"} overflow={"scroll"}>
              <Image src={diagramSwimlanes} />
            </Box>
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
    toggleTxSuccessModal: value => dispatch(toggleTxSuccessModal(value))
  };
};

export default drizzleConnect(Diagram, null, mapDispatchToProps);
