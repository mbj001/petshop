import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

function ProductDetail() {

    const {menu_id} = useParams();
    const [product_info, setProduct_info] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/clientProduct/productDetail/" + menu_id)
        .then(({data}) => {
            setProduct_info(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])


    return (
        product_info.length !== 0 &&
        <ProductDetailStyled>
            <div className="mr-[80px]">
                <img src={"/image/menu/" + product_info[0].image} alt="menu_image" className="w-full" />
            </div>
            <div className="product-info ml-[80px]">
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
                        <p className="info-value">￦{product_info[0].price * 2 / 100}</p>
                        <p className="info-value">해피팡팡</p>
                        <p className="info-value">냉동보관</p>
                        <p className="info-value">￦3,000(￦40,000 이상 구매 시 무료)</p>
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
`

export default ProductDetail