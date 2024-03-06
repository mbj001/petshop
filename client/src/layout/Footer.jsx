import React from 'react'
import styled from 'styled-components'
import { IoIosPhonePortrait } from "react-icons/io";

function Footer() {
    return (
        <FooterStyle>
            <div>
                <p>CUSTOMER</p>
                <div className="flex items-center">
                    <IoIosPhonePortrait /><p>010-6389-8753</p>
                </div>
                <p>평일 : 오전 10:00 ~ 오후 06:00 점심 : 오후 12:30 ~ 오후 01:30</p>
                <p>토 / 일 / 공휴일은 휴무</p>
                <p>ACCOUNT</p>
                <p>하나은행 111-222222-33333</p>
                <p>예금주 : 민병준</p>
            </div>
            <div>
                <p>SHOP INFO</p>
                <p>회사명 : 초롱아 / 대표 : 민병준</p>
                <p>사업자등록번호 : 111-22-33333</p>
                <p>통신판매업신고 : 제0000-경기김포-0000호</p>
                <p>주소 : 12345 경기도 김포시 장기동 한강33로 999</p>
                <p>TEL : 010-1234-5678 / MASTER : 민병준(mbj001@naver.com)</p>
            </div>
            <div>
                <p>RETURN & EXCHANCE</p>
                <p>경기 김포시 장기동 123동 1234호</p>
                <p>ORDER TRACKING</p>
                <p>우체국 택베 1588-1300</p>
            </div>
            <div>
                <p>SHOP MENU</p>
                <p>메인화면</p>
                <p>회사소개</p>
                <p>이용안내</p>
                <p>이용약관</p>
                <p>개인정보취급방침</p>
            </div>
        </FooterStyle>
    )
}

const FooterStyle = styled.div`
    position: alsolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 300px;
    min-width: 950px;
    background-color: #f6f6f6;

    display: flex;
    justify-content: space-between;
    padding: 0px 50px;

`

export default Footer