import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getCookie } from '../config/cookie'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import PageTitle from '../card/PageTitle';
function Basket() {
    
    const [allCheckVal, setAllCheckVal] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const user_id = getCookie("client.sid");
    const {params} = useParams();
    const [basket_info, setBasket_info] = useState([]);
    const [order_price, SetOrder_price] = useState(0);
    const [delivery_price, setDelivery_price] = useState(3000);
    const selected_list = [];

    // 선택항목구매 클릭
    function orderListFunc(){
        for(let i=0; i<basket_info.length; i++){
            if(basket_info[i].checked === true){
                selected_list.push(basket_info[i]);
            }
        }
        if(isChecked === false){
            alert("한 가지 이상 선택해야 합니다.");
        }
    }

    function checkboxClickFunc(index){
        // 전체선택 클릭
        if(index === -1){
            let array = [];
            for(let i=0; i<basket_info.length; i++){
                array.push(basket_info[i]);
                if(allCheckVal === false){
                    array[i].checked = true;
                    setIsChecked(true);
                }
                else{
                    setIsChecked(false);
                    array[i].checked = false;
                }
            }
            setAllCheckVal(!allCheckVal);
            setBasket_info(array);            
        }
        // 개별선택 클릭
        else{
            let array = [];
            for(let i=0; i<basket_info.length; i++){
                array.push(basket_info[i]);
                if(i === index){
                    array[i].checked = !array[i].checked;
                }
            }
            for(let i=0; i<array.length; i++){
                if(array[i].checked === true){
                    setIsChecked(true);
                    break;
                }
                if(i === array.length-1){
                    setIsChecked(false);
                }
            }    
            setBasket_info(array);
        }
    }

    useEffect(() => {
        // 로그인 되어있을 떄
        if(getCookie("client.sid")){
            axios.post("http://localhost:8080/client/basketInfo", {
                user_id: user_id,
                buyitnow: false
            })
            .then(({data}) => {
                // 장바구니 목록 없음
                if(data === 0){

                }
                else{
                    let money = 0;
                    for(let i=0; i<data.length; i++){
                        data[i].checked = false;
                        money += data[i].total_price;
                        if(i === data.length-1){
                            // 배송비 설정
                            if(money > 40000){
                                setDelivery_price(0);
                            }
                            SetOrder_price(money);
                        }
                    }
                    // console.log(data);
                    setBasket_info(data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
        // 로그인 안되어있을 때
        else{   
            alert("로그인이 필요합니다.");
            window.location = "/signin";
        }
    }, [params])


    return (
    <OrderStyled>
        <PageTitle detail="basket" />
        <div className="basket-box">
            <table>
                <tr>
                    <td className="table-top-1"><input type="checkbox" checked={allCheckVal} readOnly onClick={() => checkboxClickFunc(-1)}/></td>
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
                    basket_info.length !== 0 ?
                    basket_info.map((item, index) => (
                        <tr key={index}>
                            <td className="table-content-1"><input type="checkbox" checked={item.checked} onClick={() => checkboxClickFunc(index)} readOnly/></td>
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
            <Link to="/order" className="all-order-button" state={{order_list: basket_info}}>전체상품주문</Link>
            {
                isChecked === true ?
                <Link to="/order" className="choice-order-button" onClick={() => orderListFunc()} state={{order_list: selected_list}}>선택상품주문</Link>
                :
                <div className="choice-order-button" onClick={() => orderListFunc()}>선택상품주문</div>
            }
        </div>
    </OrderStyled>
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

export default Basket