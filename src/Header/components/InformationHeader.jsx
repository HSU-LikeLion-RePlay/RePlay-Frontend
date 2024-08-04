import React from "react";
import { Link } from "react-router-dom";
import "../css/informationheader.css";
import logo from "../image/logo.jpg";
import slogan from "../image/slogan.jpg";

const InformationHeader = () => {
  return (
    <header className="Information-header-container">
      <div className="Information-header">
        <div className="Information-header-logo">
          <Link to="/MainLogin">
            <img
              src={logo}
              className="Information-header-logo-image"
              alt="Logo"
            />
          </Link>
          <Link to="/MainLogin">
            <img
              src={slogan}
              className="Information-header-slogan-image"
              alt="Slogan"
            />
          </Link>
        </div>

        <nav className="Information-header-nav">
          <Link to="/study">배움터</Link>
          <Link to="/play">놀이터</Link>
          <Link to="/Information" className="Information-link">
            생생정보터
          </Link>
        </nav>

        <div className="Information-header-buttons">
          <Link to="/mypage" className="Information-header-mypage-button">
            내정보
          </Link>
          <Link to="/" className="Information-header-logout-button">
            로그아웃
          </Link>
        </div>
      </div>
    </header>
  );
};

export default InformationHeader;
