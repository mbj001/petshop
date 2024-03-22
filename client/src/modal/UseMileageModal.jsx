import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { ModalStyled } from '../styled-component/Modal'
import { ButtonWhite, ButtonBlack } from '../styled-component/Button'
import { getCookie } from '../config/cookie'

function UseMileageModal({setUse_mileage, setMileageModal}) {

    const [available_mileage, setAvailable_mileage] = useState(0);
    const [input_mileage, setInput_mileage] = useState(0);

    function useMileageFunc(){
        if(input_mileage < 0){
            alert("0원 이상을 입력해주세요.");
        }
        else if(input_mileage > available_mileage){
            alert(available_mileage + "원 까지 사용할 수 있습니다.");
        }
        else{
            setUse_mileage(input_mileage);
            setMileageModal(false);
        }
    }

    useEffect(() => {
        axios.post("http://localhost:8080/client/availableMileage", {
            user_id: getCookie("client.sid")
        })
        .then(({data}) => {
            setAvailable_mileage(data);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
    <UseMileageStyle>
        <div className="modal-box">
            <div className="mileage-head">마일리지</div>
            <div className="mileage-main"><input type="number" placeholder='0' onChange={(e) => setInput_mileage(e.target.value)}/>원</div>
            <div className="mileage-comment">(총 사용가능한 적립금: <span className="font-bold">{available_mileage} </span>원)</div>
            <div className="flex justify-center">
                <ButtonWhite width="80px" onClick={() => setMileageModal(false)}>취소</ButtonWhite>
                <ButtonBlack width="80px" onClick={useMileageFunc}>사용하기</ButtonBlack>
            </div>
        </div>
    </UseMileageStyle>
    )
}

const UseMileageStyle = styled(ModalStyled)`
    .mileage-head{
        text-align: center;
        margin-top: 15px;
        font-size: 15px;
        font-weight: 600;
    }

    .mileage-main{
        text-align: center;
        margin-top: 35px;
        >input{
            width: 150px;
            border: 1px solid var(--border-gray-light);
            position: right;
            text-align: right;
            margin-right: 5px;
            padding-right: 10px;
        }
    }

    .mileage-comment{
        text-align: center;
        font-size: 12px;
        margin-bottom: 25px;
    }
`



export default UseMileageModal