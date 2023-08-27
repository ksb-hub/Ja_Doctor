import React, {useState} from "react";
import styled from "styled-components"
import ChatBotSwitch from "../../images/ChatBotSwitch.png";
import submitButton from "../../images/message-submit.png"
import postSample from "../../VirtualData/postsample.json"
const Container = styled.div`
    width: 464px;
    height: 554px;
    position: relative;
`;

const ChattingWindow = styled.div`
    background-color: #FFF6ED;
    width: 464px;
    height: 554px;
    position: relative;

    img{
        position: absolute;
        bottom: 5px;
        right: 4px;
    }
`;

/**
 * 채팅창 전체 메시지들을 감싸는 스타일 컴포넌트
 */
const ChatAllContainer = styled.div`
    width: 100%;
    height: 92%;
    background-color: #fff;
    border: 1px solid #ccc;
    box-sizing: border-box;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 9px 0;
`;
/**
 * 채팅박스 한개를 감싸서 왼쪽 or 오른쪽으로 배치후 감싸는 컨테이너
 */
const ChatContainer = styled.div`
    width: 100%;
    margin-top: 3px;
    position: relative;
    height: fit-content;
    padding: 0 12px;
    box-sizing: border-box;
`
const ReceiveChatWrapper = styled.div`
    background-color: #ccc;
    width: fit-content;
    max-width: 240px;
    color: #000;
    padding: 4px 8px;
    border-radius: 12px;

    `;

const SendChatWrapper = styled.div`
    background-color: #F0790A;
    width: fit-content;
    max-width: 240px;
    color: #fff;
    padding: 4px 8px;
    border-radius: 12px;


`;
const ChatInput = styled.textarea`
    display: block;
    background-color: #fff;
    border: 3px solid #ccc;
    width: 100%;
    max-width: 100%;
    min-height: 8%;
    font-size: 18px;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    
`

const ImageWrapper = styled.div`
    width: 50px;
    height: 50px;
    position: absolute;
    bottom: 0;
    right: -60px;
    img{
        display: block;
        width: 100%;
        height: 100%;
    }
`


function Chatbot(){
    const samplePostMessage = {
        isSent: true,
        timeStamp : new Date(),
        contents: postSample.content
    }
    /**
     * 챗봇 비/ 활성화 관리 State
     */
    const [switchOn, setSwitchOn] = useState(true)
    const [inputMessage, setInputMessage] = useState()
    /**
     * 날짜 출력 형식
     */
    const options = { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false, timeZone: 'Asia/Seoul' };
    /**
     * 채팅창안에 모든 메시지를 관리하는 함수
     * 메시지 객체 형태 key값 3개임
     * {
     *  isSent : true / false
     *  timeStamp : 메시지 수/송신 시간 (Date)
     *  content : 메시지 내용 (String)
     * }
     */
    const startMessage = {
        isSent: true,
        timeStamp: new Date(),
        contents: "안녕하세요 자소서 닥터입니다!!! 어떤것을 도와드릴까요???" 
    }
    const [messages, setMessages] = useState([startMessage, samplePostMessage])

    /** 
     * 챗봇을 비/활성화 스위치 관리 함수
    */
    const handleSwitch = () => {
        setSwitchOn(!switchOn)
    } 
    /**
     * input 메시지를 state로 관리하게 하는 함수
     */
    const handleChange = (e) =>{
        setInputMessage(e.target.value)
    }
    /**
     * 채팅 submit 관리 함수 
     * 제출후 messages에 추가해준다.
     */
    const handleSubmit = () => {
        if (inputMessage !== ""){
            console.log(`${inputMessage} 제출`)
            const newMessage = {
                isSent: false,
                timeStamp : new Date(),
                contents: inputMessage,
            }
            setMessages([...messages, newMessage])
            console.log(`메시지들 출력 ${messages}`)
        }
    }
    
    
    
    return (
        <Container>
        {switchOn ? (
            <ChattingWindow>
                <ChatAllContainer>
                        {
                            messages.map((message, idx) =>{
                                if (message.isSent) {
                                    return (
                                        <ChatContainer
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignItems: "flex-end",
                                                gap: '1px',

                                            }}>
                                            <ReceiveChatWrapper key={idx}>
                                                {message.contents}
                                            </ReceiveChatWrapper>
                                            <div
                                                style={{
                                                    fontSize: '10px',
                                                }}
                                            >{message.timeStamp.toLocaleDateString('en-US', options)}</div>

                                        </ChatContainer>
                                    );
                                } else {
                                    return (
                                        <ChatContainer
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                alignItems: "flex-end",
                                                gap: '1px',
                                            }}>
                                            <div
                                                style={{
                                                    fontSize: '10px',
                                                }}
                                            >{message.timeStamp.toLocaleDateString('en-US', options)}</div>
                                            
                                            <SendChatWrapper key={idx}>
                                                {message.contents}
                                            </SendChatWrapper>
                                        </ChatContainer>
                                    );
                                }
                               
                        })}
                </ChatAllContainer>
                <ChatInput
                    onChange ={handleChange}
                    onKeyDown= {(e) =>
                        {
                            if (e.key === 'Enter') {
                                if (!e.shiftKey) {
                                    e.preventDefault(); // Enter 키의 기본 동작 막기
                                    // 여기서 메시지 전송 또는 다른 동작 수행
                                    handleSubmit()
                                    setInputMessage(''); // 메시지 입력창 비우기
                                } else {
                                    // Shift + Enter를 눌렀을 때 줄바꿈 처리
                                    setInputMessage((inputMessage) => inputMessage + '\n');
                                }
                        }}}
                        // (e) => {
                        // if (e.key === 'Enter') {
                        //     handleSubmit()
                        // }}}
                        >
                </ChatInput>
                <ImageWrapper onClick={handleSwitch}>
                    <img src={ChatBotSwitch} alt="챗봇 스위치 이미지" />
                </ImageWrapper>
                <img 
                    onClick={handleSubmit}
                src={submitButton} alt="제출하기 이미지" />
            </ChattingWindow>
        ) : (
            <ImageWrapper onClick={handleSwitch}>
                <img src={ChatBotSwitch} alt="챗봇 스위치 이미지" />
            </ImageWrapper>
        )}
        </Container>
    )
}

export default Chatbot;
