import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Box, Flex, Icon, Text, Button, Image } from "rimble-ui";
import styled from "styled-components";
import transferringIcon from "./multipleTxIcon.svg";
import ProgressBar from "./ProgressBar";

function ProgressAlert({
  progressAlert,
  toggleProgressAlert,
  getPercentComplete,
  getTimeToCompletionString
}) {
  const [progress, setProgress] = useState(0); // percent of estimated time elapsed // KEEP!
  const [estimatedCompletionTime, setEstimatedCompletionTime] = useState(null); // keep
  const [delay] = useState(1000); // set "tick" time for timer

  const { status } = progressAlert;
  const { startTime, timeEstimate } = progressAlert.remainingTime;

  useEffect(() => {
    // checkStatus();
  }, [progressAlert]);

  // Calls functions to update time and percent values
  useInterval(
    () => {
      const percentComplete = getPercentComplete({ startTime, timeEstimate });
      console.log("percentComplete", percentComplete);
      setProgress(percentComplete);
      const timeString = getTimeToCompletionString({ startTime, timeEstimate });
      console.log("timeString", timeString);
      setEstimatedCompletionTime(timeString);
    },
    !progressAlert.completed && progress < 100 && status === "pending"
      ? delay
      : null // how to know when to stop timer?
  );

  return (
    <StyledProgressAlert>
      <Box>
        <ProgressBar className={status} height={"8px"} percent={progress} />
      </Box>
      <Flex p={3} alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems={"center"}>
          {status === "pending" && (
            <Flex
              bg="#DADADA"
              borderRadius={"50%"}
              height={"32px"}
              width={"32px"}
              justifyContent={"center"}
              alignItems={"center"}
              mr={3}
            >
              <Text fontSize={"12px"}>{progress}%</Text>
            </Flex>
          )}

          {status === "error" && (
            <Flex
              bg="#E94E4A"
              borderRadius={"50%"}
              height={"32px"}
              width={"32px"}
              justifyContent={"center"}
              alignItems={"center"}
              mr={3}
            >
              <Icon name="Error" />
            </Flex>
          )}

          <Flex flexDirection={"column"}>
            <Text fontWeight={"600"} color={"#fff"}>
              Sending you a {progressAlert.content.token.name}
            </Text>

            <Text fontSize={"12px"} color={"#BCBCBC"}>
              {status === "error"
                ? "Error: " + progressAlert.content.error
                : null}
              {status === "pending" ? estimatedCompletionTime : null}
              {status === "success" ? "Complete!" : null}
            </Text>
          </Flex>
        </Flex>

        {status === "error" && (
          <Button.Outline
            mainColor={"white"}
            onClick={e => {
              toggleProgressAlert(progressAlert.id);
            }}
          >
            Acknowledge
          </Button.Outline>
        )}
      </Flex>
    </StyledProgressAlert>
  );
}

const StyledProgressAlert = styled(Box)`
  & {
    background: ${props => props.theme.colors.primary};
  }
`;

// Duplicated in TxActivityModal so that each component can manage progress
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

export const MultipleProgressAlerts = ({ count, toggleTxActivityModal }) => {
  return (
    <StyledProgressAlert>
      <Flex p={3} alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems={"center"}>
          <Flex
            height={"32px"}
            width={"32px"}
            justifyContent={"center"}
            alignItems={"center"}
            mr={3}
          >
            <Image src={transferringIcon} />
          </Flex>

          <Flex flexDirection={"column"}>
            <Text fontWeight={"600"} color={"#fff"}>
              Transferring {count} tickets
            </Text>
          </Flex>
        </Flex>

        <Button.Outline
          mainColor={"white"}
          onClick={() => {
            toggleTxActivityModal(true);
          }}
        >
          Track
        </Button.Outline>
      </Flex>
    </StyledProgressAlert>
  );
};

ProgressAlert.propTypes = {
  progressAlert: PropTypes.shape({
    message: PropTypes.string,
    timeEstime: PropTypes.number,
    error: PropTypes.shape({
      message: PropTypes.string
    }),
    transaction: PropTypes.shape({
      txHash: PropTypes.string
    })
  }),
  toggleProgressAlert: PropTypes.func
};

export default ProgressAlert;
