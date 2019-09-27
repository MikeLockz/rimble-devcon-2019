import React from "react";
import { Box, Button } from "rimble-ui";
import { drizzleConnect } from "@drizzle/react-plugin";
import EthToFiat from "./components/EthToFiat";

const ExternalDataDebug = ({ fetchEthPrice }) => {
  const handleFetchEthPrice = () => {
    // call saga?
    fetchEthPrice("usd");
  };
  return (
    <Box>
      <Button onClick={handleFetchEthPrice}>fetchEthPrice</Button>
      <EthToFiat eth={1} />
    </Box>
  );
};

/*
 * Export connected component.
 */
const mapStateToProps = state => {
  return {
    externalData: state.externalData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchEthPrice: value =>
      dispatch({ type: "RIMBLE_FETCH_ETH_PRICE", payload: { value } })
  };
};

export default drizzleConnect(
  ExternalDataDebug,
  mapStateToProps,
  mapDispatchToProps
);
