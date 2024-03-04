import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function MenuCard({menu_id, name, price, image}) {
    return (
        <MenuCardStyled>
            <Link to={"/productDetail/" + menu_id}>
                <img src={"/image/menu/" + image} alt={image} />
                <p className="card-name">{name}</p>
            </Link>
            <p className="card-price">￦{price}</p>
        </MenuCardStyled>
    )
}

const MenuCardStyled = styled.div`
    width: 250px;
    // width: 13%;
    margin: 10px;
    text-align: center;
    
    .card-name{
        padding-top: 7px;
        padding-bottom: 7px;
        border-bottom: 1px solid #cfcfcf;
        font-size: 14px;
    }

    .card-price{
        color: rgb(239 68 68);
        font-size: 12px;
    }

    &:hover .card-name{
        border-bottom: 1px solid black;
        transition: 0.5s;
    }
`


export default MenuCard