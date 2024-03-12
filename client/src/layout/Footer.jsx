import React from 'react'
import styled from 'styled-components'
import { IoIosPhonePortrait } from "react-icons/io";

function Footer() {
    return (
        <FooterStyle>
            <div className="w-1/3">
                <p className="title">CUSTOMER</p>
                <div className="flex items-center">
                    <IoIosPhonePortrait /><p className="ml-[5px] font-bold text-[18px]">010-6389-8753</p>
                </div>
                <p>평일 : 오전 10:00 ~ 오후 06:00 점심 : 오후 12:30 ~ 오후 01:30</p>
                <p>토 / 일 / 공휴일은 휴무</p>
                <p className="title">ACCOUNT</p>
                <p>하나은행 111-222222-33333</p>
                <p>예금주 : 민병준</p>
            </div>
            <div className="w-1/3">
                <p className="title">SHOP INFO</p>
                <p>회사명 : 초롱아 / 대표 : 민병준</p>
                <p>사업자등록번호 : 111-22-33333</p>
                <p>통신판매업신고 : 제0000-경기김포-0000호</p>
                <p>주소 : 12345 경기도 김포시 장기동 한강33로 999</p>
                <p>TEL : 010-1234-5678 / MASTER : 민병준(mbj001@naver.com)</p>
            </div>
            <div className="w-1/4">
                <p className="title">RETURN & EXCHANCE</p>
                <p>경기 김포시 장기동 123동 1234호</p>
                <p className="title">ORDER TRACKING</p>
                <p>우체국 택베 1588-1300</p>
            </div>
            <div className="w-1/6">
                <p className="title">SHOP MENU</p>
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
    margin-top: 200px;

    display: flex;
    justify-content: space-between;
    padding: 0px 100px;
    
    >div>p{
        font-size: 10px;
    }

    .title{
        font-size: 12px;
        font-weight: 600;
        padding: 20px 0px;
    }
`

export default Footer