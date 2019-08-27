import React from "react";
import ReactDOM from "react-dom";
import {
  Heading,
  Box,
  Flex,
  Button,
  Field,
  Input,
  Select,
  Card,
  Text,
  Link,
  Checkbox,
  Image
} from "rimble-ui";

function App() {
  return (
    <Box className="App">
      <Flex justifyContent={"flex-end"} p={3}>
        <Button>Connect</Button>
      </Flex>
      <Box maxWidth={"1180px"} p={3} mx={"auto"}>
        <Heading.h1>Buy Tickets</Heading.h1>

        <Text my={4} />
        <Flex justifyContent={"space-between"}>
          <Card width={"auto"}>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              flexDirection={"column"}
            >
              <Heading.h3 mb={3}>Attendance</Heading.h3>
              <Image height={"200px"} width={"200px"} mb={3} />
              <Button>Buy</Button>
            </Flex>
          </Card>

          <Card width={"auto"}>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              flexDirection={"column"}
            >
              <Heading.h3 mb={3}>Food</Heading.h3>
              <Image height={"200px"} width={"200px"} mb={3} />
              <Button>Buy</Button>
            </Flex>
          </Card>

          <Card width={"auto"}>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              flexDirection={"column"}
            >
              <Heading.h3 mb={3}>Parties</Heading.h3>
              <Image height={"200px"} width={"200px"} mb={3} />
              <Button>Buy</Button>
            </Flex>
          </Card>
        </Flex>
        <Heading.h4 mt={4} mb={2}>
          About
        </Heading.h4>

        <Text mb={3} />

        <Link href="https://rimble.consensys.design" target="_blank">
          Learn more about Rimble
        </Link>
      </Box>
    </Box>
  );
}

export default App;
