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
import MainLogin from './Main/components/MainLogin';
import Information from './Information/components/Information';
import Study from './Play/component/Play';
import InformationPost from './Information/components/InformationPost';
import Post from './Information/components/Post';
import BookmarkPage from './Information/components/BookmarkPage';
import EditProfil from './MyPage/component/EditProfil';
import MyInfo from './MyPage/component/MyInfo';
import MyPlay from './MyPage/component/MyPlay';
import MyStudy from './MyPage/component/MyStudy';
import MyScrapPlay from './MyPage/component/MyScrapPlay';


const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/play" element={<Play />} />
          <Route path="/Information" element={<Information />} />
          <Route path="/Study" element={<Study />} />

          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/makeplay" element={<MakePlay />} />
          <Route path="/SignUpBirthDay" element={<SignUpBirthDay />} />
          <Route path="/SignUpPhone" element={<SignUpPhone />} />
          <Route path="/SignUpPW" element={<SignUpPW />} />
          <Route path="/SignUpNickName" element={<SignUpNickName />} />
          <Route path="/SignUpWelcome" element={<SignUpWelcome />} />
          {/* <Route path='/myCreatedPlay' element={<MyCreatedPlay />} />
          <Route path='/myScrapStudy' element={<MyScrapStudy />} /> */}
          <Route path='/myScrapPlay' element={<MyScrapPlay />} />
          <Route path='/myPage' element={<MyPage />} />
          <Route path='/myInfo' element={<MyInfo />} />
          <Route path='/myInfo' element={<MyInfo />} />
          <Route path='/myPlay' element={<MyPlay />} />
          <Route path='/myStudy' element={<MyStudy />} />
          <Route path='/editProfil' element={<EditProfil />} />
          <Route path="/playdetail/:index" element={<PlayDetail />} />
          <Route path='/MainLogin' element={<MainLogin />} />
          <Route path="/InformationPost" element={<InformationPost />} />
          <Route path="/InformationPost" element={<InformationPost />} />
          <Route path="/bookmarks" element={<BookmarkPage />} />

          <Route path="/post/:id" element={<Post />} />

          {/* showMakePlayButton prop을 false로 설정하여 버튼 숨기기 */}
          <Route path='/welcomeMakePlay' element={<WelcomeMakePlay/>}/>

          <Route path='/welcomeMakePlay' element={<WelcomeMakePlay />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
