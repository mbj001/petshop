import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import PageTitle from '../card/PageTitle'
import AddressModal from '../component/AddressModal';
import axios from "axios";
import { getCookie } from '../config/cookie';
import { Link } from 'react-router-dom';

function Modify() {
    const [user_info, setUser_info] = useState([]);

    // 전화번호 1, 2, 3 번째 박스
    const [phone_first, setPhone_first] = useState("");
    const [phone_second, setPhone_second] = useState("");
    const [phone_third, setPhone_third] = useState("");
    // 생년월일 1, 2, 3 번째 박스
    const [birth_year, setBirth_year] = useState("");
    const [birth_month, setBirth_month] = useState("");
    const [birth_day, setBirth_day] = useState("");

    const [address_modal_up, set_Address_modal_up] = useState(false);
    const [password_check, setPassword_check] = useState("");

    // 각각 전화번호 박스 바뀌었을 때
    useEffect(() => {
        setUser_info({...user_info, user_phone: phone_first + phone_second + phone_third});
    }, [phone_first, phone_second, phone_third]);

    useEffect(() => {
        setUser_info({...user_info, user_birth: birth_year+"-"+birth_month+"-"+birth_day})
    }, [birth_year, birth_month, birth_day]);

    useEffect(() => {
        // const user_id = getCookie("client.sid");
        axios.post("http://localhost:8080/client/getInfo", {
            user_id: getCookie("client.sid")
        })
        .then(({data}) => {
            setUser_info(data);
        })
    }, [])

    // 미구현
    function modifyFunc(){
        // axios.post("http://localhost:8080/client/signup", {
        //     user_info: user_info
        // })
        // .then(({data}) => {
        //     if(data === -1){
        //         console.log("회원 가입 에러");
        //     } 
        //     else if(data === 1) {
        //         alert("회원가입 성공");
        //         window.location ="http://localhost:3000/signin";
        //         console.log("회원가입 성공!! 로그인 페이지로 이동합니다.");
        //     }
        // })
        // .catch((err) => {
        //     console.log("에러 입니다.");
        // })
    }

    return (
        <>
        {address_modal_up === true && <AddressModal set_Address_modal_up={set_Address_modal_up} />}

        <SignupStyled>
            <PageTitle detail="signup" />
    
            <table>
                <tr>
                    <td className="info-box-item"><div><p>회원구분</p><img src="/image/sign_up_star.gif" alt="star" /></div></td>
                    <td className="info-box-input"><div><input type="radio" checked />개인회원</div></td>
                </tr>
                <div className="mt-[50px] font-bold mb-[20px]">
                    <p>기본정보</p>
                </div>
                <tr>
                    <td className="info-box-item"><div><p>아이디</p><img src="/image/sign_up_star.gif" alt="star" /></div></td>
                    <td className="info-box-input"><div><input type="text" value={user_info.user_id} onChange={(e) => setUser_info({...user_info, user_id: e.target.value})} /><p>아이디를 입력해 주세요. (영문소문자/숫자, 4~16자)</p></div></td>
                </tr>
                <tr>
                    <td className="info-box-item"><div><p>비밀번호</p><img src="/image/sign_up_star.gif" alt="star" /></div></td>
                    <td className="info-box-input"><div><input type="password" onChange={(e) => setUser_info({...user_info, user_pw: e.target.value})}/><p>(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자)</p></div></td>
                </tr>
                <tr>
                    <td className="info-box-item"><div><p>비밀번호 확인</p><img src="/image/sign_up_star.gif" alt="star" /></div></td>
                    <td className="info-box-input">
                        <div>
                            <input type="password" onChange={(e) => setPassword_check(e.target.value) }/>
                            {
                                password_check === user_info.user_pw ?
                                <p>비밀번호가 일치합니다.</p>
                                :
                                <p className="text-red-500">비밀번호가 일치하지 않습니다.</p>
                            }
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="info-box-item"><div><p>비밀번호 확인 질문</p><img src="/image/sign_up_star.gif" alt="star" /></div></td>
                    <td className="info-box-input">
                        <div>
                            <select name="pass-question" onChange={(e) => setUser_info({...user_info, user_pw_confirm_number: e.target.value})}>
                                { user_info.user_pw_confirm_number === 1 ? <option value="1" selected>기억에 남는 추억의 장소는?</option> : <option value="1">기억에 남는 추억의 장소는?</option> }
                                { user_info.user_pw_confirm_number === 2 ? <option value="2" selected>자신의 인생 좌우명은?</option> : <option value="1">자신의 인생 좌우명은?</option> }
                                { user_info.user_pw_confirm_number === 3 ? <option value="3" selected>자신의 보물 제 1호는?</option> : <option value="1">자신의 보물 제 1호는?</option> }
                                { user_info.user_pw_confirm_number === 4 ? <option value="4" selected>가장 기억에 남는 선생님 성함은?</option> : <option value="1">가장 기억에 남는 선생님 성함은?</option> }
                                { user_info.user_pw_confirm_number === 5 ? <option value="5" selected>타인이 모르는 자신만의 신체비밀이 있다면?</option> : <option value="1">타인이 모르는 자신만의 신체비밀이 있다면?</option> }
                                { user_info.user_pw_confirm_number === 6 ? <option value="6" selected>받았던 선물 중 기억에 남는 독특한 선물은?</option> : <option value="1">받았던 선물 중 기억에 남는 독특한 선물은?</option> }
                            </select>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="info-box-item"><div><p>비밀번호 확인 답변</p><img src="/image/sign_up_star.gif" alt="star" /></div></td>
                    <td className="info-box-input"><div><input type="text" className="w-[400px]" value={user_info.user_pw_confirm_answer} onChange={(e) => setUser_info({...user_info, user_pw_confirm_answer: e.target.value})}/></div></td>
                </tr>
                <tr>
                    <td className="info-box-item"><div><p>이름</p><img src="/image/sign_up_star.gif" alt="star" /></div></td>
                    <td className="info-box-input"><div><input type="text" value={user_info.user_name} onChange={(e) => setUser_info({...user_info, user_name: e.target.value})}/></div></td>
                </tr>
                <tr>
                    <td className="info-box-item"><div><p>주소</p><img src="/image/sign_up_star.gif" alt="star" /></div></td>
                    <td className="info-box-input">
                        <div className="mt-[4px]">
                            <input type="text" /><button type="button" onClick={() => set_Address_modal_up(!address_modal_up)}>우편번호</button>
                        </div>
                        <div className="address-input my-[4px]">
                            <input type="text" className="w-[300px]" /><p>기본주소</p>
                        </div>
                        <div className="mb-[4px]">
                            <input type="text" className="w-[300px]" /><p>나머지주소</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="info-box-item"><div><p>휴대전화</p><img src="/image/sign_up_star.gif" alt="star" /></div></td>
                    <td className="info-box-input">
                        <div>
                            <select name="phone-head-number" onChange={(e) => setPhone_first(e.target.value)}>
                                <option value="010">010</option>
                                {/* <option value="031">031</option>
                                <option value="032">032</option>
                                <option value="033">033</option>
                                <option value="041">041</option>
                                <option value="042">042</option>
                                <option value="043">043</option>
                                <option value="044">044</option> */}
                            </select>
                            <span className="px-[3px]">-</span>
                            {
                                user_info.user_phone &&
                                <>
                                <input type="text" className="w-[60px]" value={user_info.user_phone.substring(0, 4)} onChange={(e) => setPhone_second(e.target.value)}/>
                                <span className="pr-[3px] ml-[-2px]">-</span>
                                <input type="text" className="w-[60px]" value={user_info.user_phone.substring(4, 8)} onChange={(e) => setPhone_third(e.target.value)}/>
                                </>
                            }
                            </div>
                    </td>
                </tr>
                <tr>
                    <td className="info-box-item"><div><p>이메일</p><img src="/image/sign_up_star.gif" alt="star" /></div></td>
                    <td className="info-box-input"><div><input type="text" value={user_info.user_email} onChange={(e) => setUser_info({...user_info, user_email: e.target.value})}/></div></td>
                </tr>
                <div className="mt-[50px] font-bold mb-[20px]">
                    <p>추가정보</p>
                </div>
                <tr>
                    <td className="info-box-item"><p>성별</p></td>
                    <td className="info-box-input">
                        {
                            user_info.user_gender === "male" ?
                            <div>
                                <input type="radio" name="gender" value="male" checked onChange={(e) => setUser_info({...user_info, user_gender: e.target.value})} />남성
                                <input type="radio" name="gender" value="female" className="ml-[10px]" onChange={(e) => setUser_info({...user_info, user_gender: e.target.value})} />여성
                            </div>
                            :
                            <div>
                                <input type="radio" name="gender" value="male" checked onChange={(e) => setUser_info({...user_info, user_gender: e.target.value})} />남성
                                <input type="radio" name="gender" value="female" checked className="ml-[10px]" onChange={(e) => setUser_info({...user_info, user_gender: e.target.value})} />여성
                                
                            </div>
                        }
                    </td>
                </tr>
                <tr>
                    <td className="info-box-item"><p>생년월일</p></td>
                    <td className="info-box-input">
                        {
                            user_info.user_birth_format &&
                            <div>
                                <input type="text" className="w-[60px]" value={user_info.user_birth_format.split("-")[0]} onChange={(e) => setBirth_year(e.target.value)} /><span className="mr-[3px]">년</span>
                                <input type="text" className="w-[40px]" value={user_info.user_birth_format.split("-")[1]} onChange={(e) => setBirth_month(e.target.value)} /><span className="mr-[3px]">월</span>
                                <input type="text" className="w-[40px]" value={user_info.user_birth_format.split("-")[2]} onChange={(e) => setBirth_day(e.target.value)} />일
                            </div>
                        }
                    </td>
                </tr>
                <tr>
                    <td className="info-box-item"><p>애견의 종류와 나이</p></td>
                    <td className="info-box-input">
                        <div>
                            <input type="text" className="w-[500px]" value={user_info.user_pet_info} onChange={(e) => setUser_info({...user_info, user_pet_info: e.target.value})}/>
                        </div>
                    </td>
                </tr>
            </table>
            <div className="flex justify-center">
                <div className="modify-button" onClick={() => modifyFunc()}>
                    <p>회원정보수정</p>
                </div>
                <div className="delete-button">
                    <Link to="/">취소</Link>
                </div>
            </div>
        </SignupStyled>
        </>
    )
}

