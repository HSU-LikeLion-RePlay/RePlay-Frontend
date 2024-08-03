import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { playInfoState, reviewState } from '../../atoms';
import '../style/PlayDetail.css';

export default function PlayDetail() {
  const { index } = useParams();
  const playInfos = useRecoilValue(playInfoState);
  const reviews = useRecoilValue(reviewState);
  const playInfo = playInfos[index];
  const playReviews = reviews.find(review => review.playIndex === parseInt(index, 10));

  if (!playInfo) {
    return <div>해당하는 모임 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className='playdetail-page'>
      <div className='playdetail-image'>
        <img src={playInfo.img} alt={playInfo.name} />
      </div>
      <div className='playdetail-info'>
        <button>{playInfo.category}</button><button>스크랩</button>
        <h2>{playInfo.name}</h2>
        <p>{playInfo.date}</p>
        <p>{playInfo.time}</p>
        <p>{playInfo.loc}</p>
        <p>{playInfo.crnt}/{playInfo.max}명</p>
        <div className='playdetail-organizer'>
          <img src={playInfo.profilImg} alt={playInfo.nickname} className='organizer-profile' />
          <p><strong>담당자:</strong> {playInfo.nickname}</p>
          <p>{playInfo.intro}</p>
        </div>
      </div>
      <div className='playdetail-reviews'>
        <h3>후기</h3>
        {playReviews && playReviews.reviews.length > 0 ? (
          playReviews.reviews.map((review, i) => (
            <div key={i} className='review'>
              <p><strong>{review.author}:</strong> {review.content}</p>
            </div>
          ))
        ) : (
          <p>후기가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
