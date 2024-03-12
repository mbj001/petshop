import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function PurchaseCompleteModal() {
    return (
    <PurchaseModalStyle>
        <div className="modal">
            <div className="text-center mt-[20px]">
                <p>결제가 완료되었습니다.</p>
            </div>
            <div className="text-center mt-[100px]">
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
        background-color: red;
    }
`

export default PurchaseCompleteModal