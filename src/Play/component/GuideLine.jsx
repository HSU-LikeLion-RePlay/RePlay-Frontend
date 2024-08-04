import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/GuideLine.css'; // 모달 스타일링을 위한 CSS 파일 생성

export default function GuideLine({ show, onClose, isLoggedIn }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  if (!show) {
    return null;
  }

  const handleLoginClick = () => {
    navigate('/Login');
  };

  const handleNextClick = () => {
    setStep(step + 1);
  };

  const handleConfirmClick = () => {
    // 참가 신청 확인 로직 추가
    onClose();
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <>
          <h2>로그인이 필요한 서비스 입니다</h2>
          <button className='login-button' onClick={handleLoginClick}>로그인</button>
        </>
      );
    }

    switch (step) {
      case 0:
        return (
          <>
            <p>놀이터 참여 신청 시 수수료가 추가됩니다.</p>
            <p>참가 비용의 3%</p>
            <div className='modal-buttons'>
              <button onClick={onClose}>이전</button>
              <button onClick={handleNextClick}>다음</button>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <p>지불하신 참가 비용은 놀이를 기획한 놀이장에게 전달됩니다.</p>
            <div className='modal-buttons'>
              <button onClick={() => setStep(step - 1)}>이전</button>
              <button onClick={handleNextClick}>다음</button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <p>놀이터 참가 취소 시의 환불 규정을 확인해주세요.</p>
            <div className='modal-buttons'>
              <button onClick={() => setStep(step - 1)}>이전</button>
              <button onClick={handleConfirmClick}>확인</button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        {renderContent()}
      </div>
    </div>
  );
}
