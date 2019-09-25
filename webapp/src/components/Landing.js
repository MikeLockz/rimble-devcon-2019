import React, { useState, useEffect } from "react";
import styled from "styled-components";

import BuyCardContainer from "./BuyCard.container";

import ConnectionBanner from "@rimble/connection-banner";

import { Box, Flex, Text, Link } from "rimble-ui";

import backgroundImage from "./../images/background.jpg";
import tokenDetails from "./../tokenDetails";
import appConfig from "../appConfig";

const BodyBox = styled(Box)`
  background: no-repeat center center url(${backgroundImage}) #fffff8;
`;

function Landing({ drizzle, drizzleState, store }, props) {
  const [currentNetwork, setCurrentNetwork] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (drizzleState) {
      setAddress(drizzleState.accounts["0"]);
      setCurrentNetwork(drizzleState.web3.networkId);
    }
    if (!currentNetwork) {
      getNetwork();
    }
  }, [drizzleState]);

  const getNetwork = () => {
    window.web3.version.getNetwork((error, networkId) => {
      setCurrentNetwork(parseInt(networkId));
    });
  };

  return (
    <Box>
      {!drizzleState && (
        <Box m={4}>
          <ConnectionBanner
            currentNetwork={currentNetwork}
            requiredNetwork={appConfig.requiredNetwork}
            onWeb3Fallback={null}
          />
        </Box>
      )}
      <Box maxWidth={"1180px"} p={3} mx={"auto"}>
        <Text my={4} />
        <Flex justifyContent={"space-between"} mx={-3} flexWrap={"wrap"}>
          {tokenDetails.map(token => {
            return (
              <BuyCardContainer
                token={token}
                address={address}
                key={token.id}
              />
            );
          })}
        </Flex>
        <Flex justifyContent={"flex-end"}>
          <Link href="https://rimble.consensys.design" target="_blank">
            Learn more about Rimble
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}

export default Landing;
