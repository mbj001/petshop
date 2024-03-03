import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function Header() {
    return (
    <>
    <HeadBox>
        <div className="header-top"></div>
        <div className="header-menu">
            <div className="header-left-menu">
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
            <div className="header-right-menu">
                <Link>회원가입</Link>
                <span>|</span>
                <Link>로그인</Link>
                <span>|</span>
                <Link>마이페이지</Link>
                <span>|</span>
                <Link>장바구니</Link>
            </div>
        </div>
        <div className="header-mid">
            <Link to="/">
                <img src="/image/header-image.jpg" alt="header-image"></img>
            </Link>
        </div>
    </HeadBox>
    <Menu>
        <Link to="/product/feed">필드게인 수제사료</Link>
        <Link to="/product/snack">신선한 수제간식</Link>
        <Link to="/product/gum">칠겅칠겅 천연껌</Link>
        <Link to="/product/softfood">부드러운 영양식</Link>
        <Link to="/product/cookie">핸드메이드 쿠키</Link>
        <Link to="/product/bakery">케이크&베이커리</Link>
        <Link to="/product/powder">천연 파우더류</Link>
        <Link to="/product/premium">프리미엄 유산균</Link>
        <Link to="/product/catsnack">고양이 수제간식</Link>
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
        width: 80%;
        margin: 0 auto;
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

    .header-left-menu{
        display: flex;
        align-items: center;
    }

    .header-mid img{
        padding-top: 30px;
        margin: 0 auto;
    }
`

const Menu = styled.div`
    position: fixed;
    width: 100%;
    min-width: 1150px;
    top: 200px;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    a{
        font-size: 13px;
        padding: 0 20px;
        color: gray;
        white-space: nowrap;
    }

    a:hover{
        color: black;
    }
`

export default Header