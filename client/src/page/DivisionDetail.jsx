import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MenuCard from '../card/MenuCard';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import DivisionDetailTitle from '../card/DivisionDetailTitle';

function DivisionDetail() {

    const [feedlist, setFeedlist] = useState([]);
    const {detail} = useParams();

    useEffect(() => {
        
        axios.get("http://localhost:8080/clientProduct/"+detail)
        .then(({data}) => {
        
            // 프리미엄 유산균 페이지는 바로 제품페이지로 이동
            if(detail === "premium"){
                window.location = "http://localhost:3000/productDetail/"+data[0].menu_id;
            }
            else{
                setFeedlist(data);
            }
        })
        .catch((err) => {
            console.log(err);
        })

    }, [detail])
    
    return (
    <>
    <DivisionDetailTitle detail={detail} />
    {
        setFeedlist.length !== 0 &&
        <FeedStyled>
            {
                feedlist.map((item, index) => (
                    <MenuCard key={item.menu_id} menu_id={item.menu_id} name={item.name} price={item.price} image={item.image} likey={item.likey} total_sale={item.total_sale} />
                ))
            }
        </FeedStyled>
    }
    </>
    )
}

const FeedStyled = styled.div`
    width: 100%;
    min-width: 1000px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 80%;
    margin: 0 auto;
`

export default DivisionDetail