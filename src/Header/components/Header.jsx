import React from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
import logo from "../image/logo.jpg"; // 로고 이미지를 추가하세요
import slogan from "../image/slogan.jpg";

const Header = () => {
  return (
    <header className="header-container">
      <div className="header">
        <div className="header-logo">
          <img src={logo} className="header-logo-image" alt="Logo" />
          <img src={slogan} className="header-slogan-image" alt="Slogan" />
        </div>

        <nav className="header-nav">
          <Link to="/Study">배움터</Link>
          <Link to="/Play">놀이터</Link>
          <Link to="/Information">생생정보터</Link>
        </nav>

        <div className="header-login-buttons">
          <Link to="/" className="header-login-button">
            로그인•회원가입
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;