import React from "react";
import { useRecoilValue } from "recoil";
import LoginHeader from "../../Header/components/LoginHeader";
import MainSlider from "./MainSlider";
import Footer from "../../Footer/components/Footer";
import Block from "../components/Block"; // Block 컴포넌트 가져오기
import { InformationRecoil } from "../../Recoil/InformationRecoil";
import { StudyAndPlay as StudyAndPlayState } from "../../Recoil/StudyAndPlay";
import "../css/mainlogin.css";
import logoimage from "../image/logo.jpg";
import sloganimage from "../image/slogan.jpg";
import person1 from "../image/gentleman.jpg";
import person2 from "../image/gentleman.jpg";
import person3 from "../image/gentleman.jpg";
import { Link } from "react-router-dom";

const slides = [
  {
    image: person1,
    name: "젠틀맨",
    description: "리플레이를 만나고 자신감이 생겼어요!",
  },
  {
    image: person2,
    name: "Slide 2",
    description: "Description for Slide 2",
  },
  {
    image: person3,
    name: "Slide 3",
    description: "Description for Slide 3",
  },
];

const MainLogin = () => {
  const studyAndPlay = useRecoilValue(StudyAndPlayState); // Fetch user data using atom
  const informationRecoil = useRecoilValue(InformationRecoil);

  return (
    <div>
      <LoginHeader />
      <MainSlider className="main-login-slider" slides={slides} />
      <div className="main-help-container">
        <div className="main-help-text-container">
          <div className="main-help-text-container-large">
            도움이가 되어주세요!
          </div>
          <div className="main-help-text-container-small">
            도움이에 대해 설명(도움이란, 리플레이의 멘토링 서비스인 배움터의
            멘토입니다.
          </div>
        </div>
        <Link to="/AdvertisementSupporter" className="main-help-button">
          자세히 보기
        </Link>
      </div>
      <div className="main-study-container">
        <div className="main-study-title">배움터</div>
        <Link to="/Study" className="main-study-more">
          더보기
        </Link>
      </div>
      <div className="event-grid">
        {studyAndPlay.map((event, index) => (
          <div className="event-item" key={index}>
            <Block
              img={event.img}
              category={event.category}
              date={event.date}
              time={event.time}
              name={event.name}
              loc={event.loc}
              max={event.max}
              crnt={event.crnt}
            />
          </div>
        ))}
      </div>
      <div className="main-play-container">
        <div className="main-play-title">놀이터</div>
        <Link to="/Play" className="main-play-more">
          더보기
        </Link>
      </div>
      <div className="event-grid">
        {studyAndPlay.map((event, index) => (
          <div className="event-item" key={index}>
            <Block
              img={event.img}
              category={event.category}
              date={event.date}
              time={event.time}
              name={event.name}
              loc={event.loc}
              max={event.max}
              crnt={event.crnt}
            />
          </div>
        ))}
      </div>
      <div className="main-information-container">
        <div className="main-information-title">생생정보터</div>
        <Link to="/Information" className="main-information-more">
          더보기
        </Link>
      </div>
      <div className="event-grid">
        {informationRecoil.map((user, index) => (
          <div className="event-item" key={index}>
            <Block
              img={user.img}
              category={user.issue}
              date={user.date}
              time=""
              name={user.title}
              loc=""
              max={0}
              crnt={0}
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MainLogin;
