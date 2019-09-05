import React, { useState, useEffect } from "react";
import { Text, Box, Icon, Button, Flex, Image } from "rimble-ui";
import styled from "styled-components";
import logo from "../images/rimble-logo.svg";

const StyledHeader = styled(Flex)`
  border-bottom: 1px solid #d6d6d6;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.01);
`;

const shortenAddress = address => {
  address = address.slice(0, 5) + "..." + address.slice(address.length - 4);
  return address;
};

const prettyBalance = balance => {
  // balance = drizzle.web3.utils.fromWei(balance, "ether");
  return balance;
};

function HeaderNav({ drizzleState, drizzle }) {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (drizzleState) {
      // update account
      setAccount(drizzleState.accounts["0"]);
      // update balance
      setBalance(drizzleState.accountBalances[drizzleState.accounts["0"]]);
    }
  }, [drizzleState]);

  return (
    <StyledHeader justifyContent={"space-between"} p={3} bg={"white"}>
      <Image src={logo} />
      {account ? (
        <Flex>
          <Flex alignItems={"center"} mr={4}>
            <Icon size={"14px"} color={"primary"} name={"Star"} mr={2} />
            <Box>
              <Text
                fontWeight={600}
                fontSize={"12px"}
                color={"#2B2C36"}
                lineHeight={1}
              >
                Connected as
              </Text>
              <Text fontSize={1} fontColor={"primary"}>
                {shortenAddress(account)}
              </Text>
            </Box>
          </Flex>

          <Flex alignItems={"center"}>
            <Icon size={"14px"} color={"primary"} name={"Star"} mr={2} />
            <Box>
              <Text
                fontWeight={600}
                fontSize={"12px"}
                color={"#2B2C36"}
                lineHeight={1}
              >
                Balance
              </Text>
              <Text fontSize={1} fontColor={"primary"}>
                {drizzle.web3.utils.fromWei(balance, "ether")} ETH
              </Text>
            </Box>
          </Flex>
        </Flex>
      ) : (
        <Button size={"small"}>Connect</Button>
      )}
    </StyledHeader>
  );
}

export default HeaderNav;
