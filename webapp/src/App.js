import React from "react";

// Drizzle for state and contract interactions
import { DrizzleContext } from "@drizzle/react-plugin";

// App-specific config and settings
import appConfig from "./appConfig";

// Theming for look and feel
import { ThemeProvider } from "styled-components";
import CustomTheme from "./CustomTheme";

// Components that build layout
import Body from "./components/Body";

const App = ({ drizzle }) => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <ThemeProvider theme={CustomTheme}>
        <DrizzleContext.Consumer>
          {({ drizzleState }) => {
            return (
              <Body
                drizzle={drizzle}
                drizzleState={drizzleState}
                appConfig={appConfig}
              />
            );
          }}
        </DrizzleContext.Consumer>
      </ThemeProvider>
    </DrizzleContext.Provider>
  );
};

export default App;
