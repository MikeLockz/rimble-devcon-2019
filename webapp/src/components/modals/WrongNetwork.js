import React, { useState } from "react";
import { Card, Button, Flex, Box, Modal, Text, Heading } from "rimble-ui";

function WrongNetwork({ isOpen, toggleWrongNetwork }, props) {
  const [stackId, setStackId] = useState(null);

  return (
    <Modal isOpen={isOpen}>
      <Card maxWidth={"300px"}>
        <Flex flexDirection={"column"} justifyContent={"space-between"}>
          <Heading.h3>Switch to Rinkeby Network</Heading.h3>
          <Text my={3}>
            This dApp requires connection to the Rinkeby Network.
          </Text>
          <Button.Outline onClick={toggleWrongNetwork} width={[1]}>
            Close
          </Button.Outline>
        </Flex>
      </Card>
    </Modal>
  );
}

export default WrongNetwork;
