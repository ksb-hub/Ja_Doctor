import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from "./componets/Pages/HomePage";
import LoginPage from "./componets/Pages/LoginPage";
import { createContext, useState } from "react";

const AuthContext = createContext();
function App() {

  const [authInfo, setAuthInfo] = useState(false);

  return (
    <AuthContext.Provider value ={[authInfo, setAuthInfo]}>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="/signin" element={<LoginPage />}></Route>
          {/* <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/select1" element={<ItemSelect1 />}></Route>
          <Route path="/myLog" element={<CompareLogPage />}></Route> */}
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
export {AuthContext};