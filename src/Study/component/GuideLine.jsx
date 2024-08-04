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
          <button className='movelogin-button' onClick={handleLoginClick}>로그인</button>
        </>
      );
    }

    switch (step) {
      case 0:
        return (
          <>
            <p>서로의 경험과 가치는 평등해요</p>
            <p>나이를 떠나 겸허한 자세로 다가가야해요.<br/>도움이의 도움을 받기 전 자신의 역량을 파악하고,<br/>
배울 점과 목표를 설정하는 게 좋아요.<br/>
구체적일수록 좋아요</p>
            <div className='modal-buttons'>
              <button onClick={onClose}>이전</button>
              <button onClick={handleNextClick}>다음</button>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <p>솔직하게 드러내요</p>
            <p>도움이는 여러분을 위해 존재해요.<br/>
그러니 배움이 여러분들은 참가한 배움터 분야에 대해<br/>
솔직하게 이야기하고 조언을 구해야해요.</p>
            <div className='modal-buttons'>
              <button onClick={() => setStep(step - 1)}>이전</button>
              <button onClick={handleNextClick}>다음</button>
            </div>
          </>
        );
        case 2:
        return (
          <>
            <p>멘토링 장소와 시간을 분명히 정해요</p>
            <p>멘토링 시간에 대한 경계가 모호하면,<br/>
도움이는 보다 효율적으로 도울 수 없어요.<br/>
서로 합의 하에 멘토링 기간, 시간, 장소 등 미리 정하고,<br/>
정해진 내용에 따라 배우는 것을 원칙으로 해요</p>
            <div className='modal-buttons'>
              <button onClick={() => setStep(step - 1)}>이전</button>
              <button onClick={handleNextClick}>다음</button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <p>서로 존중하고 겸손해야해요</p>
            <p>도움이는 여러분이 참가신청한 배움의 학습을 도와줍니다.<br/>
연륜이 부족할 수 있지만,<br/>
도움이가 먼저 배움을 얻고자 하는 게 아니라면 <br/>
가르침을 삼가해주세요.</p>
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
