import React, { useContext, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import image1 from "../../images/kakao_signup.png"
import image2 from "../../images/naver_signup.png"
import { useNavigate } from "react-router-dom";
import { login } from "../../APIs/Auth";
import { AuthContext } from "../../App";
const Container = styled.div`
    border: 2px solid #7D7C7C;
    width: 500px;
    height: 70vh;
    padding: 20px;
    border-radius: 14px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TitleWrapper = styled.div`
  color: #F0790A;
  font-size: 36px;
  margin-bottom: 28px;
`
const ButtonWrapper = styled.div`
    width: 91%;
    background-color: #F0790A;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    margin-bottom: 33px;
`;
const Input = styled.input`
    padding: 4px;
    font-size: 18px;
    display: block;
    width: 440px;
    height: 52px;
    border: 2px solid #7D7C7C;
    border-radius: 14px;
    box-sizing: border-box;
    &:focus {
        outline: none;
    }
    &::placeholder {
        font-size: 12px;
    }
`;

const LineWrapper = styled.div`
  position: relative;
  height: 4px;
  width: 100%;
  margin-bottom: 24px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  content: "1";

`;

const TextBox = styled.div`
  width: 80px;
  background-color: #fff;
  position: absolute;
  z-index: 1;
  text-align: center;
  left: 41%;
  bottom: -6px;
`;

const ToSignupNavigator = styled.div`
    width: 91%;
    background-color: #ccc;
    border-radius: 14px;
    margin-top: 22px;
    display: flex;
    justify-content: center;
    font-size: 24px;
    padding: 4px 8px;
`;

function LoginCard(props) {
    const handleMode = props.handleMode
    const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
    const [formData, setFormData] = useState({
        id: "",
        password: "",
        isChecked: true,
    });
    const navigate = useNavigate();
    const handleSubmit = () => {
        //여기에 form 데이터를 서버로 제출하는 로직을 작성하고
        //임시로 콘솔창에 출력하겠습니다.
        console.log(formData);

        login(formData.id, formData.password, formData.isChecked).then(
            ()=>{
                const authInfo = {
                    isLoggedIn: true,
                    id: formData.id,
                };
                setIsLoggedIn(authInfo);
                localStorage.setItem("id", formData.id);
                navigate("/");
            }
        ).catch(
            ()=>{
                const authInfo = {
                    isLoggedIn: false,
                    id: '',
                };
                setIsLoggedIn(authInfo);
                console.log('로그인 실패 후 처리');
            }
        )
    };

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === "isChecked") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: checked,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    return (
        <Container>

            <TitleWrapper>
                Ja-Docter
            </TitleWrapper>
            <form>
                <Input
                    type="text"
                    name="id"
                    value={formData.id}
                    placeholder="이메일을 입력해주세요"
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={formData.password}
                    onChange={handleChange}
                />

                <div
                    className="login-state"
                    style={{
                        display: "flex",
                    }}
                >
                    <input
                        type="checkbox"
                        name="isChecked"
                        checked={formData.isChecked}
                        onChange={handleChange}
                    />
                    <p>로그인 상태 유지</p>
                </div>
            </form>

            <ButtonWrapper

            >
                <Button
                    style={{
                        position: "absolute",
                        left: "10px",
                        top: "10px", // 버튼을 아래로 이동시킴
                    }}
                    title={" 로그인 "}
                    size = {32}
                    bgcolor={"#F0790A"}
                    color={"#ffffff"}
                    onClick={handleSubmit}
                />
            </ButtonWrapper>

            <LineWrapper>
              <Line></Line>
              <TextBox>또는</TextBox>
            </LineWrapper>

            <ToSignupNavigator>
                <div>
                    계정이 없으신가요?
                </div>
                <div
                    style = {{
                        textDecoration: 'underline',
                        color: 'royalblue',
                        cursor: 'pointer',
                        marginLeft: '15px',
                           }}
                    onClick = {handleMode}
                >
                    회원가입하기
                </div>
            </ToSignupNavigator>
            
        </Container>

    );
}

export default LoginCard;
