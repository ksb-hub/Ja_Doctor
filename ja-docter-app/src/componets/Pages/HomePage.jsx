import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Button from '../UI/Button'
import HomeRight from './HomeRight';
import HomeLeft from './HomeLeft'
import HomeScreen from './HomeScreen'
import DetailsPage from './DetailsPage';
import Chatbot from '../UI/Chatbot';
const Container = styled.div`
  display: flex;

`;

export default function HomePage() {



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

            <HomeLeft></HomeLeft>
            {/* <HomeScreen></HomeScreen> */}
            <DetailsPage>
            </DetailsPage>
            <Chatbot></Chatbot>

            <HomeRight></HomeRight>

        </Container>
    )
}
