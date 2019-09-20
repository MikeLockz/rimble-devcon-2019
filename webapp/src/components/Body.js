import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Landing from "./Landing";
import Lesson1 from "./Lesson1";
import Lesson2 from "./Lesson2";
import Lesson3 from "./Lesson3";
import Lesson4 from "./Lesson4";
import Lesson5 from "./Lesson5";

import LessonNavigation from "./LessonNavigation";
import ProgressAlertUtil from "./../core/utilities/ProgressAlertUtil";
import ProgressAlertContainer from "../core/utilities/ProgressAlert.container";

import { Box } from "rimble-ui";

import backgroundImage from "./../images/background.jpg";

const BodyBox = styled(Box)`
  background: no-repeat center center url(${backgroundImage}) #fffff8;
`;

function Body({ drizzle, drizzleState, store }) {
  const [address, setAddress] = useState(null);
  const [route, setRoute] = useState("Home");

  useEffect(() => {
    if (drizzleState) {
      setAddress(drizzleState.accounts["0"]);
    }
  }, [drizzleState]);

  return (
    <BodyBox height={"100%"}>
      {
        {
          Home: (
            <Landing
              drizzle={drizzle}
              drizzleState={drizzleState}
              store={store}
            />
          ),
          Lesson1: (
            <Lesson1 address={address} store={store} setRoute={setRoute} />
          ),
          Lesson2: (
            <Lesson2 address={address} store={store} setRoute={setRoute} />
          ),
          Lesson3: (
            <Lesson3 address={address} store={store} setRoute={setRoute} />
          ),
          Lesson4: (
            <Lesson4 address={address} store={store} setRoute={setRoute} />
          ),
          Lesson5: (
            <Lesson5 address={address} store={store} setRoute={setRoute} />
          )
        }[route]
      }

      {/* <ProgressAlertUtil drizzleState={drizzleState} /> */}
      <ProgressAlertContainer />
      <LessonNavigation setRoute={setRoute} />
    </BodyBox>
  );
}

export default Body;
