import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import DetailList from '../card/DetailList';

function DetailPoster({menu_id}) {

    const [imagelist, setImagelist] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/clientProduct/imagelist/"+menu_id)
        .then(({data}) => {
            setImagelist(data);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
    <>
    <PosterStyle>
    <DetailList detail_num={2} />
        {
            imagelist.map((item, index) => (
                <div key={index}>
                    <img src={"/image/detail/"+item.detail_image} alt={item.detail_image} className="m-auto"/>
                </div>
            ))
        }
    </PosterStyle>
    </>
    )
}

const PosterStyle = styled.div`
    width: 1400px;
    min-width: 950px;
    margin: 0px auto 0px;
`

export default DetailPoster