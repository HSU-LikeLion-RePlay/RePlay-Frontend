import React from "react";
import "../css/footer.css";
import logo from "../image/logo.jpg";
import slogan from "../image/slogan.jpg";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer">
        <div className="footer-logo">
          <img src={logo} className="footer-logo-image" alt="Logo" />
          <img src={slogan} className="footer-slogan-image" alt="Slogan" />
        </div>
        <div className="footer-text">
          <div className="footer-text-1">
            한성대학교 멋쟁이사자처럼 중앙해커톤 낙산으로 따라와
          </div>
          <div className="footer-text-2">
            서울특별시 성북구 삼선교로 16길(삼선동2가) 116 한성대학교
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
