import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { atom, useRecoilValue, useRecoilState } from "recoil";
import "../style/PlayDetail.css";
import bookmarkIcon from "../images/bookmark.jpg";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Comment from "./Comment";
import locimg from "../images/Loc.svg";
import ConfirmModal from "./ConfirmModal";
import loc from '../images/Loc.svg';
import peo from '../images/People.svg'
// 더미 데이터
export const playInfoState = atom({
  key: "playInfoState",
  default: [
    {
      id: 0,
      img: "data:image/png;base64,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",
      category: "스포츠",
      name: "배구 직관 같이 갈 사람 구해요~~~",
      date: "08-10",
      time: "오후 3시",
      loc: "김천실내체육관",
      activity: "",
      crnt: 10,
      max: 20,
      profilImg: "https://via.placeholder.com/50",
      nickname: "홍길동",
      intro: "같이 직관 승리 가봅시다",
      fee:'0',
      latitude: 37.5665,
      longitude: 126.978,
      participants: [{ userId: 1, userName: "홍길동" }],
    },
    {
      id:1,
      img: "data:image/jpeg;base64,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",
      category: '자기계발',
      date: '07.20',
      time: '오전 11:00',
      name:'자기계발 세미나',
      loc: '서울특별시 강남구',
      activity: "",
      participants:[''],
      max: 10,
      crnt:4,
      profilImg: "https://via.placeholder.com/50",
      nickname: '김영희',
      intro: '자기계발에 관심 있는 분들을 위한 세미나입니다.',
      activity: '자기계발 관련 활동을 함께 합니다.',
      fee:'0',
      latitude: '37.497942',
      longitude: '127.027621'
    },
  ],
});

export const reviewState = atom({
  key: "reviewState",
  default: [
    {
      playIndex: 1,
      reviews: [
        { author: "김철수", activity: "정말 즐거운 경기였어요!" },
        { author: "이영희", activity: "다음에도 꼭 참여하고 싶어요!" },
      ],
    },
  ],
});

export const userState = atom({
  key: "userState",
  default: { id: 1, name: "홍길동" },
});

export const playscarapState = atom({
  key: "playscarapState",
  default: [],
});

export default function PlayDetail() {
  const { kakao } = window;
  const { index } = useParams();
  const navigate = useNavigate();
  const playInfos = useRecoilValue(playInfoState);
  const reviews = useRecoilValue(reviewState);
  const user = useRecoilValue(userState); // 로그인 상태 가져오기
  const [scraps, setScraps] = useRecoilState(playscarapState); // 스크랩 상태 관리
  const isLoggedIn = !!user; // 로그인 상태 확인
  const playInfo = playInfos.find((play) => play.id === parseInt(index, 10));
  const playReviews = reviews.find(
    (review) => review.playIndex === parseInt(index, 10)
  );
  const [address, setAddress] = useState(null);
  const [isParticipating, setIsParticipating] = useState(false); // 참가 상태 확인
  const [showConfirmModal, setShowConfirmModal] = useState(false); // 참가 취소 모달 가시성 상태
  const mapRef = useRef();
  const { index: playingId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const isScrapped = scraps.includes(playInfo?.id); // 해당 모임이 스크랩된 상태인지 확인

  useEffect(() => {
    // 더미 데이터 사용으로 fetch 생략
    setPost(playInfo);
    setLoading(false);
  }, [playingId]);

  useEffect(() => {
    // 사용자가 현재 모임에 참가 중인지 확인하는 로직 추가
    if (user && playInfo) {
      const userParticipation = playInfo.participants.find(
        (participant) => participant.userId === user.id
      );
      setIsParticipating(!!userParticipation);
    }
  }, [user, playInfo]);

  useEffect(() => {
    if (playInfo) {
      const geocoder = new kakao.maps.services.Geocoder();
      const coord = new kakao.maps.LatLng(
        playInfo.latitude,
        playInfo.longitude
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
  }, [playInfo, kakao.maps.services.Geocoder]);

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
        const newScraps = prevScraps.filter((id) => id !== playInfo.id);
        console.log("Scrap removed:", newScraps);
        return newScraps;
      });
    } else {
      setScraps((prevScraps) => {
        const newScraps = [...prevScraps, playInfo.id];
        console.log("Scrap added:", newScraps);
        return newScraps;
      });
    }
  };

  if (!playInfo) {
    return <div>해당하는 모임 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="play-detail-page">
      <div className="play-detail-container">
        <div className="play-detail-top">
          <div className="play-detail-image">
            <img src={playInfo.img} alt={playInfo.name} />
          </div>
          <div className="play-detail-info">
            <div className="play-detial-component-top">
              <button className="detail-category-btn">{playInfo.category}</button>
              <div className="detail-scrap-wrap">
                <img className="detail-scrap-btn" onClick={handleScrapClick} src={bookmarkIcon}/>
                <div className="dteail-scrap-text">스크랩</div>
              </div>
              
            </div>
            <div className="detail-play-name">{playInfo.name}</div>
            <div className="detail-play-date">{playInfo.date}</div>
            <div className="detail-play-time">{playInfo.time}</div>
            <div className="detail-play-loc">
              <img src={loc}/>
              {playInfo.loc}</div>
            <div className="detail-play-people">
              <img src={peo}/>
              {playInfo.crnt}/{playInfo.max}명
            </div>
          </div>
        </div>


<div className="play-detail-bottom">
  <div className="play-detail-bottom-left">
        <div className="play-detail-organizer">
          <div className="detail-profil-name">
          <img 
            src={playInfo.profilImg}
            alt={playInfo.nickname}
            className="organizer-profile"
          />
          <p>
            <strong className="play-detail-nickname">담당자:</strong> {playInfo.nickname}
          </p>
          </div>
          
          <p>{playInfo.intro}</p>
        </div>

        <div className="play-detail-reviews">
          <div className="play-detial-review-title">
            <div> {playInfo.nickname}님에 대한 회원분들의 최근 후기에요!</div>
          </div>
          {playReviews && playReviews.reviews.length > 0 ? (
            playReviews.reviews.map((review, i) => (
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
            <div className="play-detail-play-activity">{playInfo.activity}</div>
          </div>
          <div className="play-detail-fee-container">
            <div className="play-detail-fee-title">참가비용</div>
            <div className="play-detail-fee-content">{playInfo.fee}원</div>
          </div>
        </div>
        <hr />
        <div className="play-detail-comment-title"> 놀이장에게 질문하세요!</div>
        <Comment />
        </div>
        <div className="play-detail-right">
          <Map
            center={{ lat: playInfo.latitude, lng: playInfo.longitude }}
            style={{ width: "100%", height: "400px" }}
            level={3}
          >
            <MapMarker
              position={{ lat: playInfo.latitude, lng: playInfo.longitude }}
            />
          </Map>
          <div>
            <p>
              <img src={locimg} alt="locimg" />
              {address
                ? address.address_name
                : "주소 정보를 가져오는 중입니다..."}
            </p>
            <button onClick={handleDirectionsClick}>경로 보러가기</button>
            <button className="join-button" onClick={handleJoinClick}>
        {isParticipating ? "참가 취소하기" : "참가 하기"}
      </button>
          </div>
        </div>
      </div>
      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleCancelParticipation}
      />
      </div>
      
    </div>

    
  );
}