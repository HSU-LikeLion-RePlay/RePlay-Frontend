import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardItem from "./CardItem";
import "../css/information.css";
import LoginHeader from "../../Header/components/LoginHeader";
const Information = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const phoneId = localStorage.getItem("phoneId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://43.201.176.194:8080/api/info/getAllInfo",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
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

  const handleWriteButtonClick = () => {
    console.log("Write button clicked");
    navigate("/informationPost", { state: { phoneId } });
  };

  return (
    <div>
      <LoginHeader />
      <div className="information-container">
        <div className="banner-container">
          <div className="banner">
            <div className="information-title">
              <p>
                새로운 <span className="highlight">직업?</span>
              </p>
              <p>
                새로운 <span className="highlight">활동?</span>
              </p>
              <p>무엇이 있을까요!</p>
            </div>
            <div className="description">
              리플레이의 생생정보터는 모든 시니어를 위한 정기 간행물입니다.
            </div>
            <div className="description">
              여러분의 아름다운 인생 제 2막을 위한 생생한 정보를 제공합니다.
            </div>
          </div>
        </div>
        <div className="write-container">
          <div className="write-all">
            <div className="write-text-large">
              나만 알기 아까운 정보가 있나요?
            </div>
            <div className="write-text-large">
              지금 생생정보를 투고해주세요!
            </div>
            <div className="write-text-small">
              운영진의 선별을 통해 여러분의 생생정보를 들려드립니다.
            </div>
          </div>

          <button className="write-button" onClick={handleWriteButtonClick}>
            생생정보 투고하기
          </button>
        </div>
        <div className="cards-container">
          {cards.map((card) => (
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
    </div>
  );
};

export default Information;
