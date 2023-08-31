import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import leftimg from "../../images/left.png";
import rightimg from "../../images/right.png";
import { getPostList, getStatement } from '../../APIs/Statemet';
import Chatbot from '../UI/Chatbot';
import Diff from '../../functions/Diff';
import PostEditor from './PostEditor';
const PageContainer = styled.div`
  width: 33vw;
  padding: 20px;
  position: relative;
`;
/**
 * 홈 > 실시간 무료 첨삭
 */
const Smalltext = styled.p`
  font-size: 14px;
  color: #495057;
  margin-left: 20px;
`;
/**
 * 자소서 박스
 */
const BoxContainer = styled.div`
  border: none;
  padding: 20px;
  margin-top: 20px;
  max-height: 80vh;
  overflow-y: auto;
`;

const BoxTitle = styled.h2`
  font-size: 24px;
`;

const BoxContent = styled.p`
  font-size: 16px;
`;
/**
 * 구분선
 */
const Divider = styled.hr`
  margin-top: 20px;
  border: none;
  border-top: 1px solid #ccc;
`;
/**
 * 아래 3개의 버튼
 */
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: white;
  color: #495057;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    background-color: #868e96;
  }
`;
/**
 * 일단 지금은 사용 안 함
 */
const ArrowContainer = styled.div`
  position: absolute;
  top: calc(50% - 20px);
  left: 20px; 
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 50px;
  cursor: pointer; 
`;
/**
 * 화살표 이미지
 */
const ArrowImage = styled.img`
  width: 50px;
  height: 50px;
`;
/**
 * 화살표 밑의 텍스트(이전버전..)
 */
const ArrowText = styled.p`
  font-size: 14px;
  margin-top: 5px;
`;
/**
 * 화살표와 그 아래 텍스트를 감싼 컨테이너
 */
const ImageTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${props => props.align || 'flex-start'};
  cursor: pointer; 
`;

const ChatBotWrapper = styled.div`
  position: absolute;
  right: -600px;
  bottom: -100px;
`
function  DetailsPage() {
  const [id, setId] = useState()
  const [statementData, setStatementData] = useState([{
    version : '',
    content : ''
  }])
  const [focusID, setFocusID] = useState(0)
  const [postsLength, setPostLength] = useState()
  const [title, setTitle] = useState('로딩중 입니다..')
  const [diffMode, setDiffMode] = useState(false)
  const [editMode , setEditMode] = useState(false)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const statementId = searchParams.get("id");
    console.log(`렌더링 해야할 stateId = ${statementId}`);
    const fetchPostData = async () => {
      try {
        const res = await getPostList(statementId);
        // 처음버전 가져오기
        const recentPost = res.data[0]
        console.log(recentPost)
        setStatementData(res.data)
        setPostLength(res.data.length)
      } catch (error) {
        // 오류 처리
        console.error('Error fetching data:', error);
      }
    };

    const fetchTitleData = async () => {
      try {
        const res = await getStatement(statementId);
        const resData = res.data
        setTitle(resData)
        setId(statementId)
      } catch (error) {
        // 오류 처리
        console.error('Error fetching data:', error);
      }
    };

    fetchTitleData();
    fetchPostData(); // 비동기 함수 호출

  }, []);
  
  const handleArrowButtonClick = (targetID) => {
    if (targetID >= 0 && targetID < postsLength){
      console.log(`${targetID}로 변경`)
      setFocusID(targetID)
    }
  };
  return (
    <PageContainer>
      {(editMode === true) ? (
        <PageContainer>
          <PostEditor
            inheritContent = {statementData[focusID].content}
            inheritTitle = {title.title}
            isNew = {false}
            statementID = {id}
            postID = {statementData[focusID].id}
          ></PostEditor>
        </PageContainer>
      ) : (
        <PageContainer>
              <ImageTextContainer 
                style = {{
                  position: 'absolute',
                  bottom: '25%',
                  left: '-4%',
                }}
                onClick={() => handleArrowButtonClick(focusID - 1)}>
              <ArrowImage src={leftimg} alt="Previous" />
              <ArrowText>이전 버전</ArrowText>
              </ImageTextContainer>
              <ImageTextContainer
                style = {{
                  position: 'absolute',
                  bottom: '25%',
                  right: '-4%',
                }}
                onClick={() => handleArrowButtonClick(focusID +1)}>
              <ArrowImage src={rightimg} alt="Next" />
              <ArrowText>다음 버전</ArrowText>
              </ImageTextContainer>
              <Smalltext>홈 {'>'} 실시간 무료 첨삭</Smalltext><BoxContainer>
              
              <BoxTitle>{title.title}</BoxTitle>
              <ChatBotWrapper>
                <Chatbot
                  post = {statementData[focusID].content}
                  statementId = {id}
                ></Chatbot>
              </ChatBotWrapper>
              <div>
                <p>{'version Name :'}</p>
                <p
                  style={{
                    color: '#F0790A',
                    fontWeight: '700',
                  }}
                >{statementData[focusID].version_info}</p>
                {(diffMode && focusID !== 0) ? (
                  /* diffMode가 true일 때 렌더링할 JSX */
                  <Diff string1={statementData[focusID - 1].content} string2={statementData[focusID].content} mode="words"></Diff>
                ) : (
                  /* diffMode가 false일 때 렌더링할 JSX */
                  <BoxContent>{statementData[focusID].content}</BoxContent>
                )}

              </div>

              </BoxContainer>
            </PageContainer>
      )}
      
      <Divider />
      <ButtonContainer>
        <Button
          onClick={() => {
            setEditMode(!editMode)
          }}
        >편집하기</Button>
        <Button>복사하기</Button>
        <Button>맞춤법 검사</Button>
        <Button
          onClick={() => {
            setDiffMode(!diffMode)
          }}
        >수정부분 표시</Button>
      </ButtonContainer>
      
      
    </PageContainer>
  );
};

export default DetailsPage;
