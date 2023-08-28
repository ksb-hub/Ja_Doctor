import logo from './logo.svg';
import './App.css';
function App(){
 var data = 'red';
 return (
  <div className="App">
   <div className="title">
    <div className="title-with-button">
     <div>자소서 닥터</div>
     <Button text="로그인/가입" />
   </div>
   </div>
   <div className="content">
    <div className="link">전문가 상담받기</div>
    <div className="link">비슷한 자소서 열람하기</div>
    <div className="link">멤버쉽 결제하기</div>
   </div>
  </div>
 )
}
function Button(props) {
 return (
  <button className="login-button">
   {props.text}
  </button>
 );
}
export default App;
———————————css file
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