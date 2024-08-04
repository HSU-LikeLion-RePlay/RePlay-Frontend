import React from "react";
import { Link } from "react-router-dom";
import "../css/playheader.css"; 
import logo from "../image/logo.jpg";
import slogan from "../image/slogan.jpg";

const PlayHeader = () => {
  return (
    <header className="play-header-container"> 
      <div className="play-header"> 
        <div className="play-header-logo">
          <Link to="/MainLogin">
            <img src={logo} className="play-header-logo-image" alt="Logo" />
          </Link>
          <Link to="/MainLogin">
            <img
              src={slogan}
              className="play-header-slogan-image"
              alt="Slogan"
            />
          </Link>
        </div>

        <nav className="play-header-nav"> 
          <Link to="/study">배움터</Link>
          <Link to="/play">놀이터</Link>
          <Link to="/Information">생생정보터</Link>
        </nav>

        <div className="play-header-buttons"> 
          <Link to="/mypage" className="playheader-mypage-button">
            내정보
          </Link>
          <Link to="/" className="playheader-logout-button">
            로그아웃
          </Link>
        </div>
      </div>
    </header>
  );
};

export default PlayHeader;
