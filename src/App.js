import React from "react";
import "./App.css";
import Main from "./containers/Main";
import { ThemeProvider } from "styled-components";
import { chosenTheme } from "./theme";
import { GlobalStyles } from "./global";

function App() {
  return (
    <ThemeProvider theme={chosenTheme}>
      <>
        <GlobalStyles />
        <div>
          <Main theme={chosenTheme} />
          <a
            href="https://api.whatsapp.com/send?phone=2348024218309"
            class="float"
            target="_blank"
          >
            <i class="fab fa-whatsapp my-float"></i>
          </a>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
