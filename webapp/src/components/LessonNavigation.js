import React from "react";
import { Flex, Box, Link } from "rimble-ui";

const Navigation = ({ setRoute }) => {
  return (
    <Flex>
      <Box mx={3}>
        <Link
          href
          onClick={() => {
            setRoute("Home");
          }}
        >
          Home
        </Link>
      </Box>
      <Box mx={3}>
        <Link
          href
          onClick={() => {
            setRoute("Lesson1");
          }}
        >
          Lesson 1
        </Link>
      </Box>
      <Box mx={3}>
        <Link
          href
          onClick={() => {
            setRoute("Lesson2");
          }}
        >
          Lesson 2
        </Link>
      </Box>
      <Box mx={3}>
        <Link
          href
          onClick={() => {
            setRoute("Lesson3");
          }}
        >
          Lesson 3
        </Link>
      </Box>
      <Box mx={3}>
        <Link
          href
          onClick={() => {
            setRoute("Lesson4");
          }}
        >
          Lesson 4
        </Link>
      </Box>
      <Box mx={3}>
        <Link
          href
          onClick={() => {
            setRoute("Lesson5");
          }}
        >
          Lesson 5
        </Link>
      </Box>
    </Flex>
  );
};

export default Navigation;
