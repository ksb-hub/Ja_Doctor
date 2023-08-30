import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Button from '../UI/Button'
import Chatbot from '../UI/Chatbot'
import {getPostList, getStatement, getStatementList,
    updatePost,  updateStatement, 
    createpost, createStatement, deleteStatement} from '../../APIs/Statemet'



const Container = styled.div`
  border-radius: 4px solid red;
  width: 100vw;
  display: flex;  
  padding: 20px;
`;

const HomeRight = styled.div`
    width: 33.33%;
    height: 100%;

`;

const Center = styled.div`
    width: 33.33%;
`;
const HomeLeft = styled.div`
    width: 33.33%;
    height: 100%;
`;
    export default function HomePage() {

    const navigate = useNavigate();
    
    return (
        <Container>
          <HomeRight></HomeRight>
          <Center>
            <div>자소서 리스트 렌더링</div>
            <Button
              title = {"로그인/ 회원가입 하기"}
              onClick = {() =>{
                navigate("/signin")
            }}
            >
            </Button>
            <Chatbot></Chatbot>
          </Center>
          <HomeLeft></HomeLeft>
        </Container>
    )
}
