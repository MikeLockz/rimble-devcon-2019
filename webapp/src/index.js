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
import {
  DrizzleContext,
  DrizzleProvider,
  drizzleConnect
} from "@drizzle/react-plugin"; // fka: drizzle-react
import { LoadingContainer } from "@drizzle/react-components";

// Import Rimble's ProgressAlert utility and its redux store to manage transaction alerts
import ProgressAlertUtil from "./core/utilities/ProgressAlertUtil";
import store from "./core/middleware";

// Let drizzle know what contracts we want and how to access our test blockchain
import drizzleOptions from "./drizzleOptions";

const appConfig = {
  requiredNetwork: 4 // Network Id that contract is deployed to 1=mainnet, 4=rinkeby, etc
};

// Setup drizzle
const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

const wrappers = () => {
  return (
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
    </DrizzleContext.Provider>
  );
};

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    transactions: state.transactions,
    DevConAttendance: state.contracts.DevConAttendance,
    DevConFood: state.contracts.DevConFood,
    DevConParties: state.contracts.DevConParties
  };
};

const AppContainer = drizzleConnect(wrappers, mapStateToProps);

ReactDOM.render(
  <DrizzleProvider store={store} options={drizzleOptions}>
    <LoadingContainer>
      <AppContainer />
    </LoadingContainer>
  </DrizzleProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
