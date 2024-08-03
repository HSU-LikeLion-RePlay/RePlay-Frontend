// src/Page/Main/components/MainLogin.jsx
import React from "react";
import { useRecoilValue } from "recoil";
import LoginHeader from "../../Header/components/LoginHeader";
import MainSlider from "./MainSlider";
import Footer from "../../Footer/components/Footer";
import EventCard from "../../EventCard/components/EventCard";
import { userInfoState } from "../../../Recoil/components/InformationRecoil";
import "../css/mainlogin.css";
import logoimage from "../image/logo.jpg";
import sloganimage from "../image/slogan.jpg";
import person1 from "../image/gentleman.jpg";
import person2 from "../image/gentleman.jpg";
import person3 from "../image/gentleman.jpg";
import InformationEventCard from "../../EventCard/components/InformationEventCard";
import { Link } from "react-router-dom"; // react-router-dom에서 Link를 가져옵니다.
import Header from "../../Header/components/Header";
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
  const events = useRecoilValue(userInfoState); // Fetch user data using atom

  return (
    <div>
      <LoginHeader />
      <MainSlider className="main-login-slider" slides={slides} />
      <div className="main-advertisement-container">
        <div className="main-advertisement-image">
          <img className="main-advertisement-logo-image" src={logoimage} />
          <img className="main-advertisement-slogan-image" src={sloganimage} />
        </div>
        <div className="main-advertisement-text">임시광고입니다.</div>
      </div>
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
        <button className="main-help-button">자세히 보기</button>
      </div>
      <div className="main-study-container">
        <div className="main-study-title">배움터</div>
        <button className="main-study-more">더보기</button>
      </div>
      <div className="event-list">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}

        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}

        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}

        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}

        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}

        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}

        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
      <div className="main-play-container">
        <div className="main-play-title">놀이터</div>
        <button className="main-play-more">더보기</button>
      </div>
      <div className="event-list">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}

        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
      <div className="main-information-container">
        <div className="main-information-title">생생정보터</div>
        <button className="main-information-more">더보기</button>
      </div>
      <div className="event-list">
        {events.map((user, index) => (
          <InformationEventCard key={index} user={user} />
        ))}
        {events.map((user, index) => (
          <InformationEventCard key={index} user={user} />
        ))}
        {events.map((user, index) => (
          <InformationEventCard key={index} user={user} />
        ))}
        {events.map((user, index) => (
          <InformationEventCard key={index} user={user} />
        ))}
        {events.map((user, index) => (
          <InformationEventCard key={index} user={user} />
        ))}
        {events.map((user, index) => (
          <InformationEventCard key={index} user={user} />
        ))}
        {events.map((user, index) => (
          <InformationEventCard key={index} user={user} />
        ))}
        {events.map((user, index) => (
          <InformationEventCard key={index} user={user} />
        ))}
      </div>
      <Link to="/Information" className="main-information-more">
        Information
      </Link>
      <Footer />
    </div>
  );
};

export default MainLogin;
