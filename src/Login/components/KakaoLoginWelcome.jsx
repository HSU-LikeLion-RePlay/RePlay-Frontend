import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/kakaologinwelcome.css";

const KakaoLoginWelcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { nickname } = location.state || {
    nickname: "",
  };

  const handleHomeButtonClick = () => {
    navigate("/MainLogin");
  };

  return (
    <div className="kakao-login-welcome-container">
      <div className="kakao-welcome-page">
        <div className="kakao-welcome-text">
          <span className="highlight">{nickname}</span>
          <div className="kakao-text-welcome"> 님 환영합니다!</div>
        </div>
        <div className="login-video">화면 녹화한것(로그인 방법) 첨부 예정</div>
        <div className="kakao-login-step">
          <button className="login-signup-step">로그인 · 회원 가입 </button>
          <img
            src={require("../image/Polygon 5.jpg")}
            alt="triangle"
            className="triangle"
          />
          <button className="kakao-start-button">
            <img
              src={require("../image/kakao_logo.png")}
              alt="Kakao"
              className="kakao-start-logo"
            />
            카카오로 시작하기
          </button>
          <img
            src={require("../image/Polygon 5.jpg")}
            alt="triangle"
            className="triangle"
          />
          <button className="finish">로그인 완료!</button>
        </div>

        <button className="home-button" onClick={handleHomeButtonClick}>
          홈페이지로 이동
        </button>
      </div>
    </div>
  );
};

export default KakaoLoginWelcome;
