import React from "react";
import { Link } from "react-router-dom";
import "../css/studyheader.css";
import logo from "../image/logo.jpg";
import slogan from "../image/slogan.jpg";

const StudyHeader = () => {
  return (
    <header className="study-header-container">
      <div className="study-header">
        <div className="study-header-logo">
          <Link to="/MainLogin">
            <img src={logo} className="study-header-logo-image" alt="Logo" />
          </Link>
          <Link to="/MainLogin">
            <img
              src={slogan}
              className="study-header-slogan-image"
              alt="Slogan"
            />
          </Link>
        </div>

        <nav className="study-header-nav">
          <Link to="/study" className="study-header-study-link">배움터</Link>
          <Link to="/play" className="study-header-link">놀이터</Link>
          <Link to="/Information" className="study-header-link">생생정보터</Link>
        </nav>

        <div className="study-header-buttons">
          <Link to="/mypage" className="study-header-mypage-button">
            내정보
          </Link>
          <Link to="/" className="study-header-logout-button">
            로그아웃
          </Link>
        </div>
      </div>
    </header>
  );
};

export default StudyHeader;
