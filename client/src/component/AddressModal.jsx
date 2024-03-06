import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
import { IoIosClose } from "react-icons/io";

function AddressModal({set_Address_modal_up}) {
    const complete = (data) =>{
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)

        // props.setcompany({
        //     ...props.company,
        //     address:fullAddress,
        // })
    }

    return (
        <AddressModalStyled>
            <div className="state-bar">
                <p>우편번호 검색</p>
                <IoIosClose className="close-icon" onClick={() => set_Address_modal_up(false)}/>
            </div>
            <DaumPostcode
                className="postmodal"
                autoClose
                onComplete={complete}
                />
        </AddressModalStyled>
    );
}

const AddressModalStyled = styled.div`
    z-index: 1000;
    position: fixed;
    width: 500px;
    // height: 300px;
    left: 20%;
    top: 350px;
    
    .state-bar{
        background-color: #666666;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 10px;
        padding-left: 15px;
        
        >p{
            font-size: 13px;
            color: white;
        }

        .close-icon{
            color: white;
            font-size: 30px;
            cursor: pointer;
        }
    }

    .postmodal{
         background : rgba(0,0,0,0.25);
        // position : fixed;
        height: 100%;
        width: 100%;
    }
`

export default AddressModal