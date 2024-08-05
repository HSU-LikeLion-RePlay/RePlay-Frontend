import React from "react";
import "../css/chat1.css"; // 스타일링을 위한 CSS 파일

const ChatMessage = ({ role, name, message }) => (
  <div className={`chat-message ${role}`}>
    <div className="chat-name">{name}</div>
    <div className="chat-text">{message}</div>
  </div>
);

const Chat1 = () => {
  const messages = [
    {
      role: "question",
      name: "리플레이",
      message: "Q1: 리플레이 서비스를 처음 알게 된 계기는 무엇인가요?",
    },
    {
      role: "answer",
      name: "김철수",
      message: "지역 커뮤니티에서 열린 정보 세미나에서 알게 되었습니다...",
    },
    // 추가 메시지들
  ];

  return (
    <div className="chat-container">
      <h2>리플레이를 만나고 자신감이 생겼어요!</h2>
      {messages.map((msg, index) => (
        <ChatMessage key={index} {...msg} />
      ))}
    </div>
  );
};

export default Chat1;
