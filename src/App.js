import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Play from './Play/component/Play';
import MakePlay from './Play/component/MakePlay';
import Login from './Login/components/Login';
import SignUpBirthDay from './SignUp/components/SignUpBirthDay';
import SignUpPhone from './SignUp/components/SignUpPhone';
import SignUpNickName from './SignUp/components/SignUpNickName';
import SignUpWelcome from './SignUp/components/SignUpWelcome';
import SignUpPW from './SignUp/components/SignUpPW';
import MyPage from './MyPage/MyPage';
import PlayDetail from './Play/component/PlayDetail';
import WelcomeMakePlay from './Play/component/WelcomeMakePlay';
const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Play />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/makeplay" element={<MakePlay />} />
          <Route path="/SignUpBirthDay" element={<SignUpBirthDay />} />
          <Route path="/SignUpPhone" element={<SignUpPhone />} />
          <Route path="/SignUpPW" element={<SignUpPW />} />
          <Route path="/SignUpNickName" element={<SignUpNickName />} />
          <Route path="/SignUpWelcome" element={<SignUpWelcome />} />
          <Route path='/MyPage' element={<MyPage />} />
          <Route path="/playdetail/:index" element={<PlayDetail />} />
          {/* showMakePlayButton prop을 false로 설정하여 버튼 숨기기 */}
          <Route path='/welcomeMakePlay' element={<WelcomeMakePlay/>}/>
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
