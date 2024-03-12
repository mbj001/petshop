import React, {useState, useEffect, createContext} from 'react'
import "./App.css"
import Router from './routes/router'
import { removeCookie } from './config/cookie';

export const AppContext = createContext();

function App() {

    const [loginSession, setLoginSession] = useState(JSON.parse(window.localStorage.getItem("login")));

    useEffect(() => {
    
        if(loginSession === true || loginSession === false){

        }
        // 처음 접속 시 세션 없는 경우
        else{   
            window.localStorage.setItem("login", false);
            removeCookie("client.sid", {
                path: "/",
                secure: false,
                secret: process.env.COOKIE_SECRET
            });
            removeCookie("connect.sid", {
                path: "/",
                secure: false,
                secret: process.env.COOKIE_SECRET
            });
        }

    }, [loginSession])

    return (
    <>
    <div>
        <AppContext.Provider value={loginSession}>
            <Router />
        </AppContext.Provider>
    </div>
    </>
    )
}

export default App