import React from "react";
import { Modal, Box, Button, Flex, Heading, Text, Card } from "rimble-ui";
import ProgressBar from "./ProgressBar";

const Transaction = ({ transaction }) => {
  return (
    <Box px={3} py={2}>
      <Text fontWeight={"bold"}>Ticket #1</Text>
      <ProgressBar width={"100%"} height={"10px"} />
      <Flex justifyContent={"space-between"} mt={2} alignItems={"center"}>
        <Box>
          <Text fontSize={"14px"}>
            Transferring your ticket to your account...
          </Text>
          <Text fontSize={"14px"} color={"pink"}>
            Less than 2 minutes remaining
          </Text>
        </Box>
        <Flex
          bg={"pink"}
          borderRadius={"50%"}
          height={"32px"}
          width={"32px"}
          justifyContent={"center"}
          alignItems={"center"}
          ml={3}
        >
          <Text fontSize={"12px"}>{30}%</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

function TxActivityModal(
  { isOpen, toggleModal, address, progressAlerts },
  props
) {
  return (
    <Modal width={"auto"} m={3} minWidth={"300px"} isOpen={isOpen}>
      <Card borderRadius={1} maxWidth={"436px"}>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={"column"}
        >
          <Heading.h3 mb={3}>Activity</Heading.h3>

          <Flex flexDirection={"column"} my={4}>
            <Transaction transaction={""} />
          </Flex>

          <Button.Outline
            onClick={() => {
              toggleModal(isOpen);
            }}
            width={[1]}
          >
            Close
          </Button.Outline>
        </Flex>
      </Card>
    </Modal>
  );
}

export default TxActivityModal;
