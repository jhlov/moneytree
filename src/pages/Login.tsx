import { getAuth, GoogleAuthProvider } from "firebase/auth";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./Login.scss";

const Login = () => {
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [GoogleAuthProvider.PROVIDER_ID],
    signInSuccessUrl: "/"
    // callbacks: {
    //   // Avoid redirects after sign-in.
    //   signInSuccessWithAuthResult: (authResult: any, redirectUrl?: string) => {
    //     console.log(authResult, redirectUrl);
    //     console.log(getAuth().currentUser);
    //     return false;
    //   }
    // }
  };

  return (
    <div className="login">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
    </div>
  );
};

export { Login };
