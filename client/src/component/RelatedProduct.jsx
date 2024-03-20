import React, {useState, useEffect} from 'react'
import DetailList from '../card/DetailList'
import styled from 'styled-components'
import axios from 'axios'
import MenuCard from '../card/MenuCard'

function RelatedProduct({division}) {

    const [relativeList, setRelativeList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/clientProduct/relativeList/" + division)
        .then(({data}) => {
            setRelativeList(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    return (
    <>
    <DetailList detail_num={1}/>
    <RelatedProductStyle>
        {
            relativeList.map((item, index) => (
                <MenuCard key={item.menu_id} menu_id={item.menu_id} name={item.name} price={item.price} image={item.image} isCountSix={true}/>
            ))
        }
    </RelatedProductStyle>
    </>
    )
}

const RelatedProductStyle = styled.div`
    width: 1400px;
    min-width: 950px;
    display: flex;
    justify-content: center;
    margin: 0 auto;


`   
export default RelatedProduct