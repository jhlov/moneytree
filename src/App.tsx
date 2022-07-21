import classNames from "classnames";
import { Header } from "components/Header";
import { LoadingLayer } from "components/LoadingLayer";
import { Bot } from "pages/Bot";
import { Dashboard } from "pages/Dashboard";
import { Login } from "pages/Login";
import React from "react";
import { HashRouter, Redirect, Route } from "react-router-dom";
import "./App.scss";

function App() {
  const isMobile = false;

  return (
    <div className="App">
      <div className={classNames(isMobile ? "mobile-container" : "container")}>
        <Header />
        {/* todo */}
        <HashRouter>
          <Route path="/" exact>
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/bot" component={Bot} />
          <Route path="/login" component={Login} />
        </HashRouter>
        <LoadingLayer />
      </div>
    </div>
  );
}

export default App;
