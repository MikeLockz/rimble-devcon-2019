import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Custom theming via styled-components
import { ThemeProvider } from "styled-components";
import CustomTheme from "./CustomTheme";

// Import drizzle functions (using latest 1.5+)
import { Drizzle, generateStore } from "@drizzle/store"; // fka: drizzle
import { DrizzleContext } from "@drizzle/react-plugin"; // fka: drizzle-react

// Drizzle contracts
import DevConAttendance from "./contracts/DevConAttendance.json";
import DevConFood from "./contracts/DevConFood.json";
import DevConParties from "./contracts/DevConParties.json";

// Import Rimble's ProgressAlert utility to manage transaction alerts
import ProgressAlertUtil from "./core/utilities/ProgressAlertUtil";

// Let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [DevConAttendance, DevConFood, DevConParties],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545"
    }
  }
};

const appConfig = {
  requiredNetwork: 4 // Network Id that contract is deployed to 1=mainnet, 4=rinkeby, etc
};

// Setup drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzle}>
    <ThemeProvider theme={CustomTheme} className="App">
      <DrizzleContext.Consumer>
        {drizzleContext => {
          // console.log("drizzleContext", drizzleContext);
          return (
            <>
              <App
                drizzle={drizzle}
                drizzleState={drizzleContext.drizzleState}
                appConfig={appConfig}
              />
              {drizzleContext.drizzleState && (
                <ProgressAlertUtil
                  drizzleState={drizzleContext.DrizzleState}
                  transactions={drizzleContext.drizzleState.transactions}
                  transactionStack={
                    drizzleContext.drizzleState.transactionStack
                  }
                />
              )}
            </>
          );
        }}
      </DrizzleContext.Consumer>
    </ThemeProvider>
  </DrizzleContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
