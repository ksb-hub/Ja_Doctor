import React from 'react';
import styled from 'styled-components';

const AppWrapper = styled.div`
  text-align: center;
  width: 33.3vw;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.div`
  color: orange;
  padding: 20px;
  font-size: 30px;
  font-weight: 700;
`;

const TitleWithButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 20px; 
`;

const LoginButton = styled.button`
  cursor: pointer;
  background-color: #E0E0E0;
  color: black;
  border: none;
  padding: 5px 10px;
  margin-left: 20px;
  border-radius: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  margin-left: 20px;
`;

const Link = styled.div`
  margin: 10px 0;
  font-size: 18px;
  color: black;
  cursor: pointer;
`;

function HomeLeft() {
  return (
    <AppWrapper>
      <Title>
        <TitleWithButton>
          <div>자소서 닥터</div>
          <LoginButton>로그인/가입</LoginButton>
        </TitleWithButton>
      </Title>
      <Content>
        <Link>전문가 상담받기</Link>
        <Link>비슷한 자소서 열람하기</Link>
        <Link>멤버쉽 결제하기</Link>
      </Content>
    </AppWrapper>
  );
}

export default HomeLeft;
