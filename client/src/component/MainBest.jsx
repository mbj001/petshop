import React, {useState, useEffect} from 'react'
import axios from "axios"
import styled from 'styled-components'
import MenuCard from '../card/MenuCard';
import MenuTitle from '../card/MenuTitle';

function MainBest() {
    
    const [mainBestData, setMainBestData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/main/mainBest")
        .then(({data}) => {
            setMainBestData(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])
    
    return (
        <>
        <MenuTitle titleName="B E S T" />
        {
            mainBestData.length !== 0 &&
            <MainBestComp>
                {
                    mainBestData.map((item, index) => (
                        <MenuCard menu_id={item.menu_id} name={item.name} price={item.price} image={item.image} isbest={true} bestRank={index+1} />
                    ))
                }
            </MainBestComp>

        }        
        </>
    )
}

const MainBestComp = styled.div`
    min-width: 950px;
    width: 80%;
    display: flex;
    justify-content: center;
    margin: 0 auto;

    .title{
        border-top: 2px solid black;
        border-bottom: 1px solid gray;
    }
`

export default MainBest