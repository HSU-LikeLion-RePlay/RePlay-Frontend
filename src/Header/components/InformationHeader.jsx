import React from "react";
import { Link } from "react-router-dom";
import "../css/informationheader.css"; 
import logo from "../image/logo.jpg";
import slogan from "../image/slogan.jpg";

const InformationHeader = () => {
  return (
    <header className="information-header-container"> 
      <div className="information-header"> 
        <div className="information-header-logo">
          <Link to="/MainLogin">
            <img src={logo} className="information-header-logo-image" alt="Logo" />
          </Link>
          <Link to="/MainLogin">
            <img
              src={slogan}
              className="information-header-slogan-image"
              alt="Slogan"
            />
          </Link>
        </div>

        <nav className="information-header-nav"> 
          <Link to="/study">배움터</Link>
          <Link to="/play">놀이터</Link>
          <Link to="/Information">생생정보터</Link>
        </nav>

        <div className="information-header-buttons"> 
          <Link to="/mypage" className="informationheader-mypage-button">
            내정보
          </Link>
          <Link to="/" className="informationheader-logout-button">
            로그아웃
          </Link>
        </div>
      </div>
    </header>
  );
};

export default InformationHeader;
