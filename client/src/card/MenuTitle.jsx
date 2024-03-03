import React from 'react'
import styled from 'styled-components'

function MenuTitle({titleName}) {
    return (
        <MenuTitleStyle>
            <p>{titleName}</p>
        </MenuTitleStyle>
    )
}

const MenuTitleStyle = styled.div`
    width: 150px;
    height: 40px;
    margin: 40px auto;
    border-top: 1px solid black;
    border-bottom: 1px solid gray;
    text-align: center;
    
    >p{
        line-height: 35px;
        color: gray;
    }
`

export default MenuTitle