import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Import drizzle functions (using latest 1.5+)
import { Drizzle, generateStore } from "@drizzle/store"; // fka: drizzle
import { DrizzleProvider } from "@drizzle/react-plugin"; // fka: drizzle-react

// Import Rimble's ProgressAlert utility and its redux store to manage transaction alerts
import store from "./core/middleware";

// Let drizzle know what contracts we want and how to access our test blockchain
import drizzleOptions from "./drizzleOptions";

// Setup drizzle
const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

ReactDOM.render(
  <DrizzleProvider store={store} options={drizzleOptions}>
    <App drizzle={drizzle} store={store} />
  </DrizzleProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
