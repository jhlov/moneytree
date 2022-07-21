import GoogleIcon from "@mui/icons-material/Google";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { Button } from "react-bootstrap";
import "./Login.scss";

const Login = () => {
  const provider = new GoogleAuthProvider();

  const onLogin = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        const token = credential?.accessToken;
        console.log(token);

        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="login">
      <Button variant="outline-primary" onClick={onLogin}>
        <GoogleIcon /> Sign in with Google
      </Button>
    </div>
  );
};

export { Login };
