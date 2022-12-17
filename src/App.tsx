import classNames from "classnames";
import { Header } from "components/Header";
import { LoadingLayer } from "components/LoadingLayer";
import { getAuth } from "firebase/auth";
import { isNil } from "lodash";
import { Bot } from "pages/Bot";
import { Dashboard } from "pages/Dashboard";
import { Login } from "pages/Login";
import { Setting } from "pages/Setting";
import { useEffect } from "react";
import { HashRouter, Redirect, Route } from "react-router-dom";
import { GetUserInfoResponse } from "scripts/responses";
import { api } from "services/api";
import { useAuth } from "store/useAuth";
import { useConfig } from "store/useConfig";
import "./App.scss";

function App() {
  const isMobile = false;

  const { setGrade, setIsLogin, setUserEmail } = useAuth();
  const { setKIAccounts, setKIAppKey, setKIAppSecret } = useConfig();

  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged(() => {
      onAuthStateChanged();
    });
  }, []);

  const onAuthStateChanged = async () => {
    setIsLogin(!isNil(auth.currentUser));
    setUserEmail(auth.currentUser?.email ?? "");

    if (auth.currentUser?.uid && auth.currentUser?.email) {
      // 사용자 등급 받아오기
      const r = await api.get<GetUserInfoResponse>(
        "https://1mkyskvrt7.execute-api.ap-northeast-2.amazonaws.com/default/mt-get-userinfo"
      );

      if (r.status === 200) {
        setGrade(r.data.grade);
        setKIAccounts(r.data.KIAccounts ?? []);
        setKIAppKey(r.data.KIAppKey ?? "");
        setKIAppSecret(r.data.KIAppSecret ?? "");
      } else {
        alert(r.data.error);
      }
    } else {
      setGrade("NOT_LOGIN");
      setKIAppKey("");
      setKIAppSecret("");
    }
  };

  return (
    <div className="App">
      <div className={classNames(isMobile ? "mobile-container" : "container")}>
        {/* todo */}
        <HashRouter>
          <Header />
          <div className="py-4">
            <Route path="/" exact>
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/bot" component={Bot} />
            <Route path="/setting" component={Setting} />
            <Route path="/login" component={Login} />
          </div>
        </HashRouter>
        <LoadingLayer />
      </div>
    </div>
  );
}

export default App;
