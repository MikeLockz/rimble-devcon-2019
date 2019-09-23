import React from "react";
import styled from "styled-components";
import { Flex, Box, Link } from "rimble-ui";

const StyledLinkContainer = styled(Box)`
  background: ${props =>
    props.routeName === props.route ? props.theme.colors.primary : "white"};
  a,
  a:hover {
    color: ${props =>
      props.routeName === props.route ? "white" : props.theme.colors.primary};
    text-decoration: none;
  }
`;

const Navigation = ({ route, setRoute }) => {
  return (
    <Flex justifyContent={"center"} p={3}>
      <StyledLinkContainer
        mx={3}
        routeName={"Home"}
        route={route}
        borderRadius={1}
      >
        <Link
          href
          p={3}
          onClick={() => {
            setRoute("Home");
          }}
        >
          Home
        </Link>
      </StyledLinkContainer>
      <StyledLinkContainer
        mx={3}
        routeName={"Diagram"}
        route={route}
        borderRadius={1}
      >
        <Link
          href
          p={3}
          onClick={() => {
            setRoute("Diagram");
          }}
        >
          Diagram
        </Link>
      </StyledLinkContainer>
      <StyledLinkContainer
        mx={3}
        routeName={"Lesson1"}
        route={route}
        borderRadius={1}
      >
        <Link
          href
          p={3}
          onClick={() => {
            setRoute("Lesson1");
          }}
        >
          Lesson 1
        </Link>
      </StyledLinkContainer>
      <StyledLinkContainer
        mx={3}
        routeName={"Lesson2"}
        route={route}
        borderRadius={2}
      >
        <Link
          href
          p={3}
          onClick={() => {
            setRoute("Lesson2");
          }}
        >
          Lesson 2
        </Link>
      </StyledLinkContainer>
      <StyledLinkContainer
        mx={3}
        routeName={"Lesson3"}
        route={route}
        borderRadius={1}
      >
        <Link
          href
          p={3}
          onClick={() => {
            setRoute("Lesson3");
          }}
        >
          Lesson 3
        </Link>
      </StyledLinkContainer>
      <StyledLinkContainer
        mx={3}
        routeName={"Lesson4"}
        route={route}
        borderRadius={1}
      >
        <Link
          href
          p={3}
          onClick={() => {
            setRoute("Lesson4");
          }}
        >
          Lesson 4
        </Link>
      </StyledLinkContainer>
      <StyledLinkContainer
        mx={3}
        routeName={"Lesson5"}
        route={route}
        borderRadius={1}
      >
        <Link
          href
          p={3}
          onClick={() => {
            setRoute("Lesson5");
          }}
        >
          Lesson 5
        </Link>
      </StyledLinkContainer>
    </Flex>
  );
};

export default Navigation;
