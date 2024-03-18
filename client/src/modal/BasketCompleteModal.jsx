import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function BasketCompleteModal({setBasketModal}) {
    return (
    <BasketModal>
        <div className="modal">
            <div className="text-center mt-[20px]">
                <p>장바구니에 상품이 정상적으로 담겼습니다..</p>
            </div>
            <div className="mt-[100px] flex itmes-center justify-center">
                <Link to="/basket" className="move-button">장바구니 이동</Link>
                <p onClick={() => setBasketModal(false)} className="close-button">쇼핑 계속하기</p>
            </div>
        </div>
    </BasketModal>
    )
}

const BasketModal = styled.div`
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
    }

    .move-button,
    .close-button{
        font-size: 12px;
        width: 80px;
        height: 30px;
        margin: 10px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .move-button{
        color: white;
        background-color: #2e2e2e;
        border: 1px solid #2e2e2e;
    }

    .move-button:hover{
        color: #2e2e2e;
        background-color: white;
    }

    .close-button{
        cursor: pointer;
        color: #2e2e2e;
        border: 1px solid #2e2e2e;
    }

    .close-button:hover{
        background-color: #cfcfcf;
    }

`



export default BasketCompleteModal