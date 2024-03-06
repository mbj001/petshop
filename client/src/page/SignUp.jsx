import React, {useState} from 'react'
import styled from 'styled-components'
import PageTitle from '../card/PageTitle'
import AddressModal from '../component/AddressModal';

function SignUp() {

    const [signup_info, setSignup_info] = useState({
        user_id: "",
        user_pw: "",
        user_pw_confirm_number: "",
        user_pw_confirm_answer: "",
        user_name: "",
        user_address: "",
        user_phone: "",
        user_email: "",
        user_gender: "",
        user_birth: "",
        user_pet_info: ""
    })

    const [address_modal_up, set_Address_modal_up] = useState(false);

    function signupFunc(){
        console.log(signup_info);
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
                <td className="info-box-input"><div><input type="text" onChange={(e) => setSignup_info({...signup_info, user_id: e.target.value})} /><p>아이디를 입력해 주세요. (영문소문자/숫자, 4~16자)</p></div></td>
            </tr>
            <tr>
                <td className="info-box-item"><div><p>비밀번호</p><img src="/image/sign_up_star.gif" alt="star" /></div></td>
                <td className="info-box-input"><div><input type="password" /><p>(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자)</p></div></td>
            </tr>
            <tr>
                <td className="info-box-item"><div><p>비밀번호 확인</p><img src="/image/sign_up_star.gif" alt="star" /></div></td>
                <td className="info-box-input"><div><input type="password" /><p>비밀번호가 일치하지 않습니다.</p></div></td>
            </tr>
            <tr>
                <td className="info-box-item"><div><p>비밀번호 확인 질문</p><img src="/image/sign_up_star.gif" alt="star" /></div></td>
                <td className="info-box-input">
                    <div>
                        <select name="pass-question">
                            <option value="Q1">기억에 남는 추억의 장소는?</option>
                            <option value="Q2">자신의 인생 좌우명은?</option>
                            <option value="Q3">자신의 보물 제 1호는?</option>
                            <option value="Q4">가장 기억에 남는 선생님 성함은?</option>
                            <option value="Q5">타인이 모르는 자신만의 신체비밀이 있다면?</option>
                            <option value="Q6">받았던 선물 중 기억에 남는 독특한 선물은?</option>
                        </select>
                    </div>
                </td>
            </tr>
            <tr>
                <td className="info-box-item"><div><p>비밀번호 확인 답변</p><img src="/image/sign_up_star.gif" alt="star" /></div></td>
                <td className="info-box-input"><div><input type="text" className="w-[400px]" /></div></td>
            </tr>
            <tr>
                <td className="info-box-item"><div><p>이름</p><img src="/image/sign_up_star.gif" alt="star" /></div></td>
                <td className="info-box-input"><div><input type="text" /></div></td>
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
                        <select name="phone-head-number">
                            <option value="02">02</option>
                            <option value="031">031</option>
                            <option value="032">032</option>
                            <option value="033">033</option>
                            <option value="041">041</option>
                            <option value="042">042</option>
                            <option value="043">043</option>
                            <option value="044">044</option>
                        </select>
                        <span className="px-[3px]">-</span>
                        <input type="text" className="w-[60px]" />
                        <span className="pr-[3px] ml-[-2px]">-</span>
                        <input type="text" className="w-[60px]" />
                    </div>
                    
                </td>
            </tr>
            <tr>
                <td className="info-box-item"><div><p>이메일</p><img src="/image/sign_up_star.gif" alt="star" /></div></td>
                <td className="info-box-input"><div><input type="text" /></div></td>
            </tr>
            <div className="mt-[50px] font-bold mb-[20px]">
                <p>추가정보</p>
            </div>
            <tr>
                <td className="info-box-item"><p>성별</p></td>
                <td className="info-box-input">
                    <div>
                        <input type="radio" name="gender" value="male" />남성
                        <input type="radio" name="gender" value="female" className="ml-[10px]" />여성
                    </div>
                </td>
            </tr>
            <tr>
                <td className="info-box-item"><p>생년월일</p></td>
                <td className="info-box-input">
                    <div>
                        <input type="text" className="w-[60px]" /><span className="mr-[3px]">년</span>
                        <input type="text" className="w-[40px]" /><span className="mr-[3px]">월</span>
                        <input type="text" className="w-[40px]" />일
                    </div>
                </td>
            </tr>
            <tr>
                <td className="info-box-item"><p>애견의 종류와 나이</p></td>
                <td className="info-box-input">
                    <div>
                        <input type="text" className="w-[500px]" />
                    </div>
                </td>
            </tr>
        </table>
        <div className="signup-button" onClick={signupFunc}>
            회원가입
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

    .signup-button{
        width: 110px;
        background-color: #2e2e2e;
        margin: 30px auto;
        text-align: center;
        color: white;
        padding: 8px 0px;
        font-size: 12px;
        font-weight: 400;
        border-radius: 2px;
        cursor: pointer;

        &:hover{
            border: 1px solid #2e2e2e;
            background-color: white;
            color: #2e2e2e;
        }
    }


`

export default SignUp