import React from "react";
import Debug from "./Debug";
import HeaderNav from "./HeaderNav";
import RainbowBox from "./RainbowBox"


import { Heading, Box, Flex, Button, Pill, Text, Link, Card } from "rimble-ui";

function Lesson5({ address, store }, props) {
  return (
    <Box>
      <HeaderNav />
      <Box maxWidth={"1180px"} p={3} mx={"auto"}>
        <Card borderRadius={"15px 15px 15px 15px"} p={0} mx={2} my={2}>
          <RainbowBox borderRadius={"15px 15px 0px 0px"} height={"10px"} borderColor={"#d6d6d6"}/>
          <Flex alignItems="center">
            <Box width={1/2} style={{ textAlign: 'left' }}>
              <Button.Text ml={3} mt={3}>Previous</Button.Text>
            </Box>
            <Box width={1/2} style={{ textAlign: 'right' }}>
              <Button.Text mr={3} mt={3}>Next</Button.Text>
            </Box>
          </Flex>
          <Box style={{ textAlign: 'center' }}>
          <Pill mb={3} color="primary">Lesson 5</Pill>
            <Heading.h1 mb={3} textAlign="center">Design for next steps</Heading.h1>
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
          <Box my={4} style={{ textAlign: 'center' }}>
            <Button size={"medium"} mr={3} mb={3}>
              Show transaction success
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

export default Lesson5;