import React from "react";
import BuyCard from "./BuyCard";
import { drizzleConnect, DrizzleContext } from "@drizzle/react-plugin";
import { addProgressAlert } from "./../core/redux/actions";

// Drizzle for state and contract interactions
import {} from "@drizzle/react-plugin";

function BuyCardContainer({ token, address, addProgressAlert, store }) {
  // ToDo: Can this be refactored and put someplace else more reusable?
  const preflightCheck = ({ token, drizzle, address, callback, event }) => {
    console.log("preflightCheck", token, drizzle);
    // Check that the wallet is connected
    // Check that there is a valid network
    // Check that the balance is high enough

    // Update UI to show started modal and include token details
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
            enableBuyButton={store.txModals.enableBuyButton}
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
  return {
    store: state
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
