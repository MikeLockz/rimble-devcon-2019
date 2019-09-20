import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Box, Flex, Icon, Text, Button } from "rimble-ui";
import styled from "styled-components";

function ProgressAlert({ progressAlert, toggleProgressAlert }, props) {
  const [progress, setProgress] = useState(0); // percent of estimated time elapsed
  const [estimatedCompletionTime, setEstimatedCompletionTime] = useState(
    props.timeEstimate
  );
  const [remainingTime, setRemainingTime] = useState(
    progressAlert.timeEstimate
  ); // estimated seconds until complete
  const [timeString, setTimeString] = useState("calculating..."); // human-friendly time until complete
  const [delay] = useState(1000); // set "tick" time for timer
  const [status, setStatus] = useState("pending");
  // const [error, setError] = useState(props.error);
  const [error, setError] = useState({});

  useEffect(() => {
    // console.log("props", props);
    // console.log("progressAlert", props);
    setRemainingTime(progressAlert.timeEstimate);
    setEstimatedCompletionTime(progressAlert.timeEstimate);
    setError(progressAlert.error);
    setStatus(progressAlert.status);
    // checkStatus();
  }, [progressAlert]);

  const resetProgressAlert = () => {
    setProgress(0);
    setStatus("pending");
  };

  const checkStatus = () => {
    // console.log("Object.keys(error).length", Object.keys(error).length);
    // if (Object.keys(error).length !== 0) {
    //   setStatus("error");
    // } else if (remainingTime === 0) {
    //   setStatus("success");
    // } else {
    //   setStatus("pending");
    // }
    // console.log("status", status);
  };

  // Determines the amount of time remaining
  const calculateTimeRemaining = () => {
    setRemainingTime(remainingTime - 1);
    timeToString();
  };

  // Reads the value of RemainingTime and outputs a hunman-friendly string of time remaining
  const timeToString = () => {
    if (remainingTime === null) {
      return;
    }
    const now = Date.now();

    const timeObject = new Date();
    const estimatedCompletion = new Date(timeObject.getTime() + remainingTime);

    let diff = now - estimatedCompletion;
    diff = Math.abs(Math.floor(diff));

    const days = Math.floor(diff / (24 * 60 * 60));
    let leftSec = diff - days * 24 * 60 * 60;

    const hrs = Math.floor(leftSec / (60 * 60));
    leftSec = leftSec - hrs * 60 * 60;

    const min = Math.floor(leftSec / 60);
    leftSec = leftSec - min * 60;

    if (min > 1) {
      setTimeString("~" + min + " minutes");
    } else if (min === 1) {
      setTimeString("~ 1 minute remaining");
    } else if (leftSec > 30) {
      setTimeString("less than 1 minute remaining");
    } else {
      setTimeString("less than 30 seconds remaining");
    }
  };

  // Determines percent complete based on time remaining and estimated time
  const calculatePercentComplete = () => {
    // console.log(
    //   "calculatePercentComplete: progress, remainingTime",
    //   progress,
    //   remainingTime,
    //   status
    // );

    const currentProgress = Math.round(
      ((estimatedCompletionTime - remainingTime) / estimatedCompletionTime) *
        100
    );
    setProgress(currentProgress);
  };

  // Calls functions to update time and percent values
  const interval = useInterval(
    () => {
      if (status !== "error") {
        calculateTimeRemaining();
        calculatePercentComplete();
        checkStatus();
      }
    },
    remainingTime >= 0 ? delay : null // will stop the timer when remaining time is 0
  );

  return (
    <StyledProgressAlert>
      <Box>
        <ProgressBar
          className={status}
          height={"8px"}
          width={status === "pending" ? progress + "%" : "100%"}
        />
      </Box>
      <Flex p={3} alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems={"center"}>
          {progress <= 100 && status === "pending" && (
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

          {status === "success" && (
            <Flex
              bg="#00BF6F"
              borderRadius={"50%"}
              height={"32px"}
              width={"32px"}
              justifyContent={"center"}
              alignItems={"center"}
              mr={3}
            >
              <Icon name="Check" />
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
              {status === "pending" ? timeString : null}
              {status === "success" ? "Complete!" : null}
            </Text>
          </Flex>
        </Flex>

        {status === "error" && (
          <Button.Outline
            mainColor={"white"}
            onClick={e => {
              toggleProgressAlert(progressAlert.id);
              // resetProgressAlert();
            }}
          >
            Undo
          </Button.Outline>
        )}

        {status !== "pending" && (
          <Button
            mainColor="primary"
            p={0}
            onClick={e => {
              toggleProgressAlert(progressAlert.id);
              // resetProgressAlert();
            }}
          >
            <Icon name="Close" />
          </Button>
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

const ProgressBar = styled(Box)`
  & {
    transition: all 0.15s ease;
    background: linear-gradient(
      270deg,
      #efa59e 0%,
      #f5ccd1 17.19%,
      #f7ceb3 33.85%,
      #eccfa5 52.08%,
      #b9d8ae 68.23%,
      #97d6e3 84.37%,
      #9fb1e8 100%
    );
    transform: matrix(-1, 0, 0, 1, 0, 0);
  }
  &.error {
    background: ${props => props.theme.colors.danger};
  }
  &.success {
    background: ${props => props.theme.colors.success};
  }
`;

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
