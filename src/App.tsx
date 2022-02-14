import classNames from "classnames";
import { LoadingLayer } from "components/LoadingLayer";
import React from "react";
import { HashRouter, Redirect, Route } from "react-router-dom";
import "./App.scss";

function App() {
  const isMobile = false;

  return (
    <div className="App">
      <div className={classNames(isMobile ? "mobile-container" : "container")}>
        {/* todo */}
        <HashRouter>
          <Route path="/" exact>
            <Redirect to="/app" />
          </Route>
          {/* <Route path="/app" component={app} /> */}
        </HashRouter>
        <LoadingLayer />
      </div>
    </div>
  );
}

export default App;
