import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studyInfoState, reviewState, userState, playscarapState } from '../../atoms';
import '../style/StudyDetail.css';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Comment from './Comment';
import locimg from '../images/Loc.svg';
import ConfirmModal from '../component/ConfirmModal';
import loc from '../images/Loc.svg';
import peo from '../images/People.svg';
import bookmarkIcon from '../../Play/images/bookmark.jpg';
import PlayHeader from "../../Header/components/PlayHeader";
import Footer from "../../Footer/components/Footer";

export default function StudyDetail() {
  const { kakao } = window;
  const { index } = useParams();
  const navigate = useNavigate();
  const studyInfos = useRecoilValue(studyInfoState);
  const reviews = useRecoilValue(reviewState);
  const user = useRecoilValue(userState); // 로그인 상태 가져오기
  const [scraps, setScraps] = useRecoilState(playscarapState); // 스크랩 상태 관리
  const isLoggedIn = !!user; // 로그인 상태 확인
  const studyInfo = studyInfos.find((study) => study.id === parseInt(index, 10));
  const studyReviews = reviews.find(
    (review) => review.playIndex === parseInt(index, 10)
  );
  const [address, setAddress] = useState(null);
  const [isParticipating, setIsParticipating] = useState(false); // 참가 상태 확인
  const [showConfirmModal, setShowConfirmModal] = useState(false); // 참가 취소 모달 가시성 상태
  const mapRef = useRef();
  const { index: playingId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const isScrapped = scraps.includes(studyInfo?.id); // 해당 모임이 스크랩된 상태인지 확인

  useEffect(() => {
    // 더미 데이터 사용으로 fetch 생략
    setPost(studyInfo);
    setLoading(false);
  }, [playingId]);

  useEffect(() => {
    // 사용자가 현재 모임에 참가 중인지 확인하는 로직 추가
    if (user && studyInfo) {
      const userParticipation = studyInfo.participants.find(
        (participant) => participant.userId === user.id
      );
      setIsParticipating(!!userParticipation);
    }
  }, [user, studyInfo]);

  useEffect(() => {
    if (studyInfo) {
      const geocoder = new kakao.maps.services.Geocoder();
      const coord = new kakao.maps.LatLng(
        studyInfo.latitude,
        studyInfo.longitude
      );

      geocoder.coord2Address(
        coord.getLng(),
        coord.getLat(),
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            setAddress(result[0].address);
          } else {
            console.error("주소 정보를 가져오는데 실패했습니다.");
          }
        }
      );
    }
  }, [studyInfo, kakao.maps.services.Geocoder]);

  const handleDirectionsClick = () => {
    if (address && address.address_name) {
      const link = `https://map.kakao.com/link/search/${encodeURIComponent(
        address.address_name
      )}`;
      window.open(link, "_blank");
    }
  };

  const handleJoinClick = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (isParticipating) {
      setShowConfirmModal(true); // 참가 취소 모달 표시
    } else {
      // 참가하기 버튼 클릭 시 참가신청 페이지로 이동
      navigate("/PlayApply");
    }
  };

  const handleCancelParticipation = () => {
    // 참가 취소 로직 추가
    // 예: API 호출로 참가 취소 요청
    setIsParticipating(false);
    setShowConfirmModal(false);
    alert("참가가 취소되었습니다.");
  };

  const handleScrapClick = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (isScrapped) {
      setScraps((prevScraps) => {
        const newScraps = prevScraps.filter((id) => id !== studyInfo.id);
        console.log("Scrap removed:", newScraps);
        return newScraps;
      });
    } else {
      setScraps((prevScraps) => {
        const newScraps = [...prevScraps, studyInfo.id];
        console.log("Scrap added:", newScraps);
        return newScraps;
      });
    }
  };

  if (!studyInfo) {
    return <div>모집이 마감되었습니다.</div>;
  }

  return (
    <div className="play-detail-page">
      <PlayHeader/>
      <div className="play-detail-container">
        <div className="play-detail-top">
          <div className="play-detail-image">
            <img src={studyInfo.img} alt={studyInfo.name} />
          </div>
          <div className="play-detail-info">
            <div className="play-detial-component-top">
              <button className="detail-category-btn">{studyInfo.category}</button>
              <div className="detail-scrap-wrap">
                <img className="detail-scrap-btn" onClick={handleScrapClick} src={bookmarkIcon}/>
                <div className="dteail-scrap-text">스크랩</div>
              </div>
              
            </div>
            <div className="detail-play-name">{studyInfo.name}</div>
            <div className="detail-play-date">{studyInfo.date}</div>
            <div className="detail-play-time">{studyInfo.time}</div>
            <div className="detail-play-loc">
              <img src={loc}/>
              {studyInfo.loc}</div>
            <div className="detail-play-people">
              <img src={peo}/>
              {studyInfo.crnt}/{studyInfo.max}명
            </div>
          </div>
        </div>


<div className="play-detail-bottom">
  <div className="play-detail-bottom-left">
        <div className="play-detail-organizer">
          <div className="detail-profil-name">
          <img 
            src={studyInfo.profilImg}
            alt={studyInfo.nickname}
            className="organizer-profile"
          />
          <p>
            <strong className="play-detail-nickname">담당자:</strong> {studyInfo.nickname}
          </p>
          </div>
          
          <p>{studyInfo.intro}</p>
        </div>

        <div className="play-detail-reviews">
          <div className="play-detial-review-title">
            <div> {studyInfo.nickname}님에 대한 회원분들의 최근 후기에요!</div>
          </div>
          {studyReviews && studyReviews.reviews.length > 0 ? (
            studyReviews.reviews.map((review, i) => (
              <div key={i} className="play-detail-review">
                <p>
                  <div className="play-detail-review-writer">{review.author}
                    </div> 
                    <div className="play-detail-review-activity">{review.activity}</div>
                </p>
              </div>
            ))
          ) : (
            <p>후기가 없습니다.</p>
          )}
          <div className="play-detail-play-container">
            <div className="play-detail-play-title">놀이내용</div>
            <div className="play-detail-play-activity">{studyInfo.activity}</div>
          </div>
          <div className="play-detail-fee-container">
            <div className="play-detail-fee-title">참가비용</div>
            <div className="play-detail-fee-content">{studyInfo.fee}원</div>
          </div>
        </div>
        <hr />
      
        <Comment />
        </div>
        <div className="play-detail-right">
          
          <div className="play-detail-map-info">
          <Map
            center={{ lat: studyInfo.latitude, lng: studyInfo.longitude }}
            style={{ width: "100%", height: "400px" }}
            level={3}
          >
            <MapMarker
              position={{ lat: studyInfo.latitude, lng: studyInfo.longitude }}
            />
          </Map>
          <div className="play-detail-loc-info">
              <img className="play-detail-loc-img" src={locimg} alt="locimg" />
              <p className="play-detail-loc">
              
                {address
                  ? address.address_name
                  : "주소 정보를 가져오는 중입니다..."}
                </p>
            <button className="play-detail-location-btn" onClick={handleDirectionsClick}>경로 보러가기</button>


          </div>
            
          </div>
        
          <button className="play-join-button" onClick={handleJoinClick}>
        {isParticipating ? "참가 취소하기" : "참가 하기"}
      </button></div>
      </div>
      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleCancelParticipation}
      />
      </div>
      <Footer/>
    </div>

    
  );
}
