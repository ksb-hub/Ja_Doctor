import React from 'react';
import styled from 'styled-components';
import leftimg from "../../images/left.png";
import rightimg from "../../images/right.png";

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
/**
 * 가상데이터
 */
const DetailsPage = () => {
  const data = {
    title: 'test_title',
    posts: [
      {
        content: 'test-contentstest-contentstest-contentstest-contentstest-contentstest-contentsv',
        versionInfo: '원본'
      }
    ]
  };

  const handleArrowButtonClick = (direction) => {
    // 화살표 이미지가 클릭되었을 때 처리할 로직 추가
    console.log(`${direction} 버전으로 이동`);
  };

  return (
    <PageContainer>
      <ImageTextContainer onClick={() => handleArrowButtonClick('이전')}>
        <ArrowImage src={leftimg} alt="Previous" />
        <ArrowText>이전 버전</ArrowText>
      </ImageTextContainer>
      <Smalltext>홈 {'>'} 실시간 무료 첨삭</Smalltext>
      <BoxContainer>
        <BoxTitle>{data.title}</BoxTitle>
        {data.posts.map((post, index) => (
          <div key={index}>
            <BoxContent>{post.content}</BoxContent>
            <p>{post.versionInfo}</p>
          </div>
        ))}
      </BoxContainer>
      <Divider />
      <ButtonContainer>
        <Button>편집하기</Button>
        <Button>복사하기</Button>
        <Button>맞춤법 검사</Button>
      </ButtonContainer>
      <ImageTextContainer onClick={() => handleArrowButtonClick('다음')}>
        <ArrowImage src={rightimg} alt="Next" />
        <ArrowText>다음 버전</ArrowText>
      </ImageTextContainer>
    </PageContainer>
  );
};

export default DetailsPage;
