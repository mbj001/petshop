import styled from "styled-components"

export const ButtonBlack = styled.div`
    border: 1px solid #2e2e2e;
    background-color: #2e2e2e;
    color: white;
    border-radius: 3px;
    cursor: pointer;
    width: ${(props) => props.width};
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    margin: 5px;

    &:hover{
        color: #2e2e2e;
        background-color: white;
    }
`

export const ButtonWhite = styled.div`
    border: 1px solid #2e2e2e;
    background-color: white;
    color: #2e2e2e;
    border-radius: 3px;
    cursor: pointer;
    width: ${(props) => props.width};
    text-align: center;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    margin: 5px;

    &:hover{
        color: white;
        background-color: #2e2e2e;
    }
`