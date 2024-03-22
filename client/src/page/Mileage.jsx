import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import PageTitle from '../card/PageTitle'
import { getCookie } from '../config/cookie'

function Mileage() {

    const params = useParams().mileage_params;
    const [mileage_info, setMileage_info] = useState([]);
    const [available_mileage, setAvailable_mileage] = useState(0);
    const [used_mileage, setUsed_mileage] = useState(0);
    const [all_mileage, setAll_mileage] = useState(0);
    

    useEffect(() => {
        axios.post("http://localhost:8080/client/mileageInfo", {
            user_id: getCookie("client.sid")
        })
        .then(({data}) => {
            setMileage_info(data);
            for(let i=0; i<data.length; i++){
                setAll_mileage((all_mileage) => all_mileage + data[i].accumulate_mileage);
                setUsed_mileage((used_mileage) => used_mileage + data[i].use_mileage);
            }
            axios.post("http://localhost:8080/client/availableMileage", {
                user_id: getCookie("client.sid")
            })
            .then(({data}) => {
                setAvailable_mileage(data);
            })
            .catch((err) => {
                console.log(err);
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    return (
    <>
    <PageTitle detail="mileage" />
    <MileageStyle>
        <div className="mileage-amount">
            <div>
                <p>총 적립금</p>
                <p>{all_mileage}원</p>
            </div>
            <div>
                <p>사용 가능 적립금</p>
                <p>{available_mileage}원</p>
            </div>
            <div>
                <p>사용한 적립금</p>
                <p>{used_mileage}원</p>
            </div>
        </div>
        <ul>
            <li><NavLink to="/mileage/accumulate" className={({isActive}) => isActive ? "active" : ""}>적립 마일리지</NavLink></li>
            <li><NavLink to="/mileage/used" className={({isActive}) => isActive ? "active" : ""}>사용 마일리지</NavLink></li>
        </ul>
        <table>
            <thead>
                <tr>
                    <td className="td-1">주문날짜</td>
                    <td className="td-2">적립금</td>
                    <td className="td-3">관련주문</td>
                    <td className="td-4">내용</td>
                </tr>
            </thead>
            <tbody>
                {
                    mileage_info.length !== 0 &&
                    mileage_info.map((item, index) => (
                        <>
                        {
                            params === "accumulate" && item.accumulate_mileage !== 0 &&
                            <tr>
                                <td>{item.mileage_date_format}</td>
                                <td>{item.accumulate_mileage}</td>
                                <td>관련주문 column 추가필요</td>
                                <td>{item.description}</td>
                            </tr>
                        }
                        {
                            params === "used" && item.use_mileage !== 0 &&
                            <tr>
                                <td>{item.mileage_date_format}</td>
                                <td>{item.use_mileage}</td>
                                <td>관련주문 column 추가필요</td>
                                <td>{item.description}</td>
                            </tr>
                        }
                        </>
                    ))
                }
            </tbody>
        </table>
    </MileageStyle>
    </>
    )
}

const MileageStyle = styled.div`
    width: 1300px;
    min-width: 950px;
    margin: 0 auto;

    .active{
        background-color: #cccccc;
    }

    ul{

        margin: 50px auto 0px;
        border-collapse: collapse;
        list-style: none;
        display: flex block;
        width: 1150px;
        height: 40px;
        
        li{
            display: flex;
            width: 50%;
            border: 1px solid black;
            
            &:nth-child(2){
                border-left: 0;
            }

            >a{
                display: block;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

    }

    .mileage-amount{
        width: 800px;
        margin: 0 auto;
        border: 1px solid gray;
        padding: 0px 50px;

        p{
            font-size: 12px;
            margin: 10px 0px;
        }

        >div{
            display: flex;
            justify-content: space-between;
        }
    }

    >table{
        margin: 0px auto;
        width: 1150px;

        td{
            text-align: center;
            height: 40px;
            border: 1px solid var(--border-gray-light);
            color: #2e2e2e;
            font-size: 13px;
        }

        .td-1{ width: 200px; }
        .td-2{ width: 200px; }
        .td-3{ width: 350px; }
        .td-4{ width: 400px; }
    }

`


export default Mileage