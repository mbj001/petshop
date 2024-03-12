import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PageTitle from '../card/PageTitle';
import axios from 'axios';
import { getCookie } from '../config/cookie';
import PurchaseCompleteModal from '../modal/PurchaseCompleteModal';

function Order() {
    
    const [order_list, setOrder_list] = useState(useLocation().state.order_list);
    const [order_price, setOrder_price] = useState(0);
    const [delivery_price, setDelivery_price] = useState(3000);
    const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
    const user_id = getCookie("client.sid");

    function purchaseFunc(){
        setPurchaseModalOpen(true);

        axios.post("http://localhost:8080/client/purchase", {
            user_id: user_id,
            order_list: order_list
        })
        .then(({data}) => {
            
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {

        let price_val = 0;
        let total_price_val = 0;

        // But It Now 로 진입
        if(order_list.length === 0){
            axios.post("http://localhost:8080/client/basketInfo", {
                user_id: user_id,
                buyitnow: true
            })
            .then(({data}) => {
                setOrder_list(data);

                price_val = data[0].total_price;
                setOrder_price(price_val);
                
                if(price_val >= 40000){
                    setDelivery_price(0);
                }
    
            })
            .catch((err) => {
                console.log(err);
            })
        }
        // 장바구니 클릭 으로 진입
        else{
            for(let i=0; i<order_list.length; i++){
                price_val += order_list[i].total_price;
            }
    
            setOrder_price(price_val);
            if(price_val >= 40000){
                setDelivery_price(0);
            }
        }

    }, [])

    return (
        <>
        { purchaseModalOpen === true && <PurchaseCompleteModal />}
        <OrderStyled>
        <PageTitle detail="order" />
        <div className="basket-box">
            <table>
                <tr>
                    {/* <td className="table-top-1"><input type="checkbox" checked={allCheckVal} readOnly onClick={() => checkboxClickFunc(-1)}/></td> */}
                    <td className="table-top-2">이미지</td>
                    <td className="table-top-3">상품정보</td>
                    <td className="table-top-4">판매가</td>
                    <td className="table-top-5">수량</td>
                    <td className="table-top-6">적립금</td>
                    <td className="table-top-7">배송구분</td>
                    <td className="table-top-8">배송비</td>
                    <td className="table-top-9">합계</td>
                </tr>
                {
                    order_list.length !== 0 ?
                    order_list.map((item, index) => (
                        <tr key={index}>
                            {/* <td className="table-content-1"><input type="checkbox" checked={item.checked} onClick={() => checkboxClickFunc(index)} readOnly/></td> */}
                            <td className="table-content-2"><img src={"/image/menu/" + item.image} alt="menu_image" /></td>
                            <td className="table-content-3">{item.name}</td>
                            {/* <td className="table-content-3">{item.checked}</td> */}
                            <td className="table-content-4">￦{item.price}</td>
                            <td className="table-content-5">{item.count}</td>
                            <td className="table-content-6">
                                <div className="flex items-center justify-center">
                                    <img src="/image/reserver_image.gif" alt="reserver_image" className="pr-[5px]" />{item.price * 2 / 100}원
                                </div>
                            </td>
                            <td className="table-content-7">업체기본배송</td>
                            <td className="table-content-8">[조건]</td>
                            <td className="table-content-9">￦{item.total_price}</td>
                        </tr>
                    ))
                    :
                    <div>
                        <p>장바구니가 비어있습니다.</p>
                    </div>
                }
                <tr>
                    <td colSpan="9" className="h-[50px]">
                        <div className="flex justify-between items-center px-[15px]">
                            <p className="text-[11px]">[업체기본배송]</p>
                            <p className="text-[11px]">상품구매금액 <span className="font-bold">{order_price}</span> + 배송비 {delivery_price} = 합계 : <span className="font-bold text-[14px]">￦{order_price + delivery_price}</span></p>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div className="price-info">
            <table>
                <tr className="price-info-text">
                    <td className="w-[250px]">총 상품금액</td>
                    <td className="w-[250px]">총 배송비</td>
                    <td>결제예정금액</td>
                </tr>
                <tr className="price-info-amount">
                    <td>￦{order_price}</td>
                    <td>￦{delivery_price}</td>
                    <td>￦{order_price + delivery_price}</td>
                </tr>
            </table>
        </div>
        <div className="flex justify-center">
            <div className="all-order-button" onClick={() => purchaseFunc()}>
                결제
            </div>
        </div>
    </OrderStyled>
    </>
    )
}


const OrderStyled = styled.div`
    width: 1300px;
    min-width: 950px;
    margin: 0px auto;
    
    .all-order-button,
    .choice-order-button{
        width: 120px;
        height: 40px;
        background-color: #2e2e2e;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        margin: 0px 5px;
        cursor: pointer;
    }

    .all-order-button{ 
        background-color: #2e2e2e; 
        border: 1px solid #2e2e2e; 
    }
    .choice-order-button{ 
        background-color: #aaaaaa; 
        border: 1px solid #aaaaaa; 
    }

    .all-order-button:hover{ 
        background-color: white; 
        color: #2e2e2e; 
    }
    .choice-order-button:hover{ 
        background-color: white; 
        color: #2e2e2e; border: 
        1px solid #2e2e2e; 
    }



    >table{
        border-collapse: collapse;
    }

    .basket-box>table{
        width: 1150px;
        margin: 0 auto 50px;
    }

    .price-info>table{
        width: 1150px;
        margin: 0 auto 50px;
        text-align: center;

        .price-info-text{
            height: 60px;
            font-weight: 400;
            font-size: 13px;
        }

        .price-info-amount{
            height: 80px;
            font-weight: 900;
            font-size: 20px;
        }
    }



    td{
        border: 1px solid var(--border-gray-light);
    }

    .table-top-1,
    .table-top-2,
    .table-top-3,
    .table-top-4,
    .table-top-5,
    .table-top-6,
    .table-top-7,
    .table-top-8,
    .table-top-9{
        border: 1px solid var(--border-gray-light);
        font-size: 11px;
        height: 35px;
        color: #2e2e2e;
        font-weight: 400;
        text-align: center;
    }

    .table-top-1{ width: 20px; }
    .table-top-2{ width: 80px; }
    .table-top-3{ width: 50%; }
    .table-top-5{ width: 70px; }

    .table-top-4,
    .table-top-6,
    .table-top-7,
    .table-top-8,
    .table-top-9{
        width: 80px;
    }

    .table-content-1,
    .table-content-2,
    .table-content-3,
    .table-content-4,
    .table-content-5,
    .table-content-6,
    .table-content-7,
    .table-content-8,
    .table-content-9{
        border: 1px solid var(--border-gray-light);
        font-size: 11px;
        height: 35px;
        color: #2e2e2e;
        font-weight: 400;
        text-align: center;
    }

    .table-content-3,
    .table-content-4,
    .table-content-9{
        font-weight: 800;
    }

    .table-content-4,
    .table-content-9{
        padding-right: 5px;
        text-align: right;
    }

`


export default Order