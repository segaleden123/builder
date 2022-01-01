import React, {useState, useEffect} from "react";
import firebaseConfig from "./fire";
import Login from "./Login";
import './App.css';
import Main from "./Main";


const App = () => {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [hasAccount, setHasAccount] = useState(false)
  
  const clenInput = () => {
    setEmail('');
    setPassword('');
  }

  const cleanError = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    cleanError();
    firebaseConfig
      .auth()
      .signInWithEmailAnsPassword(email, password)
      .catch(err => {
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user_disabled":
          case "auth/user-not-found":
        };
      })
  };

  const handleSignup = () => {
    cleanError();
    firebaseConfig
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch(err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError("err.")
          case "auth/weak-password":
            setEmailError("err.")
            break;
        };
      })
  };

 const handleLogout = () => {
   firebaseConfig.auth().signOut();
 };

 const authListner = () => {
   firebaseConfig.auth().onAuthStateChanged((user) => {
     if(user){
       setUser(user)
     } else {
       setUser('')
     }
   })
  }
 

 useEffect(() => {
   authListner();
 },[]);


    return (
      <div className="App">
          {user ? (
            <Main handleLogout={handleLogout}></Main>
            ): (
            <Login 
            email={email} 
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
              
          />
            )}

      </div>
    )
}

export default App