## Firebase Login Authentication Main
1. Firebase
- firebase.config.js
```
const firebaseConfig = {
    apiKey: "AIzaSyCe8sBogEKL8A7lb86g-FAWo40kECdTt2k",
    authDomain: "authentication-final-41ccc.firebaseapp.com",
    projectId: "authentication-final-41ccc",
    storageBucket: "authentication-final-41ccc.appspot.com",
    messagingSenderId: "19469898760",
    appId: "1:19469898760:web:0ed00bfdcfd0bbeffbadbd"
};
export default firebaseConfig;
```

- firebase.init.js
```
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initializeAuthentication = () => {
    initializeApp(firebaseConfig);
}
export default initializeAuthentication;
```

2. hooks
- useFirebase.js
```
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const signInUsingGoogle = () => {
        signInWithPopup(auth, googleProvider)
        .then(result =>{
            console.log(result.user);
            setUser(result.user);
        })
        .catch(error =>{
            setError(error.message);
        })
    }
    const signInUsingGithub = () => {
        signInWithPopup(auth, githubProvider)
        .then(result => {
            console.log(result.user);
            setUser(result.user);
        })
        .catch(error => {
            setError(error.message);
        })
    }
    
    const logOut = () =>{
        signOut(auth)
        .then(() => {
            setUser('');
        })
    }

    useEffect( () => {
        onAuthStateChanged(auth, user => {
            if(user){
                setUser(user);
            }
        })
    }, [])
    return{
        signInUsingGoogle,
        signInUsingGithub,
        user,
        error,
        logOut
    }

}
export default useFirebase;
```

3. context
- AuthProvider.js
```
import React from 'react';
import { createContext } from 'react';
import useFirebase from '../hooks/useFirebase';

export const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const allContext = useFirebase();
    return (
        <AuthContext.Provider value={allContext}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
```

4. hooks
- useAuth.js
```
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
}
export default useAuth;
```

5. In App.js, "BrowserRouter" goes inside "AuthProvide":
```
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Header from './components/Header/Header';
import AuthProvider from './context/AuthProvider';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
        <Header></Header>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
          </Switch>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
```
## Finally call all return from "useFirebase" by "useAuth",
```
e.g.
const {signInUsingGoogle, signInUsingGithub} = useAuth();
Also need to import useAuth();
```