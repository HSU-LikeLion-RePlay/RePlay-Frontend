import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { playInfoState, reviewState } from '../../atoms';
import '../style/PlayDetail.css';
import Comment from './Comment'; // Comment 컴포넌트 임포트

export default function PlayDetail() {
  const { index } = useParams();
  const playInfos = useRecoilValue(playInfoState);
  const reviews = useRecoilValue(reviewState);
  const playInfo = playInfos[index];
  const playReviews = reviews.find(review => review.playIndex === parseInt(index, 10));

  useEffect(() => {
    if (playInfo) {
      const script = document.createElement('script');
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&autoload=false";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.kakao.maps.load(() => {
          const container = document.getElementById('map');
          const options = {
            center: new window.kakao.maps.LatLng(playInfo.latitude, playInfo.longitude),
            level: 3
          };
          const map = new window.kakao.maps.Map(container, options);
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(playInfo.latitude, playInfo.longitude),
          });
          marker.setMap(map);
        });
      };

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [playInfo]);

  if (!playInfo) {
    return <div>해당하는 모임 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className='playdetail-page'>
      <div className='playdetail-container'>
        <div className='playdetail-left'>
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
          <hr/>
          <Comment /> {/* Comment 컴포넌트 추가 */}
        </div>
        <div className='playdetail-right'>
          <div id='map' style={{ width: '100%', height: '400px' }}></div>
        </div>
      </div>
      <button className='join-button'>참가하기 신청</button>
    </div>
  );
}
