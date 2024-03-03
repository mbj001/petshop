// 필드게인 수제사료
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MenuCard from '../card/MenuCard';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

function ProductDetail() {

    const [feedlist, setFeedlist] = useState([]);
    const {detail} = useParams();

    useEffect(() => {
        axios.get("http://localhost:8080/product/"+detail)
        .then(({data}) => {
            setFeedlist(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [detail])
    
    return (
    <>
    {
        setFeedlist.length !== 0 &&
        <FeedStyled>
        {
                feedlist.map((item, index) => (
                    <MenuCard division={detail} name={item.name} price={item.price} image={item.image} />
                ))
        }
        </FeedStyled>
    }
    </>
    )
}

const FeedStyled = styled.div`
    // width: 100%;
    min-width: 950px;
    display: flex;
    justify-content: center;
`

export default ProductDetail