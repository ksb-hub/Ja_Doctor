import React, { useState } from 'react'
import LoginCard from '../UI/LoginCard'
import styled from "styled-components"
import SignupCard from '../UI/SignupCard';
/**
 * 
 * 로그인 정상 동작을 확인하기위한 임시 컨테이너
 */
const Container = styled.div`

    width: 100vw;
    height: 100vh;
    border: 4px solid red;
    display: flex;
    justify-content: center;
`;
/**
 * 
 * 로그인 페이지 컴포넌트 
 * 
 */
export default function LoginPage() {

    /**
     * 로그인 회원가입 카드를 각각 랜더링할지 안할지를 관리하는 state 
     */
    const [loginmode, setLoginmode] = useState(true)

    /** 각 로그인 / 회원가입카드의 props로 넘겨줄 modeChange함수 */
    const handleMode = () => {
        setLoginmode(!loginmode)
    }
    return (
    
        <Container>
            {loginmode? (
            <LoginCard handleMode = {handleMode}></LoginCard>
            ):(
            <SignupCard handleMode = {handleMode}></SignupCard>)}
            
        </Container>
    )
}
