import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components';
import MenuTitle from '../card/MenuTitle';
import MenuCard from '../card/MenuCard';

function MainPopular() {
    
    const [popularlist, setPopularlist] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/serverMain/popular")
        .then(({data}) => {
            console.log(data);
            setPopularlist(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <>
        <MenuTitle titleName="인기 수제간식" />
        {
            popularlist.length !== 0 &&
            <MainpopularComp>
                {
                    popularlist.map((item, index) => (
                        <MenuCard name={item.name} price={item.price} image={item.image} />
                    ))
                }
            </MainpopularComp>

        }        
        </>
    )
}

const MainpopularComp = styled.div`
    display: flex;
    min-width: 950px;
    flex-wrap: wrap;
    width: 80%;
    justify-content: center;
    margin: 0 auto;

`

export default MainPopular