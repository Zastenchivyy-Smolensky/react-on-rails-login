import React from 'react'
import Registration from './auth/Registration'
import Login from "./auth/Login"
import axios from 'axios'

export default function Home(props) {

    // 追加
    const handleSuccessfulAuthentication = (data) => {
        props.handleLogin(data)
        props.history.push("/dashboard")
    }

    const handleLogoutClick = () => {
      axios.delete("http://localhost:3001/logout", { withCredentials: true })
          .then(response => {
              props.handleLogout()
          }).catch(error => console.log("ログアウトエラー", error))
  }

    return (
        <div>
            <h1>Home</h1>
            <h2>ログイン状態: {props.loggedInStatus}</h2>
            <button onClick={handleLogoutClick}>ログアウト</button>
            <Registration handleSuccessfulAuthentication={handleSuccessfulAuthentication}/>
            <Login handleSuccessfulAuthentication={handleSuccessfulAuthentication} />
        </div>
    )
}