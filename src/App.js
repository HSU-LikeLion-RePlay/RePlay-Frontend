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
import InformationPost from './Information/components/InformationPost';
import Post from './Information/components/Post';
import BookmarkPage from './Information/components/BookmarkPage';
import EditProfil from './MyPage/component/EditProfil';
import MyPlay from './Play/component/MyPlay';
import MyStudy from './Study/component/MyStudy';
import MyScrapPlay from './Play/component/MyScrapPlay';
import PlayApply from './Play/component/PlayApply';
import Pay from './Play/component/Pay';
import ApplyComplete from './Play/component/ApplyComplete';
import EditPlay from './Play/component/EditPlay';
import Study from './Study/component/Study';
import StudyDetail from './Study/component/StudyDetail';
import StudyApply from './Study/component/StudyApply';
import AdvertisementSupporter from './Main/components/AdvertisementSupporter';
import Main from './Main/components/Main';
import InformationHeader from './Header/components/InformationHeader';
import StudyHeader from './Header/components/StudyHeader';
import BigSlider from './Main/components/BigSlider';
import Chat1 from './Main/components/Chat1';
import Chat2 from './Main/components/Chat2';
import Chat3 from './Main/components/Chat3';

import banner1 from './Main/image/banner1.png';
import banner2 from './Main/image/banner2.png';
import banner3 from './Main/image/banner3.png';

const slides = [
  {
    image: banner1,
    name: "임예은",
    link: "/chat1"
  },
  {
    image: banner2,
    name: "이영희",
    link: "/chat2"
  },
  {
    image: banner3,
    name: "박민수",
    link: "/chat3"
  },
];

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          {/* 기본 라우트 */}
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/MainLogin" element={<MainLogin />} />

          {/* Play 관련 라우트 */}
          <Route path="/play" element={<Play />} />
          <Route path="/playdetail/:index" element={<PlayDetail />} />
          <Route path="/welcomeMakePlay" element={<WelcomeMakePlay />} />
          <Route path="/playApply" element={<PlayApply />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/applyComplete" element={<ApplyComplete />} />
          <Route path="/editPlay" element={<EditPlay />} />
          <Route path="/myPlay" element={<MyPlay />} />
          <Route path="/myScrapPlay" element={<MyScrapPlay />} />

          {/* Study 관련 라우트 */}
          <Route path="/study" element={<Study />} />
          <Route path="/studyApply" element={<StudyApply />} />
          <Route path="/StudyDetail/:index" element={<StudyDetail />} />
          <Route path="/myStudy" element={<MyStudy />} />

          {/* SignUp 관련 라우트 */}
          <Route path="/SignUpBirthDay" element={<SignUpBirthDay />} />
          <Route path="/SignUpPhone" element={<SignUpPhone />} />
          <Route path="/SignUpPW" element={<SignUpPW />} />
          <Route path="/SignUpNickName" element={<SignUpNickName />} />
          <Route path="/SignUpWelcome" element={<SignUpWelcome />} />

          {/* MyPage 관련 라우트 */}
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/editProfil" element={<EditProfil />} />

          {/* Information 관련 라우트 */}
          <Route path="/Information" element={<Information />} />
          <Route path="/InformationPost" element={<InformationPost />} />
          <Route path="/bookmarks" element={<BookmarkPage />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/InformationHeader" element={<InformationHeader />} />
          <Route path="/StudyHeader" element={<StudyHeader />} />

          {/* 추가된 라우트 */}
          <Route path="/main-slider" element={<BigSlider className="main-slider" slides={slides} />} />
          <Route path="/chat1" element={<Chat1 />} />
          <Route path="/chat2" element={<Chat2 />} />
          <Route path="/chat3" element={<Chat3 />} />

          {/* Advertisement */}
          <Route path="/AdvertisementSupporter" element={<AdvertisementSupporter />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
