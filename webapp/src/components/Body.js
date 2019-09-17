import React, { useState, useEffect } from "react";
import styled from "styled-components";

import HeaderNav from "./HeaderNav";
import BuyCard from "./BuyCard";
import ConnectionBanner from "@rimble/connection-banner";
import ProgressAlertUtil from "./../core/utilities/ProgressAlertUtil";
import Debug from "./Debug";

import { Heading, Box, Flex, Button, Text, Link } from "rimble-ui";

import backgroundImage from "./../images/background.jpg";
import tokenDetails from "./../tokenDetails";

const BodyBox = styled(Box)`
  background: no-repeat center center url(${backgroundImage}) #fffff8;
`;

function Body({ drizzle, drizzleState, appConfig, store }, props) {
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

  const preflightCheck = callback => {
    if (currentNetwork !== appConfig.requiredNetwork) {
      // toggleWrongNetwork();
      return;
    }
    callback();
  };

  return (
    <BodyBox height={"100%"}>
      <Box>
        <HeaderNav
          drizzle={drizzle}
          drizzleState={drizzleState}
          preflightCheck={preflightCheck}
        />
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
                <BuyCard
                  drizzle={drizzle}
                  drizzleState={drizzleState}
                  token={token}
                  key={token.id}
                  preflightCheck={preflightCheck}
                />
              );
            })}
          </Flex>
          <Heading.h4 mt={4} mb={2}>
            About
          </Heading.h4>

          <Text mb={3} />

          <Link href="https://rimble.consensys.design" target="_blank">
            Learn more about Rimble
          </Link>

          <Debug address={address} store={store} />
        </Box>
      </Box>
      <ProgressAlertUtil drizzleState={drizzleState} />
    </BodyBox>
  );
}

export default Body;