const SignupStyled = styled.div`
    width: 1100px;
    min-width: 950px;
    margin: 30px auto 0px;

    >table{
        margin-top: 50px;
    }

    .info-box{
        // display: flex;
        // Display: table;
        border-collapse: collapse;
    }

    .star-mark{
        font-size: 20px;
        color: blue;
    }

    .info-box-item{
        font-size: 11px;
        color: #2e2e2e;
        width: 150px;
        height: 35px;
        padding-left: 20px;
        border: 1px solid #cccccc;
        
        >div{
            display: flex;
            align-items: center;
            
            >img{
                margin-left: 3px;
                width: 7px;
                height: 7px;
            }
        }

    }

    .info-box-input{
        font-size: 11px;
        color: #2e2e2e;
        width: 950px;
        border: 1px solid #cccccc;
        padding-left: 15px;

        
        >div{

            >select{
                height: 23px;
            }

            display: flex;
            align-items: center;
            
            >input[type="radio"]{
                margin-right: 3px;
            }
            
            >input[type="text"], >input[type="password"]{
                padding-left: 5px;
                margin-right: 5px;
                // width: 150px;
                border: 1px solid #cccccc;
                height: 23px;
            }
            
            >input[type="text"]:focus, >input[type="password"]:focus{
                outline: none;
            }

            >select{
                border: 1px solid #cccccc;
            }

            >button{
                border: 1px solid #cccccc;
                padding: 2px 7px;
            }
        }
    }

    .modify-button{
        width: 110px;
        background-color: #2e2e2e;
        margin: 30px 10px;
        text-align: center;
        color: white;
        padding: 8px 0px;
        font-size: 12px;
        font-weight: 400;
        border-radius: 2px;
        cursor: pointer;
        border: 1px solid #2e2e2e;

        &:hover{
            background-color: white;
            color: #2e2e2e;
        }
    }

    .delete-button{
        width: 110px;
        background-color: #aaaaaa;
        margin: 30px 10px;
        text-align: center;
        color: white;
        padding: 8px 0px;
        font-size: 12px;
        font-weight: 400;
        border-radius: 2px;
        cursor: pointer;
        border: 1px solid #aaaaaa;

        &:hover{
            border: 1px solid #2e2e2e;
            background-color: white;
            color: #2e2e2e;
        }
    }


`

export default Modify