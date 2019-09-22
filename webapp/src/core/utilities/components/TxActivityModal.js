import React from "react";
import { Modal, Box, Button, Flex, Heading, Text, Card } from "rimble-ui";
import ProgressBar from "./ProgressBar";

const Transaction = ({ transaction }) => {
  console.log("transaction", transaction);
  return (
    <Box px={3} py={2}>
      <Text fontWeight={"bold"}>{transaction.content.token.name}</Text>
      <ProgressBar
        percent={transaction.remainingTime.percent}
        height={"10px"}
      />
      <Flex justifyContent={"space-between"} mt={2} alignItems={"center"}>
        <Box>
          <Text fontSize={"14px"}>
            Transferring your ticket to your account...
          </Text>
          <Text fontSize={"14px"} color={"pink"}>
            {transaction.remainingTime.string}
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
          <Text fontSize={"12px"}>{transaction.remainingTime.percent}%</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

function TxActivityModal(
  { isOpen, toggleModal, address, progressAlerts, transactions },
  props
) {
  console.log("transactions", transactions);
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
            {transactions && transactions.length
              ? transactions.map((transaction, index) => {
                  return (
                    <Transaction
                      transaction={transaction}
                      key={`pat-${transaction.id}`}
                    />
                  );
                })
              : null}
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
