import React from "react";
import { Link } from "react-router-dom";
import "../css/myheader.css"; 
import logo from "../image/logo.jpg";
import slogan from "../image/slogan.jpg";

const MyHeader = () => {
  return (
    <header className="my-header-container"> 
      <div className="my-header"> 
        <div className="my-header-logo">
          <Link to="/MainLogin">
            <img src={logo} className="my-header-logo-image" alt="Logo" />
          </Link>
          <Link to="/MainLogin">
            <img
              src={slogan}
              className="my-header-slogan-image"
              alt="Slogan"
            />
          </Link>
        </div>

        <nav className="my-header-nav"> 
          <Link to="/study">배움터</Link>
          <Link to="/play">놀이터</Link>
          <Link to="/Information">생생정보터</Link>
        </nav>

        <div className="my-header-buttons"> 
          <Link to="/mypage" className="myheader-mypage-button">
            내정보
          </Link>
          <Link to="/" className="myheader-logout-button">
            로그아웃
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MyHeader;
