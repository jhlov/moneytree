import classNames from "classnames";
import { Header } from "components/Header";
import { LoadingLayer } from "components/LoadingLayer";
import { getAuth } from "firebase/auth";
import { isNil } from "lodash";
import { Bot } from "pages/Bot";
import { Dashboard } from "pages/Dashboard";
import { Login } from "pages/Login";
import { Setting } from "pages/Setting";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter, Redirect, Route } from "react-router-dom";
import { setIsLogin, setUserEmail } from "store/auth";
import "./App.scss";

function App() {
  const isMobile = false;
  const dispatch = useDispatch();

  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged(() => {
      dispatch(setIsLogin(!isNil(auth.currentUser)));
      dispatch(setUserEmail(auth.currentUser?.email ?? ""));
    });
  }, []);

  return (
    <div className="App">
      <div className={classNames(isMobile ? "mobile-container" : "container")}>
        {/* todo */}
        <HashRouter>
          <Header />
          <Route path="/" exact>
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/bot" component={Bot} />
          <Route path="/setting" component={Setting} />
          <Route path="/login" component={Login} />
        </HashRouter>
        <LoadingLayer />
      </div>
    </div>
  );
}

export default App;
