import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import PageTitle from '../card/PageTitle'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { setCookie } from '../config/cookie'
import { AppContext } from '../App'

function Signin() {

    const [user_id, setUser_id] = useState("");
    const [user_pw, setUser_pw] = useState("");

    const loginSession = useContext(AppContext);


    function loginClick(e){
        e.preventDefault();
        if(user_id.length === 0){
            alert("아이디를 입력해주세요.");
        }
        else if(user_pw.length === 0){
            alert("비밀번호를 입력해주세요.");
        }
        else{
            axios.post("http://localhost:8080/client/login", {
                isAdmin: "client",
                user_id: user_id,
                user_pw: user_pw
            })
            .then(({data}) => {
                console.log(data);
                if(data.loginSucceed === true) {
                    setCookie("client.sid", data.clientID, {
                        path: "/",
                        secure: false,
                        secret: process.env.COOKIE_SECRET
                    });
                    setCookie("connect.sid", data.sessionID, {
                        path: "/",
                        secure: false,
                        secret: process.env.COOKIE_SECRET
                    });
                    window.localStorage.setItem("login", true);
                    window.location = "http://localhost:3000/";
                }
                else{
                    alert("아이디 패스워드가 틀렸습니다.");
                }
            })
            .catch((err) => {
                alert("에러");
            })
        }
    }


    return (
    <LoginStyled>
        <PageTitle detail="login" />
        <div className="login-box">
            {
                loginSession === false ?
                <form onSubmit={(e) => loginClick(e)} className="input-area">
                    <div>
                        <input type="text" placeholder='아이디' onChange={(e) => setUser_id(e.target.value)}/>
                        <input type="password" placeholder='비밀번호' onChange={(e) => setUser_pw(e.target.value)}/>
                    </div>
                    <button type="submit" className="login-button">로그인</button>
                </form>
                :
                <div>
                    로그인 됨
                </div>
            }
            <div className="flex justify-center items-center text-[12px] mt-[20px]">
                <Link to="#" className="pr-[8px]">아이디 찾기</Link>
                <p className="text-[8px] M-gray-light">|</p>
                <Link to="#" className="px-[8px]">비밀번호 찾기</Link>
                <p className="text-[8px] M-gray-light">|</p>
                <Link to="/signup" className="pl-[8px]">회원가입</Link>
            </div>
        </div>
    </LoginStyled>
    )
}

const LoginStyled = styled.div`
    width: 100%;
    min-width: 950px;

    input[type="text"], input[type="password"]{
        border: 1px solid var(--border-gray-light);
        border-radius: 2px;
        margin-bottom: 7px;
        height: 30px;
        padding-left: 5px;
        font-size: 12px;
        width: 250px;
    }

    input[type="text"]:focus, input[type="password"]:focus{
        outline: none;
    }

    

    .login-box{
        margin: 0 auto;
        width: 450px;
        border: 1px solid var(--border-gray-light);
        padding: 40px 50px;
    }

    .login-button{
        width: 160px;
        height: 67px;
        background-color: black;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer
    };

    .login-button:hover{
        background-color: gray;
    }


    .input-area{
        display: flex;
        border-bottom: 1px solid var(--border-gray-light);
        padding-bottom: 20px;
    }

    .border-x-gray-light{
        border-left: 1px solid var(--border-gray-light);
        border-right: 1px solid var(--border-gray-light);
    }
`

export default Signin