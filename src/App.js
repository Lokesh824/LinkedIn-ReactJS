import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Feed from "./Components/Feed/Feed";
import Dashboard from "./Components/Dashboard/Dashboard";
import { login, logout, selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import Login from "./Components/Login/Login";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as Links,
} from "react-router-dom";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setIsAuthenticated(true);
        //user logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        //logged out
        setIsAuthenticated(false);

        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact>
            {!user ? (
              <Login />
            ) : (
              <Dashboard
                searchText={searchText}
                setSearchText={setSearchText}
              />
            )}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard searchText={searchText} setSearchText={setSearchText} />
          </Route>
        </Switch>
        {/* {!user ? (
          <Login />
        ) : (
          <Dashboard searchText={searchText} setSearchText={setSearchText} />
        )} */}
      </Router>
    </div>
  );
}

export default App;
