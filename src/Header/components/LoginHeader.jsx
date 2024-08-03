// src/Page/Header/components/LoginHeader.jsx
import React from "react";
import { Link } from "react-router-dom"; // react-router-dom에서 Link를 가져옵니다.
import "../css/loginheader.css";
import logo from "../image/logo.jpg"; // 로고 이미지를 추가하세요
import slogan from "../image/slogan.jpg";

const LoginHeader = () => {
  return (
    <header className="login-header-container">
      <div className="login-header">
        <div className="login-header-logo">
          <img src={logo} className="login-header-logo-image" alt="Logo" />
          <img
            src={slogan}
            className="login-header-slogan-image"
            alt="Slogan"
          />
        </div>

        <nav className="login-header-nav">

          <Link to="/study">배움터</Link>
          <Link to="/play">놀이터</Link>
          <Link to="/Information">생생정보터</Link>
        </nav>

        <div className="login-header-buttons">

          <Link to="/mypage" className="header-mypage-button">
            내정보
          </Link>
          <Link to="/" className="header-logout-button">
            로그아웃
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;
