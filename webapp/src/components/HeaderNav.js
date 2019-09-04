import React, { useState, useEffect } from "react";
import { Button, Flex, Image } from "rimble-ui";
import styled from "styled-components";
import logo from "../images/rimble-logo.svg";

const StyledHeader = styled(Flex)`
  border-bottom: 1px solid #d6d6d6;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.01);
`;

function HeaderNav(props) {
  return (
    <StyledHeader justifyContent={"space-between"} p={3} bg={"white"}>
      <Image src={logo} />
      <Button size={"small"}>Connect</Button>
    </StyledHeader>
  );
}

export default HeaderNav;
