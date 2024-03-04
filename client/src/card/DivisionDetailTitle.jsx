import React from 'react'
import styled from 'styled-components'

function DivisionDetailTitle({detail}) {

    let pageName;

    switch(detail){
        case "feed":
            pageName = "필드게인 수제사료";
            break;
        case "snack":
            pageName = "신선한 수제간식";
            break;
        case "gum":
            pageName = "칠겅칠겅 천연껌";
            break;
        case "softfood":
            pageName = "부드러운 영양식";
            break;
        case "cookie":
            pageName = "핸드메이드 쿠키";
            break;
        case "bakery":
            pageName = "케이크&베이커리";
            break;
        case "powder":
            pageName = "천연 파우더류";
            break;
        case "premium":
            pageName = "프리미엄 유산균";
            break;
        case "catsnack":
            pageName = "고양이 수제간식";
            break;
        default:
            break;
    }

    return (
    <DetailTitleStyled>
        <p>{pageName}</p>
    </DetailTitleStyled>
    )
}

const DetailTitleStyled = styled.div`
    p{
        padding-bottom: 8px;
        text-align: center;
        width: 100px;
        margin: 15px auto;
        color: #666666;
        font-size: 13px;
        border-bottom: 1px solid black;
    }
`

export default DivisionDetailTitle