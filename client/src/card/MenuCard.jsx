import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function MenuCard({menu_id, name, price, accumulate_mileage, image, isCountSix, bestRank, likey, total_sale, isBest}) {
    return (
        <MenuCardStyled $isCountSix={isCountSix === true? true : false}>
            {
                isBest === true &&
                <BestLogo>
                    <p>BEST {bestRank}</p>
                </BestLogo>
            }
            <Link to={"/productDetail/" + menu_id}>
                <img src={"/image/menu/" + image} alt={image} />
                <p className="card-name">{name}</p>
            </Link>
            <p className="card-price">￦{price}</p>
            <div className="flex justify-center items-center">
                <img src="/image/reserver_image.gif" alt="reserver_image" />
                <p className="text-[11px] ml-[3px]">{price * 2 / 100}원 (2%)</p>
            </div>
            <div className="flex items-center justify-center mt-[5px]">
                {
                    likey >= 10 &&
                    <img src="/image/top_likey.gif" alt="top-likey-image" className="px-[3px]" />
                }
                {
                    total_sale >= 10 &&
                    <img src="/image/top_sale.gif" alt="top-sale-image" className="px-[3px]" />
                }
            </div>
        </MenuCardStyled>
    )
}

const MenuCardStyled = styled.div`
    width: ${(props) => props.$isCountSix? "200px" : "250px"};
    // width: 13%;
    margin: 10px;
    text-align: center;
    margin-bottom: 100px;
    
    .card-name{
        padding-top: 7px;
        padding-bottom: 7px;
        border-bottom: 1px solid #cfcfcf;
        font-size: 12px;
        margin-bottom: 8px;
    }

    .card-price{
        color: var(--price-red);
        font-size: 12px;
    }

    &:hover .card-name{
        border-bottom: 1px solid black;
        transition: 0.5s;
    }
`

const BestLogo = styled.div`
    position: absolute;
    color: white;
    background-color: rgba(0, 0, 0, 0.35);

    p{
        font-size: 9px;
        padding: 3px;
    }
`


export default MenuCard