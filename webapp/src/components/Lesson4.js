import React from "react";
import Debug from "./Debug";

import { Heading, Box, Flex, Button, Text, Link } from "rimble-ui";

function Lesson4({ address, store }, props) {
  return (
    <Box>
      <Heading.h1>Lesson 4</Heading.h1>
      <Debug address={address} store={store} />
    </Box>
  );
}

export default Lesson4;
