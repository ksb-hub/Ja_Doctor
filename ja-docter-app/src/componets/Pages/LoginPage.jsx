import React from 'react'
import LoginCard from '../UI/LoginCard'
import styled from "styled-components"

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
  return (
    
    <Container>
        <LoginCard></LoginCard>
    </Container>
  )
}
