import React from "react";
import Debug from "./Debug";
import HeaderNav from "./HeaderNav";
import RainbowBox from "./RainbowBox";

import { Heading, Box, Flex, Button, Pill, Text, Link, Card } from "rimble-ui";

function Lesson3({ address, store, setRoute }, props) {
  return (
    <Box>
      <HeaderNav />
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
                  setRoute("Lesson2");
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
                  setRoute("Lesson4");
                }}
              >
                Next
              </Button.Text>
            </Box>
          </Flex>
          <Box style={{ textAlign: "center" }}>
            <Pill mb={3} color="primary">
              Lesson 3
            </Pill>
            <Heading.h1 mb={3} textAlign="center">
              Set user expectations
            </Heading.h1>
            <Text fontSize="5" textAlign="center">
              • A lot of this stuff is new or unfamiliar
            </Text>
            <Text fontSize="5" textAlign="center">
              • Don't ignore fees or time – explain them upfront
            </Text>
            <Text fontSize="5" textAlign="center">
              • Show you respect your users' time
            </Text>
            <Text fontSize="5" textAlign="center">
              • Avoid vague statements
            </Text>
          </Box>
          <Box
            mx={"auto"}
            maxWidth={"1000px"}
            mt={3}
            bg="#E8E8E8"
            borderColor={"#000000"}
          >
            <code>
              <center>Enter example code here if we want to show it</center>
            </code>
            <code>
              <center>Enter example code here if we want to show it</center>
            </code>
            <code>
              <center>Enter example code here if we want to show it</center>
            </code>
            <code>
              <center>Enter example code here if we want to show it</center>
            </code>
            <code>
              <center>Enter example code here if we want to show it</center>
            </code>
          </Box>
          <Box
            style={{ textAlign: "center" }}
            my={4}
            style={{ textAlign: "center" }}
          >
            <Button size={"medium"} mr={3} mb={3}>
              Show transaction confirmation
            </Button>
            <Button size={"medium"} mr={3} mb={3}>
              Start transaction
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

export default Lesson3;
