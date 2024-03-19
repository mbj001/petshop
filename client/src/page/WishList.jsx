import React, {useState, useEffect} from 'react'
import { getCookie } from '../config/cookie'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PageTitle from '../card/PageTitle'
import axios from 'axios'

function WishList() {
    const [allCheckVal, setAllCheckVal] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const user_id = getCookie("client.sid");
    const [wishlist_info, setWishlist_info] = useState([]);
    const selected_list = [];

    // 삭제버튼
    function delWishlist(wishlist_id){

        const confirm_num = window.confirm("정말 해당 상품을 삭제하시겠습니까?");

        if(confirm_num === true){
            axios.post("http://localhost:8080/client/delwishlist", {
                user_id: user_id,
                wishlist_id: wishlist_id
            })
            .then(({data}) => {
                if(data === 1){
                    alert("해당 상품이 삭제되었습니다.");
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else{
            
        }
    }

    // 관심상품 비우기
    function clearWishList(){
        const confirm_num = window.confirm("관심상품을 비우시겠습니까?");

        if(confirm_num === true){
            axios.post("http://localhost:8080/client/clearWishList", {
                user_id: user_id
            })
            .then(({data}) => {
                if(data === 1){
                    alert("관심상품이 모두 삭제되었습니다.");
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    function addAllBasket(){
        
    }

    function checkboxClickFunc(index){
        // 전체선택 클릭
        if(index === -1){
            let array = [];
            for(let i=0; i<wishlist_info.length; i++){
                array.push(wishlist_info[i]);
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
            setWishlist_info(array);            
        }
        // 개별선택 클릭
        else{
            let array = [];
            for(let i=0; i<wishlist_info.length; i++){
                array.push(wishlist_info[i]);
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
            setWishlist_info(array);
        }
    }

    useEffect(() => {
        // 로그인 되어있을 떄
        if(getCookie("client.sid")){
            axios.post("http://localhost:8080/client/wishlistInfo", {
                user_id: user_id,
            })
            .then(({data}) => {
                // 장바구니 목록 없음
                if(data === 0){

                }
                else{
                    let money = 0;
                    for(let i=0; i<data.length; i++){
                        data[i].count = 1;
                        data[i].checked = false;
                        if(money > 40000){
                            data[i].delivery_amout = 0;
                        }
                        else{
                            data[i].delivery_amout = 4000;
                        }
                    }
                    setWishlist_info(data);
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
    }, [])
    return (
    <>
    <PageTitle detail="wishlist" />
    <WishListStyle>
        <div className="basket-box">
            <table>
                <tr>
                    <td className="table-top-1"><input type="checkbox" checked={allCheckVal} readOnly onClick={() => checkboxClickFunc(-1)}/></td>
                    <td className="table-top-2">이미지</td>
                    <td className="table-top-3">상품정보</td>
                    <td className="table-top-4">판매가</td>
                    {/* <td className="table-top-5">수량</td> */}
                    <td className="table-top-6">적립금</td>
                    <td className="table-top-7">배송구분</td>
                    <td className="table-top-8">배송비</td>
                    <td className="table-top-9">합계</td>
                    <td className="table-top-10">선택</td>
                </tr>
                {
                    wishlist_info.length !== 0 ?
                    wishlist_info.map((item, index) => (
                        <tr key={index}>
                            <td className="table-content-1"><input type="checkbox" checked={item.checked} onClick={() => checkboxClickFunc(index)} readOnly/></td>
                            <td className="table-content-2"><img src={"/image/menu/" + item.image} alt="menu_image" /></td>
                            <td className="table-content-3">{item.name}</td>
                            {/* <td className="table-content-3">{item.checked}</td> */}
                            <td className="table-content-4">￦{item.price}</td>
                            {/* <td className="table-content-5">{item.count}</td> */}
                            <td className="table-content-6">
                                <div className="flex items-center justify-center">
                                    <img src="/image/reserver_image.gif" alt="reserver_image" className="pr-[5px]" />{item.price * 2 / 100}원
                                </div>
                            </td>
                            <td className="table-content-7">업체기본배송</td>
                            <td className="table-content-8">￦{item.delivery_amout}</td>
                            <td className="table-content-9">￦{item.price + item.delivery_amout}</td>
                            <td className="table-content-10">
                                {/* <div className="box-1">
                                    <p>주문하기</p>
                                </div> */}
                                <div className="box-1">
                                    <p>장바구니담기</p>
                                </div>
                                <div className="box-2" onClick={() => delWishlist(item.wishlist_id)}>
                                    <p>삭제</p>
                                </div>
                            </td>
                        </tr>
                    ))
                    :
                    <tr>
                        <td colSpan={9} className="h-[80px] text-center">
                            <div>
                                <p>관심상품 목록이 비어있습니다.</p>
                            </div>
                        </td>
                    </tr>
                }
            </table>
        </div>
        {
            wishlist_info.length !== 0 &&
            <div className="flex justify-center">
                <p className="all-order-button" onClick={() => addAllBasket()}>전체장바구니 추가</p>
                <div className="choice-order-button" onClick={() => clearWishList()}>관심상품비우기</div>
            </div>
        }
    </WishListStyle>
    </>
    )
}

const WishListStyle = styled.div`
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
.table-top-9,
.table-top-10{
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
.table-top-10{ width: 120px; }

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
.table-content-9,
.table-content-10{
    border: 1px solid var(--border-gray-light);
    font-size: 11px;
    height: 35px;
    color: #2e2e2e;
    font-weight: 400;
    text-align: center;
    
    .box-1{
        width: 100px;
        height: 20px;
        background-color: #2e2e2e;
        color: white;
        border: 1px solid #2e2e2e;
        margin: 0px auto 7px;
        cursor: pointer;

        &:hover{
            color: #2e2e2e;
            background-color: white;
        }
    }

    .box-2{
        width: 100px;
        height: 20px;
        background-color: white;
        color: #2e2e2e;
        border: 1px solid var(--border-gray-light);
        margin: 7px auto 0px;
        cursor: pointer;

        &:hover{
            background-color: #cccccc;
        }
    }


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

export default WishList