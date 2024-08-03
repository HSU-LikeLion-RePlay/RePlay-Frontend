// src/components/PlayInfoList.js
import React from 'react';
import { useRecoilValue } from 'recoil';
import { playInfoState } from '../state/playInfoState';
import '../style/PlayInfoList.css';

const PlayInfoList = () => {
  const playInfoList = useRecoilValue(playInfoState);

  return (
    <div className="play-info-list">
      {playInfoList.map((playInfo, index) => (
        <div key={index} className="play-info-card">
          <img src={playInfo.img} alt={playInfo.name} />
          <div className="play-info-details">
            <h3>{playInfo.name}</h3>
            <p>{playInfo.category}</p>
            <p>{playInfo.date} {playInfo.time}</p>
            <p>{playInfo.loc}</p>
            <p>{playInfo.intro}</p>
            <p>{playInfo.activity}</p>
            <p>{playInfo.fee}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayInfoList;
