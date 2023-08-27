import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Button from '../UI/Button'
import sample1 from '../../VirtualData/postsample.json'
import editSample1 from '../../VirtualData/postEditSample.json'
import {getPostList, getStatement, getStatementList,
    updatePost,  updateStatement, 
    createpost, createStatement, deleteStatement} from '../../APIs/Statemet'



const Container = styled.div`
  border-radius: 4px solid red;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  padding-left: 80px;
`;
    export default function HomePage() {

    const navigate = useNavigate();
    const statementID = 1
    const title = "testTitle"
    const postID = 1
    const versionInfo = "test_version"
    return (
        <Container>
        <div>임시 HomePage입니다!!!</div>
        <Button
            title = '로그인 하러가기'
            onClick = {() =>{
                navigate("/signin")
            }}
        ></Button>
        <Button
          title = "createStatement API호출!!"
          onClick = {() => {
            console.log()
            createStatement()
          }}
          bgcolor = {"#D9D9D9"}
          hovercolor={"#b0b0b0"}
        >
        </Button>

        <Button
          title = "createpost API호출!!"
          onClick = {() => {
            console.log(createpost(statementID, sample1.content, "테스트 버전1"))
            
          }}
          bgcolor = {"#D9D9D9"}
          hovercolor={"#b0b0b0"}
        >
        </Button>
        <Button
          title = "getStatementList API호출!!"
          onClick = {() => {
            console.log(getStatementList())
            
          }}
          bgcolor = {"#D9D9D9"}
          hovercolor={"#b0b0b0"}
        >
        </Button>
        <Button
          title = "getStatement API호출!!"
          onClick = {() => {
            console.log(getStatement(statementID))
            
          }}
          bgcolor = {"#D9D9D9"}
          hovercolor={"#b0b0b0"}
        >

        </Button>

        <Button
          title = "getPostList API호출!!"
          onClick = {() => {
            console.log(getPostList(statementID))
            
          }}
          bgcolor = {"#D9D9D9"}
          hovercolor={"#b0b0b0"}
        >

        </Button>

        <Button
          title = "updatePost API호출!!"
          onClick = {() => {
            console.log(updatePost(statementID, postID, sample1.content, versionInfo))
            
          }}
          bgcolor = {"#D9D9D9"}
          hovercolor={"#b0b0b0"}
        >
        </Button>

        <Button
          title = "updateStatement API호출!!"
          onClick = {() => {
            console.log(updateStatement(statementID, title))
            
          }}
          bgcolor = {"#D9D9D9"}
          hovercolor={"#b0b0b0"}
        >
        </Button>

        <Button
          title = "deleteStatement API호출!!"
          onClick = {() => {
            console.log(deleteStatement(statementID, title))
            
          }}
          bgcolor = {"#D9D9D9"}
          hovercolor={"#b0b0b0"}
        >
        </Button>
        </Container>
    )
}
