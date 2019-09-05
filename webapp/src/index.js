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

// Setup drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzle}>
    <ThemeProvider theme={CustomTheme} className="App">
      <DrizzleContext.Consumer>
        {drizzleContext => {
          // console.log("drizzleContext", drizzleContext);
          return <App drizzleState={drizzleContext.drizzleState} />;
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
