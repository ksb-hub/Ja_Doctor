import React, { useState, useEffect } from 'react';
import img1 from "./img/poster.jpg";
import './App.css'; // App 컴포넌트의 스타일 파일을 import
const App = () => {
  const [advice, setAdvice] = useState("");
  const fetchAdvice = async () => {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      setAdvice(data.slip.advice);
    } catch (error) {
      console.error("Error fetching advice:", error);
    }
  };
  useEffect(() => {
    fetchAdvice();
  }, []);
  return (
    <div className="App">
      <div className="content">
        <div className="center-content">
          <div className="image-box">
            <a href="https://naver.me/xQ8sLjDH" target="_blank" rel="noopener noreferrer">
              <img src={img1} alt="Poster" className="image" width="250" height="380" />
            </a>
          </div>
          <div className="advice">
            <h1 className="title">오늘의 명언</h1>
            <p className="advice-text">"{advice}"</p>
            <p className="account-name">{'<'}홍길동{'>'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
————css file
.App {
 text-align: center;
 margin-top: 20px;
 display: flex;
 flex-direction: column;
 align-items: flex-start;
}
.App-logo {
 height: 40vmin;
 pointer-events: none;
}
.title {
 color : orange;
 padding : 20px;
 font-size: 30px;
 font-weight: 700;
}
.title-with-button {
 display: flex;
 align-items: center;
 justify-content: space-between;
}
.login-button {
 cursor: pointer;
 background-color: #E0E0E0;
 color: black;
 border: none;
 padding: 5px 10px;
 margin-left: 20px;
 border-radius: 8px;
}
.content {
 display: flex;
 flex-direction: column;
 align-items: flex-start;
 margin-top: 20px;
 margin-left: 20px;
}
.center-content {
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
}
.image {
 max-width: 100%;
 border-radius: 10px;
}
.account-name {
 margin-top: 10px;
 font-size: 20px;
 font-weight: 600;
 color: gray;
}
.link {
 margin: 10px 0;
 font-size: 18px;
 color: black;
 cursor: pointer;
}
@media (prefers-reduced-motion: no-preference) {
 .App-logo {
  animation: App-logo-spin infinite 20s linear;
 }
}
.App-header {
 background-color: #282C34;
 min-height: 100vh;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 font-size: calc(10px + 2vmin);
 color: white;
}
.App-link {
 color: #61DAFB;
}
@keyframes App-logo-spin {
 from {
  transform: rotate(0deg);
 }
 to {
  transform: rotate(360deg);
 }
}