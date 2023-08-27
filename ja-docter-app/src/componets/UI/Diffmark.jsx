import React from 'react'
import styled from "styled-components"
import Diff from '../../functions/Diff'
import post1 from '../../VirtualData/postsample.json'
import post2 from '../../VirtualData/postEditSample.json'
import Button from './Button'
import { useState } from 'react'

const Container = styled.div`
  width: 100vh;
  height: auto;
  white-space: normal;
`;

const PostWrapper = styled.div`
  border: 2px solid #ccc;
  border-radius: 14px;
  width: 55vw;
  padding: 10px;
  
  
`;
const Line = styled.div`
  background-color: #000;
  width: 100%;
  height: 1px;

`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 4%;
  left: 24%;
  display: flex;
  gap: 3px;
`;
export default function Diffmark() {
  const string1 = post1.content
  const string2 = post2.content
  const [mode, setMode] = useState(1)
  /**
   * 
   * @param mode (num)
   * mode state handle 함수
   */
  const handlemode = (mode) =>{
    setMode(mode)
  }
  return (

    <Container>
      {mode === 1 && (
              <PostWrapper>
                <h2>Letter-by-letter diff</h2>
                <Diff string1={string1} string2={string2} mode="characters" />
                <br />
                <Line />
              </PostWrapper>
      )}

      {mode === 2 && (
              <PostWrapper>
                <h2>Word diff</h2>
                <Diff string1={string1} string2={string2} mode="words" />
                <br />
                <Line />
              </PostWrapper>
            )}

      {mode === 3 && (
              <PostWrapper>
                <h2>Line diff</h2>
                <Diff string1={string1} string2={string2} mode="lines" />
                <br />
                <Line />
              </PostWrapper>
            )}
      {mode === 4 && (
              <PostWrapper>
                <h2>Sentence diff</h2>
                <Diff string1={string1} string2={string2} mode="sentences" />
                <br />
                <Line />
              </PostWrapper>
            )}
      <ButtonWrapper>
        <Button
          title = {"음절"}
          bgcolor = {"#D9D9D9"}
          color = {"#000"}
          onClick = {() => {setMode(1)}}
          hovercolor={"#b0b0b0"}
          hover = {true}
          radius = {14}
        ></Button>
        <Button
          title = {"단어"}
          bgcolor = {"#D9D9D9"}
          color = {"#000"}
          onClick = {() => {setMode(2)}}
          hovercolor={"#b0b0b0"}
          hover = {true}
          radius = {14}

        ></Button>
        <Button
          title = {"문장"}
          bgcolor = {"#D9D9D9"}
          color = {"#000"}
          onClick = {() => {setMode(3)}}
          hovercolor={"#b0b0b0"}
          hover = {true}
          radius = {14}

        ></Button>
        <Button
          title = {"문단"}
          bgcolor = {"#D9D9D9"}
          color = {"#000"}
          onClick = {() => {setMode(4)}}
          hovercolor={"#b0b0b0"}
          hover = {true}
          radius = {14}

        ></Button>
    </ButtonWrapper>      
    </Container>
      
      
  )
}
