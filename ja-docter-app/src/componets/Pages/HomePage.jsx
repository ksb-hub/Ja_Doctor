import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
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

    const navigate = useNavigate();
    const statementID = 1
    const title = "testTitle"
    const postID = 1
    const versionInfo = "test_version"
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
