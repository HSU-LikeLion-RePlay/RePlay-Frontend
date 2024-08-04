import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { playInfoState } from '../../atoms';
import Pay from './Pay';
import '../style/FeeCheck.css';

export default function FeeCheck({ showPayButton = true }) {
  const [playInfos] = useRecoilState(playInfoState);
  const firstBlock = playInfos.length > 0 ? playInfos[0] : null;
  const [showPayModal, setShowPayModal] = useState(false);
  const fee = firstBlock ? firstBlock.fee : 0;
  const excharge = fee * 0.03;

  const handlePayClick = () => {
    setShowPayModal(true);
  };

  const handleCloseModal = () => {
    setShowPayModal(false);
  };

  return (
    <>
      참가비용: {fee}원
      <br />
      수수료: {excharge}원
      <br />
      수수료는 참가비용의 3%로, 리플레이 서비스 운영에 사용됩니다!
      <hr />
      결제비용: {fee + excharge}원
      <br />
      {showPayButton && (
        <button onClick={handlePayClick}>결제하기</button>
      )}
      {showPayModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <Pay />
          </div>
        </div>
      )}
    </>
  );
}
