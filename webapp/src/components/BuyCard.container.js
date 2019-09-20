import React from "react";
import { Button } from "rimble-ui";
import BuyCard from "./BuyCard";
import { drizzleConnect } from "@drizzle/react-plugin";
import { getProgressAlertsByVisibilityFilter } from "./../core/redux/selectors";
import { addProgressAlert, toggleProgressAlert } from "./../core/redux/actions";
import { isContext } from "vm";
// Drizzle for state and contract interactions
import { DrizzleContext } from "@drizzle/react-plugin";

function BuyCardContainer({ token, address, addProgressAlert }) {
  // ToDo: Can this be refactored and put someplace else more reusable?
  const preflightCheck = ({ token, drizzle, address, callback, event }) => {
    console.log("preflightCheck", token, drizzle);
    // Check that there is a valid network

    // const stackId = drizzle.contracts[token.id].methods["mint"].cacheSend(
    //   address,
    //   {
    //     from: address
    //   }
    // );

    // Check that the balance is high enough
    addProgressAlert({ token });
    // can call redux dispatch add action here that we have token details
    callback(event);

    return;
  };

  return (
    <DrizzleContext.Consumer>
      {({ drizzle, drizzleState }) => {
        return (
          <BuyCard
            drizzle={drizzle}
            drizzleState={drizzleState}
            address={address}
            token={token}
            preflightCheck={preflightCheck}
          />
        );
      }}
    </DrizzleContext.Consumer>
  );
}

/*
 * Export connected component.
 */
const mapStateToProps = state => {
  const { visibilityFilter } = state;
  const progressAlerts = getProgressAlertsByVisibilityFilter(
    state,
    visibilityFilter
  );
  return {
    progressAlerts: progressAlerts
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addProgressAlert: value => dispatch(addProgressAlert(value))
  };
};

export default drizzleConnect(
  BuyCardContainer,
  mapStateToProps,
  mapDispatchToProps
);
