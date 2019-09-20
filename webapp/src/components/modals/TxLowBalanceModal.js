import React from "react";
import { Card, Button, Flex, Modal, Text, Heading } from "rimble-ui";

function TxLowBalanceModal({ isOpen, toggleModal }) {
  return (
    <Modal isOpen={isOpen}>
      <Card maxWidth={"300px"}>
        <Flex flexDirection={"column"} justifyContent={"space-between"}>
          <Heading.h3>Low Balance</Heading.h3>
          <Text my={3}>You currently do not have enough to buy.</Text>
          <Button>Get more ETH</Button>
          <Button.Outline onClick={toggleModal} width={[1]}>
            Close
          </Button.Outline>
        </Flex>
      </Card>
    </Modal>
  );
}

export default TxLowBalanceModal;
