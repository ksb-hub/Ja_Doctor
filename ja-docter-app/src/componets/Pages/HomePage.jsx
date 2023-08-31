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

    
    return (
        <Container>

            <HomeLeft></HomeLeft>
            <HomeScreen></HomeScreen>
            {/* <Chatbot></Chatbot> */}

            <HomeRight></HomeRight>

        </Container>
    )
}
