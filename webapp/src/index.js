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
import store from "./core/middleware";

// Let drizzle know what contracts we want and how to access our test blockchain
import drizzleOptions from "./drizzleOptions";

// Setup drizzle
const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

const wrappers = () => {
  return <App drizzle={drizzle} />;
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
    {wrappers()}
  </DrizzleProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
