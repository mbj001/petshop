import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { BsExclamationLg } from "react-icons/bs";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { getCookie } from '../config/cookie';
import { Link } from 'react-router-dom';
import BasketCompleteModal from '../modal/BasketCompleteModal';

function ProductDetail() {

    const user_id = getCookie("client.sid");
    const {menu_id} = useParams();
    const [product_info, setProduct_info] = useState([]);
    const [order_count, setOrder_count] = useState(1);
    const [basketModal, setBasketModal] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/clientProduct/productDetail/" + menu_id)
        .then(({data}) => {
            setProduct_info(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    function orderCountMinus(){
        if(order_count === 1){
            alert("최소 주문 갯수는 1개 입니다.");
        }
        else{
            setOrder_count(order_count - 1);
        }
    }

    function orderCountPlus(){
        setOrder_count(order_count + 1);
    }

    function addBasketFunc(){
        axios.post("http://localhost:8080/client/addBasket", {
            user_id: user_id,
            menu_id: product_info[0].menu_id,
            count: order_count,
            total_price: Number(order_count) * Number(product_info[0].price)
        })
        .then(({data}) => {
            if(data === 1){
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        product_info.length !== 0 &&
        <ProductDetailStyled>
            { basketModal === true && <BasketCompleteModal setBasketModal={setBasketModal} /> }
            <div className="mr-[80px]">
                <img src={"/image/menu/" + product_info[0].image} alt="menu_image" className="w-full" />
            </div>
            <div className="product-info ml-[80px]">
                <div className="order-info">
                    <p className="my-[10px] text-[14px] font-bold">{product_info[0].name}</p>
                    <div className="flex">
                        <div className="w-[100px]">
                            <p className="info-name">제조사</p>
                            <p className="info-name">원산지</p>
                            <p className="info-name">소비자가</p>
                            <p className="info-name">판매가</p>
                            <p className="info-name">적립금</p>
                            <p className="info-name">브랜드</p>
                            <p className="info-name">보관방법</p>
                            <p className="info-name">배송비</p>
                        </div>
                        <div>
                            <p className="info-value">해피팡팡</p>
                            <p className="info-value">국내</p>
                            <p className="info-value line-through">￦{product_info[0].price}</p>
                            <p className="info-price">￦{product_info[0].price}</p>
                            <p className="info-value">￦{product_info[0].price * 2 / 100}원</p>
                            <p className="info-value">해피팡팡</p>
                            <p className="info-value">냉동보관</p>
                            <p className="info-value">￦3,000(￦40,000 이상 구매 시 무료)</p>
                        </div>
                    </div>
                    <div className="require-box">
                        <div className="flex itmes-center mb-[5px]">
                            <BsExclamationLg className="exclamation-icon"/><p className="require-text">최소주문수량 1개 이상</p>
                        </div>
                        <div className="flex itmes-center">
                            <BsExclamationLg className="exclamation-icon"/><p className="require-text">수량을 선택해주세요.</p>
                        </div>
                    </div>
                    <div className="flex items-center px-[10px] pb-[10px]">
                        <p className="w-[180px] M-text-gray text-[12px]">{product_info[0].name}</p>
                        <div className="flex items-center w-[100px]">
                            <CiSquareMinus className="M-text-gray cursor-pointer" onClick={orderCountMinus}/>
                            <p className="order-count">{order_count}</p>
                            <CiSquarePlus className="M-text-gray cursor-pointer" onClick={orderCountPlus} />
                        </div>
                        <div className="text-[10px]">
                            <p className="font-bold">￦{product_info[0].price * order_count}</p>
                            <p>({(product_info[0].price * 2 / 100) * order_count}원)</p>
                        </div>
                    </div>
                </div>
                <div className="pt-[10px] mb-[10px] pl-[2px]">
                    <p className="text-[12px] font-bold">Total : ￦{product_info[0].price * order_count} <span className="M-text-444444 font-normal">({order_count}개)</span></p>
                </div>
                <div className="flex">
                    <Link to="/order" onClick={() => addBasketFunc()} state={{order_list: []}} className="buy-button font-bold">BUY IT NOW</Link>
                    <div className="cart-button flex items-center" onClick={() => {addBasketFunc(); setBasketModal(true)}}>
                        <BsCart2 className="m-auto"/>
                    </div>
                    <div className="heart-button flex items-center">
                        <IoMdHeartEmpty className="m-auto" />
                    </div>
                </div>
            </div>
        </ProductDetailStyled>
    )
}

const ProductDetailStyled = styled.div`
    // width: 80%;
    margin-top: 50px;
    min-width: 950px;
    display: flex;
    justify-content: center;

    img{
        width: 450px;
        height: 450px;
    }

    .product-info{
        width: 350px;
    }

    .order-info{
        border-top: 1px solid black;
        border-bottom: 1px solid black;
    }

    .info-name{
        font-size: 12px;
        margin: 8px 0px;
    }

    .info-value{
        font-size: 12px;
        color: gray;
        margin: 8px 0px;
    }

    .info-price{
        font-size: 12px;
        color: red;
        margin: 8px 0px;
    }

    .exclamation-icon{
        color: red;
        border: 1px solid #cccccc;
        border-radius: 2px;
        margin: 0px 8px;
    }

    .require-text{
        color: #aaaaaa;
        font-size: 10px;
    }

    .require-box{
        margin: 10px 0px;
        border-top: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        padding: 10px 0px;
    }

    .order-count{
        color: black;
        font-size: 13px;
        margin-top: -2px;
        margin-left: 5px;
        margin-right: 5px;
    }

    .buy-button{
        width: 150px;
        height: 50px;
        border: 1px solid black;
        background-color: black;
        color: white;
        text-align: center;
        margin: 0px 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .buy-button:hover{
        background-color: white;
        color: black;
    }

    .cart-button, .heart-button{
        width: 90px;
        margin: 0px 3px;
        border: 1px solid #aaaaaa;
        font-size: 22px;
        cursor: pointer;
        color: #777777;
    }

    .cart-button:hover, .heart-button:hover{
        border: 1px solid black;
        color: black;
    }
`

export default ProductDetail