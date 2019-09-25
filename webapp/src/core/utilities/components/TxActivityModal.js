import React, { useRef, useEffect, useState } from "react";
import { Modal, Box, Button, Flex, Heading, Text, Card } from "rimble-ui";
import ProgressBar from "./ProgressBar";
import ProgressPercentCircle from "./ProgressPercentCircle";

const Transaction = ({ transaction, getPercentComplete }) => {
  const [progress, setProgress] = useState(null); // percent of timer that has elapsed
  const [delay] = useState(1000); // set "tick" time for timer

  console.log("txActivityModal transaction", transaction);

  // Calls functions to update time and percent values
  const interval = useInterval(
    () => {
      const { startTime, timeEstimate } = transaction.remainingTime;
      const percentComplete = getPercentComplete({ startTime, timeEstimate });
      console.log("percentComplete", percentComplete);
      setProgress(percentComplete);
    },
    !transaction.completed && transaction.status === "pending" && progress < 100
      ? delay
      : null // how to know when to stop timer?
  );

  return (
    <Box px={3} py={2}>
      <Text fontWeight={"bold"}>{transaction.content.token.name}</Text>
      <ProgressBar percent={progress} height={"10px"} />
      <Flex justifyContent={"space-between"} mt={2} alignItems={"center"}>
        <Box mr={3}>
          <Text fontSize={"14px"}>
            Transferring your ticket to your account...
          </Text>
          <Text fontSize={"14px"} color={"pink"}>
            {transaction.remainingTime.string}
          </Text>
        </Box>

        <ProgressPercentCircle percent={progress} ml={3} />
      </Flex>
    </Box>
  );
};

function TxActivityModal(
  {
    isOpen,
    toggleModal,
    address,
    progressAlerts,
    transactions,
    getPercentComplete
  },
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
            {transactions && transactions.length
              ? transactions.map((transaction, index) => {
                  return (
                    <Transaction
                      transaction={transaction}
                      key={`pat-${transaction.id}`}
                      getPercentComplete={getPercentComplete}
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

// Duplicated between ProgressAlert and txActivityModal so that each component can start/stop timers independently
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default TxActivityModal;
