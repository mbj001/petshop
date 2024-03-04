// 필드게인 수제사료
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
        console.log("DivisionDetail UseEffect");
        axios.get("http://localhost:8080/clientProduct/"+detail)
        .then(({data}) => {
            setFeedlist(data);
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
                    <MenuCard key={item.menu_id} menu_id={item.menu_id} name={item.name} price={item.price} image={item.image} />
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
`

export default DivisionDetail