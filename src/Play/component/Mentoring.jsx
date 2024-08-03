import React from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { playInfoState } from '../../atoms';
import Block from './Block';
import '../style/Mentoring.css';

export default function Mentoring() {
  const [playInfos] = useRecoilState(playInfoState);
  const navigate = useNavigate();

  const handleBlockClick = (index) => {
    navigate(`/playdetail/${index}`);
  };

  return (
    <div className='mentoring-block-container'>
      {playInfos.map((e, i) => (
        <div key={i} onClick={() => handleBlockClick(i)}>
          <Block
            img={e.img}
            category={e.category}
            date={e.date}
            time={e.time}
            name={e.name}
            loc={e.loc}
            max={e.max}
            crnt={e.crnt}
          />
        </div>
      ))}
    </div>
  );
}
