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
          <Route path='/study' element={<Study/>}/>
          <Route path='/StudyDetail/:index' element={<StudyDetail/>}/>
          <Route path='/studyApply' element={<StudyApply/>}/>
          <Route path='/myScrapPlay' element={<MyScrapPlay />} />
          <Route path='/myPage' element={<MyPage />} />
          <Route path='/myPlay' element={<MyPlay />} />
          <Route path='/myStudy' element={<MyStudy />} />
          <Route path='/editProfil' element={<EditProfil />} />
          <Route path="/playdetail/:index" element={<PlayDetail />} />
          <Route path='/MainLogin' element={<MainLogin />} />
          <Route path="/InformationPost" element={<InformationPost />} />
          <Route path="/InformationPost" element={<InformationPost />} />
          <Route path="/bookmarks" element={<BookmarkPage />} />
          <Route path='/AdvertisementSupporter' element={<AdvertisementSupporter/>}/>
          <Route path='/InformationHeader' element={<InformationHeader/>}/>
          <Route path='/StudyHeader' element={<StudyHeader/>}/>

          <Route path="/post/:id" element={<Post />} />

          {/* showMakePlayButton prop을 false로 설정하여 버튼 숨기기 */}
          <Route path='/welcomeMakePlay' element={<WelcomeMakePlay/>}/>
          <Route path='/Main' element={<Main />} />

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
