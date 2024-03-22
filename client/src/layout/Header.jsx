import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import axios from 'axios'
import { getCookie, removeCookie } from '../config/cookie'
function Header({render}) {
    const loginSession = useContext(AppContext);
    const [basketCount, setBasketCount] = useState(0);
    const [myPageEvent, setMyPageEvent] = useState(false);
    async function logoutClick(){
        const logoutValue = await axios.post("http://localhost:8080/client/logout", {token: getCookie("connect.sid")});

        removeCookie("client.sid");
        removeCookie("connect.sid");
        window.localStorage.setItem("login", false);
        alert("로그아웃 되었습니다.");
        window.location = "/";
        // console.log(logoutValue.data.logoutSuccess);
    }

    useEffect(() => {
        axios.post("http://localhost:8080/client/basketCount", {
            user_id: getCookie("client.sid")
        })
        .then(({data}) => {
            console.log(data);
            setBasketCount(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [render])

    return (
    <>
    <HeadBox>
        <div className="header-top"></div>
        <div className="header-menu">
            <div className="flex items-center">
                <Link to="/">Home</Link>
                <span>|</span>
                <Link to="/">공지사항</Link>
                <span>|</span>
                <Link to="/">상품 Q&A</Link>
                <span>|</span>
                <Link to="/">제품 이용후기♥</Link>
                <span>|</span>
                <Link to="/">해피팡팡 스토리</Link>
                <span>|</span>
                <Link to="/">EVENT 게시판</Link>
            </div>
            <div className="flex items-center relative">
                { loginSession === false? <Link to="/signup">회원가입</Link> : <Link to="/modify">정보수정</Link> }
                <span>|</span>
                { loginSession === false? <Link to="/signin">로그인</Link> : <p className="inline text-[11px] M-text-gray cursor-pointer" onClick={() => logoutClick()}>로그아웃</p> }
                <span>|</span>
                <Link onMouseOver={() => setMyPageEvent(true)} onMouseOut={() => setMyPageEvent(false)}>마이페이지</Link>
                <span>|</span>
                <div className="flex items-center">
                    <Link to="/basket">장바구니</Link>
                    <div className="basket-count">{basketCount}</div>
                </div>
                {
                    myPageEvent === true &&
                    <MyPage onMouseOver={() => setMyPageEvent(true)} onMouseOut={() => setMyPageEvent(false)}>
                        <div>
                            <Link>주문조회</Link>
                            <Link to="/wishlist">관심상품</Link>
                            <Link to="/mileage/accumulate">마일리지</Link>
                            <Link>쿠폰조회</Link>
                            <Link>내게시물</Link>
                        </div>
                    </MyPage>
                }
            </div>
        </div>
        <div className="header-mid">
                <div>
                    <Link to="/">
                        <img src="/image/header-image.png" alt="header-image"></img>
                    </Link>
                </div>
        </div>
    </HeadBox>
    <Menu>
        <Link to="/division/feed">필드게인 수제사료</Link>
        <Link to="/division/snack">신선한 수제간식</Link>
        <Link to="/division/gum">칠겅칠겅 천연껌</Link>
        <Link to="/division/softfood">부드러운 영양식</Link>
        <Link to="/division/cookie">핸드메이드 쿠키</Link>
        <Link to="/division/bakery">케이크&베이커리</Link>
        <Link to="/division/powder">천연 파우더류</Link>
        <Link to="/division/premium">프리미엄 유산균</Link>
        {/* <Link to="/productDetail/">프리미엄 유산균</Link> */}
        {/* <Link to="/division/catsnack">고양이 수제간식</Link> */}
    </Menu>
    <div className="h-[240px]"></div>
    </>
    )
}

const HeadBox = styled.div`
    min-width: 950px;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: white;
    z-index: 100;

    width: 100%;
    height: 200px;
    border-bottom: 1px solid black;

    .header-top{
        width: 100%;
        height: 10px;
        background-color: pink;
    }

    .header-menu{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        margin: 10px auto;
        // background-color: #eee;
    }

    .header-menu a{
        font-size: 11px;
        color: gray;
    }

    .header-menu span{
        font-size: 7px;
        padding-right: 10px;
        padding-left: 10px;
    }

    .header-menu a:hover{
        color: black;
    }

    .header-mid{
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: 10px;
        >div{
            width: 400px;
        }
    }

    .basket-count{
        background-color: #2e2e2e;
        color: white;
        width: 16px;
        height: 16px;
        font-size: 10px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;
        font-weight: 700;
    }
`

const Menu = styled.div`
    position: fixed;
    width: 100%;
    min-width: 1150px;
    top: 200px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #cccccc;
    z-index: 100;

    a{
        font-size: 13px;
        padding: 0 20px;
        color: gray;
        white-space: nowrap;
    }

    a:hover{
        color: black;
        transition: 0.4s;
    }
`

const MyPage = styled.div`

    position: absolute;
    top: 15px;
    left: 90px;
    // background-color: red;
    padding-top: 10px;

    >div{
        width: 100px;
        height: 140px;
        background-color: white;
        border: 1px solid #cccccc;
        padding-top: 6px;
    }

    >div>a{
        display: block;
        font-size: 12px;
        color: gray;
        margin: 7px 15px;
    }
    
    >div>>a:hover{
        color: #2e2e2e;
    }

    >div:hover{
        border: 1px solid #2e2e2e;
    }
`

export default Header