import styled from 'styled-components'


export const ModalStyled = styled.div`
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

    .modal-box{
        width: 400px;
        height: 200px;
        background-color: white;
        border-radius: 5px;
    }
`
