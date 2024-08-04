import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { studyInfoState, reviewState, userState } from '../../atoms';
import '../style/StudyDetail.css';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Comment from './Comment';
import locimg from '../images/Loc.svg';
import ConfirmModal from '../component/ConfirmModal';

export default function StudyDetail() {
  const { kakao } = window;
  const { index } = useParams();
  const navigate = useNavigate();
  const studyInfos = useRecoilValue(studyInfoState);
  const reviews = useRecoilValue(reviewState);
  const user = useRecoilValue(userState); // 로그인 상태 가져오기
  const isLoggedIn = !!user; // 로그인 상태 확인
  const studyInfo = studyInfos[index];
  const studyReview = reviews.find(review => review.studyIndex === parseInt(index, 10));
  const [address, setAddress] = useState(null);
  const [isParticipating, setIsParticipating] = useState(false); // 참가 상태 확인
  const [showConfirmModal, setShowConfirmModal] = useState(false); // 참가 취소 모달 가시성 상태
  const mapRef = useRef();

  useEffect(() => {
    if (studyInfo) {
      const geocoder = new kakao.maps.services.Geocoder();
      const coord = new kakao.maps.LatLng(studyInfo.latitude, studyInfo.longitude);
      const callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          setAddress(result[0].address);
        }
      };
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    }
  }, [studyInfo]);  // <- studyInfo를 의존성 배열에 추가
  

  useEffect(() => {
    // 사용자가 현재 모임에 참가 중인지 확인하는 로직 추가
    if (user && studyInfo) {
      const userParticipation = studyInfo.participants.find(participant => participant.userId === user.id);
      setIsParticipating(!!userParticipation);
    }
  }, [user, studyInfo]);

  const handleDirectionsClick = () => {
    if (address && address.address_name) {
      const link = `https://map.kakao.com/link/search/${encodeURIComponent(address.address_name)}`;
      window.open(link, '_blank');
    }
  };

  const handleJoinClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (isParticipating) {
      setShowConfirmModal(true); // 참가 취소 모달 표시
    } else {
      // 참가하기 버튼 클릭 시 참가신청 페이지로 이동
      navigate('/studyApply');
    }
  };

  const handleCancelParticipation = () => {
    // 참가 취소 로직 추가
    // 예: API 호출로 참가 취소 요청
    setIsParticipating(false);
    setShowConfirmModal(false);
    alert('참가가 취소되었습니다.');
  };

  if (!studyInfo) {
    return <div>해당하는 모임 정보를 찾을 수 없습니다.</div>;
  }
  

  return (
    <div className='studydetail-page'>
      <div className='studydetail-container'>
        <div className='studydetail-left'>
          <div className='studydetail-image'>
            <img src={studyInfo.img} alt={studyInfo.name} />
          </div>
          <div className='studydetail-info'>
            <button>{studyInfo.category}</button><button>스크랩</button>
            <h2>{studyInfo.name}</h2>
            <p>{studyInfo.date}</p>
            <p>{studyInfo.time}</p>
            <p>{studyInfo.loc}</p>
            <p>{studyInfo.crnt}/{studyInfo.max}명</p>
            <div className='studydetail-organizer'>
              <img src={studyInfo.profilImg} alt={studyInfo.nickname} className='organizer-profile' />
              <p><strong>담당자:</strong> {studyInfo.nickname}</p>
              <p>{studyInfo.intro}</p>
            </div>
          </div>
          <div className='studydetail-reviews'>
            <h3>후기</h3>
            {studyReview && studyReview.reviews.length > 0 ? (
              studyReview.reviews.map((review, i) => (
                <div key={i} className='review'>
                  <p><strong>{review.author}:</strong> {review.content}</p>
                </div>
              ))
            ) : (
              <p>후기가 없습니다.</p>
            )}
          </div>
          <hr/>
          <Comment />
        </div>
        <div className='studydetail-right'>
          <Map
            center={{ lat: studyInfo.latitude, lng: studyInfo.longitude }}
            style={{ width: '800px', height: '600px' }}
            level={3}
          >
            <MapMarker
              position={{ lat: studyInfo.latitude, lng: studyInfo.longitude }}
            />
          </Map>
          <div>
            <p><img src={locimg} alt='locimg' />{address ? address.address_name : '주소 정보를 가져오는 중입니다...'}</p>
            <button onClick={handleDirectionsClick}>경로 보러가기</button>
          </div>
        </div>
      </div>
      <button className='join-button' onClick={handleJoinClick}>
        {isParticipating ? '참가 취소하기' : '참가하기'}
      </button>
      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleCancelParticipation}
      />
    </div>
  );
}
