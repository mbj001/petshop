import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'

function Button() {

    const [stateVal, setStateVal] = useState([]);

    function clickBtn(){
        axios.get("http://localhost:8080/clientBtn")
        .then(({data}) => {
            setStateVal(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
        <div>
            <button onClick={clickBtn}>클릭</button>
        </div>
        <div>
            {
                stateVal.length !== 0 &&
                stateVal.map((item, index) => (
                    <p>{item.num} : {item.name}</p>
                )) 
            }
        </div>
        {/* <ButtonBox onClick={}>
            
        </ButtonBox> */}
        </>
    )
}

const ButtonBox = styled.div`
    width: 200px;
    height: 100px;
    background-color: black;
`
export default Button