import {BrowserRouter, Switch, Route } from "react-router-dom"
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import React, { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン")
  const [user, setUser] = useState({})

  const handleLogin = (data) => {
    setLoggedInStatus("ログインなう")
    setUser(data.user)
  }
  const handleLogout = () => {
    setLoggedInStatus("未ログイン")
    setUser({})
  }
 useEffect(() =>{
   checkLoginStatus()
 })

 const checkLoginStatus = () => {
  axios.get("http://localhost:3001/logged_in", { withCredentials: true })

    .then(response => {
      if (response.data.logged_in && loggedInStatus === "未ログイン") {
        setLoggedInStatus("ログインなう")
        setUser(response.data.user)
      } else if (!response.data.logged_in && loggedInStatus === "ログインなう") {
        setLoggedInStatus("未ログイン")
        setUser({})
      }
    })

    .catch(error => {
      console.log("ログインエラー", error)
  })
}
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            exact path={"/"}
            render={props => (
              <Home { ...props } handleLogin={handleLogin} handleLogout={handleLogout} loggedInStatus={loggedInStatus} />
            )}
          />
          
        <Route
            exact path={"/dashboard"}
            render={props => (
              <Dashboard { ...props } loggedInStatus={loggedInStatus} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
