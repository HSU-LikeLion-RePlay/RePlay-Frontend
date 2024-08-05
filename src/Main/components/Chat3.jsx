import React from "react";
import LoginHeader from "../../Header/components/LoginHeader";
import Footer from "../../Footer/components/Footer"; // Footer 컴포넌트 가져오기
import hatext from "../image/hatext.png"; // 올바른 이미지 임포트 문법 사용
import "../css/chat.css";
const Chat3 = () => {
  return (
    <div className="chat-container">
      <LoginHeader />
      <div className="chat-content">
        <img
          src={hatext} // 임포트한 이미지를 사용
          alt="Description of Image"
          className="chat1-image"
        />
        {/* 기타 내용은 여기에 추가 */}
      </div>
      <Footer />
    </div>
  );
};

export default Chat3;
