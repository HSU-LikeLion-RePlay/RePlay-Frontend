import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import CardItem from "../../Information/components/CardItem";
import "../../Information/css/information.css";
import LoginHeader from "../../Header/components/LoginHeader";
import BigSlider from "./BigSlider";
import Footer from "../../Footer/components/Footer";
import Block from "../components/Block"; // Block 컴포넌트 가져오기
import { InformationRecoil } from "../../Recoil/InformationRecoil";
import { StudyAndPlay as StudyAndPlayState } from "../../Recoil/StudyAndPlay";
import "../css/mainlogin.css";
import { Link, useNavigate } from "react-router-dom";
import banner1 from "../image/banner1.png";
import banner2 from "../image/banner2.png";
import banner3 from "../image/banner3.png";

const slides = [
  {
    image: banner1,
    name: "젠틀맨",
    description: "리플레이를 만나고 자신감이 생겼어요!",
    link: "/chat1",
  },
  {
    image: banner2,
    name: "와인한잔",
    description: "리플레이 덕분에 재취업도 문제 없어요!",
    link: "/chat2",
  },
  {
    image: banner3,
    name: "성북동 중절모",
    description: "리플레이 추천하냐구요? 무조건 추천!",
    link: "/chat3",
  },
];

const MainLogin = () => {
  const studyAndPlay = useRecoilValue(StudyAndPlayState); // Fetch user data using atom
  const informationRecoil = useRecoilValue(InformationRecoil);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://43.201.176.194.nip.io/api/info/getAllInfo",
          {
            method: "GET",
          }
        );
        const result = await response.json();

        console.log("Response status:", response.status);
        console.log("Response result:", result);

        if (response.status === 200) {
          console.log("데이터 가져오기 성공:", result.data.allInfos);
          setCards(result.data.allInfos);
        } else {
          console.error("Error message:", result.message);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (id) => {
    console.log("Card clicked:", id);
    navigate(`/post/${id}`);
  };

  return (
    <div>
      <LoginHeader />
      <div className="main-login-container">
        <BigSlider className="main-login-slider" slides={slides} />
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
        <div className="grid-4">
          {studyAndPlay.slice(0, 4).map((event, index) => (
            <div className="grid-item" key={index}>
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
        <div className="grid-4">
          {studyAndPlay.slice(0, 4).map((event, index) => (
            <div className="grid-item" key={index}>
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
          {cards.slice(0, 3).map((card) => (
            <CardItem
              key={card.infoId}
              image={card.thumbnailUrl}
              issue={card.infoNum ? `제 ${card.infoNum}호` : "호수 없음"}
              date={card.createdAt}
              title={card.title}
              text={card.content}
              onClick={() => handleCardClick(card.infoId)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLogin;
