import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function WelcomeMakePlay() {
  const navigate = useNavigate();
  const location = useLocation();
  const { nickname } = location.state || {};

  return (
    <div className="welcome-container">
      <h2>{nickname}의 놀이터가 만들어졌어요!</h2>
      <div className="welcome-buttons">
      <div>
        내정보 &gt; 나의 놀이터 &gt; 내가 만든 놀이터에서 000님의 놀이터를 관리하실 수 있습니다.
      </div>
        <button onClick={() => navigate('/')}>홈페이지로 이동</button> 
        <button onClick={() => navigate('/')}>내가 만든 놀이터로 이동</button>
      </div>
    </div>
  );
}
