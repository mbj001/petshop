import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function DetailList({detail_num}) {
    return (
    <DetailListStyle>
        <table>
            <tr>
                <td className={detail_num === 1 ? "active" : ""}><Link>관련상품</Link></td>
                <td className={detail_num === 2 ? "active" : ""}><Link>상품상세</Link></td>
                <td className={detail_num === 3 ? "active" : ""}><Link>REVIEW</Link></td>
                <td className={detail_num === 4 ? "active" : ""}><Link>Q&A</Link></td>
            </tr>
        </table>
    </DetailListStyle>
    )
}

const DetailListStyle = styled.div`

    min-width: 950px;

    >table{
        margin: 0 auto 30px;

        td{
            text-align: center;
            border: 1px solid #cccccc;
            width: 200px;
            height: 40px;
            font-size: 13px;
            color: #777777;
            
            &:hover{
                background-color: #dddddd;
                color: #2e2e2e;
            }
            
            a{
                display: block;
            }
        }
        
        .active{
            background-color: #dddddd;
            color: #2e2e2e;
        }
    }
`

export default DetailList