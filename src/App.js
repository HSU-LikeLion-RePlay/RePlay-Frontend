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
import MyPage from './MyPage/component/MyPage';
import PlayDetail from './Play/component/PlayDetail';
import WelcomeMakePlay from './Play/component/WelcomeMakePlay';
import EditProfil from './MyPage/component/EditProfil';
import MyInfo from './MyPage/component/MyInfo';
import MyPlay from './MyPage/component/MyPlay';
import MyStudy from './MyPage/component/MyStudy';
import MyScrapPlay from './MyPage/component/MyScrapPlay';
import PlayApply from './Play/component/PlayApply';
import Pay from './Play/component/Pay';
import ApplyComplete from './Play/component/ApplyComplete';
import EditPlay from './Play/component/EditPlay';
import Study from './Study/component/Study';
import StudyDetail from './Study/component/StudyDetail';
import StudyApply from './Study/component/StudyApply';
const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/play" element={<Play />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/makeplay" element={<MakePlay />} />
          <Route path="/SignUpBirthDay" element={<SignUpBirthDay />} />
          <Route path="/SignUpPhone" element={<SignUpPhone />} />
          <Route path="/SignUpPW" element={<SignUpPW />} />
          <Route path="/SignUpNickName" element={<SignUpNickName />} />
          <Route path="/SignUpWelcome" element={<SignUpWelcome />} />
          <Route path='/study' element={<Study/>}/>
          <Route path='/StudyDetail/:index' element={<StudyDetail/>}/>
          <Route path='/studyApply' element={<StudyApply/>}/>
          <Route path='/myScrapPlay' element={<MyScrapPlay />} />
          <Route path='/myPage' element={<MyPage />} />
          <Route path='/myInfo' element={<MyInfo />} />
          <Route path='/myInfo' element={<MyInfo />} />
          <Route path='/myPlay' element={<MyPlay />} />
          <Route path='/myStudy' element={<MyStudy />} />
          <Route path='/editProfil' element={<EditProfil />} />
          <Route path="/playdetail/:index" element={<PlayDetail />} />
          <Route path='/welcomeMakePlay' element={<WelcomeMakePlay />} />
          <Route path='/playApply' element={<PlayApply/>}/>
          <Route path='/pay' element={<Pay/>}></Route>
          <Route path= '/applyComplete' element={<ApplyComplete/>}></Route>
          <Route path='editPlay' element={<EditPlay/>}> </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
