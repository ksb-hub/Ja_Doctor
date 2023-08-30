import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #f5f5f5;
  
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  justify-content: flex-end;
`;

const Title = styled.h1`
  font-size: 40px;
  text-align: left;
  margin: 30px 0 0 50px;
`;

const InfoIcon = styled.div`
  font-size: 60px;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: gray;
  margin: 0;
`;
/**
 * '자소서 선택' 버튼
 */
const SelectButton = styled.button`
  background-color: #c9ccd1;
  color: black;
  padding: 20px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  border-radius: 10px;
`;
/**
 * '자소서 선택' 버튼 눌렀을 때의 팝업 창
 */
const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
/**
 * 팝업 안의 content
 */
const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-height: 80vh; 
  overflow-y: auto; 
`;
/**
 * 자소서 데이터를 목록 형태로 표시
 */
const StatementList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  
`;
/**
 * 자소서 한 개씩의 item
 */
const StatementItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
  background-color: white;
  border-radius: 5px;
`;

function StatementListComponent({ data }) {
    return (
      <StatementList>
        {data.map((item, index) => (
          <StatementItem key={index}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </StatementItem>
        ))}
      </StatementList>
    );
  }

function HomeScreen() {
  const [popupVisible, setPopupVisible] = useState(false);

  const statementList = [
    {
      title: 'test_title_1',
      content: 'test_contents_1test_contents_1test_contents_1test_contents_1',
    },
    {
      title: 'test_title_2',
      content: 'test_contents_2',
    },
    {
        title: 'test_title_3',
        content: 'test_contents_3test_contents_3test_contents_3',
    },
    {
        title: 'test_title_4',
        content: 'test_contents_3test_contents_3test_contents_3',
    },
    {
        title: 'test_title_5',
        content: 'test_contents_3test_contents_3test_contents_3',
    },
    {
        title: 'test_title_6',
        content: 'test_contents_3test_contents_3test_contents_3',
    }
  ];

  return (
    <Container>
        <Title>실시간 무료 첨삭</Title>
        <Header>
        <InfoIcon>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 50 50">
<path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
</svg>
        </InfoIcon>
        <InfoText>&nbsp;첨삭 중인 모든 자소서를 가져왔어요.</InfoText>
      </Header>
      
      <SelectButton onClick={() => setPopupVisible(true)}>자소서 선택 ▿</SelectButton>
      <StatementListComponent data={statementList} /> {/* StatementList 렌더링 */}
      {popupVisible && (
        <Popup>
          <PopupContent>
            <h2>내 자소서들</h2>
            <StatementList>
              {statementList.map((item, index) => (
                <StatementItem key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </StatementItem>
              ))}
            </StatementList>
            <button onClick={() => setPopupVisible(false)}>닫기</button>
          </PopupContent>
        </Popup>
      )}
    </Container>
  );
}

export default HomeScreen;

