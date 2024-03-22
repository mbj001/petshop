import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from "react-icons/fa6";

function PurchaseCompleteModal() {
    return (
    <PurchaseModalStyle>
        <div className="modal">
            <div className="text-center mt-[20px]">
                <p className="order-comment">결제가 완료되었습니다.</p>
            </div>
            <FaCheck className="check-icon" />
            <div className="button">
                <Link to="/">메인페이지로 이동</Link>
            </div>
        </div>
    </PurchaseModalStyle>
    )
}

const PurchaseModalStyle = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);

    .modal{
        // margin: 0 auto;
        width: 400px;
        height: 200px;
        background-color: white;
        border-radius: 5px;
    }

    .order-comment{
        font-size: 13px;
        color: #2e2e2e;
    }

    .button{
        font-size: 11px;
        width: 110px;
        height: 30px;
        margin: 10px 10px;
        margin: 0 auto;
        border-radius: 3px;
        color: #2e2e2e;
        background-color: white;
        border: 1px solid #2e2e2e;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover{
            color: white;
            background-color: #2e2e2e;
        }
    }

    .check-icon{
        font-size: 60px;
        color: #f05650;
        margin: 20px auto 20px;
    }
`

export default PurchaseCompleteModal