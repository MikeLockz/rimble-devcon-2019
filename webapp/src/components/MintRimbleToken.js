import React, { useState, useEffect } from "react";
import { Box, Text } from "rimble-ui";

function MintRimbleToken(props) {
  const [drizzle, setDrizzle] = useState(props.drizzle);
  const [drizzleState, setDrizzleState] = useState(props.drizzleState);
  const [dataKey, setDataKey] = useState(null);
  const [rimbleToken, setRimbleToken] = useState(null);
  const [tokenName, setTokenName] = useState(null);

  useEffect(() => {
    const contract = drizzle.contracts.RimbleToken;

    const dataKey = contract.methods["name"].cacheCall();
    setDataKey(dataKey);
  });

  useEffect(() => {
    setDrizzleState(props.drizzleState);

    if (props.drizzleState) {
      // get the contract state from drizzleState
      const RimbleTokenStore = props.drizzleState.contracts;

      // using the saved `dataKey`, get the variable we're interested in
      setRimbleToken(RimbleTokenStore.RimbleToken[dataKey]);

      if (RimbleTokenStore.RimbleToken.name["0x0"]) {
        setTokenName(RimbleTokenStore.RimbleToken.name["0x0"].value);
      }
    }
  }, [props.drizzleState]);

  // if it exists, then we display its value
  return (
    <Box py={3}>
      <Text>Purchasing: {tokenName}</Text>
    </Box>
  );
}

export default MintRimbleToken;
