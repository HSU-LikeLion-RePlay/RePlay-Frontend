import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { atom, useRecoilValue, useRecoilState } from "recoil";
import "../style/PlayDetail.css";
import bookmarkIcon from "../images/bookmark.jpg";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Comment from "./Comment";
import locimg from "../images/Loc.svg";
import ConfirmModal from "./ConfirmModal";
import loc from "../images/Loc.svg";
import peo from "../images/People.svg";

export const playInfoState = atom({
  key: "playInfoState",
  default: [
    {
      id: 1,
      img: "https://via.placeholder.com/150",
      category: "스포츠",
      name: "배구 직관 같이 갈 사람 구해요~~~",
      date: "08-10",
      time: "오후 3시",
      loc: "서울특별시 양천구",
      crnt: 10,
      max: 20,
      profilImg: "https://via.placeholder.com/50",
      nickname: "홍길동",
      intro: "친선 축구 경기에 참여하세요!",
      latitude: 37.5665,
      longitude: 126.978,
      participants: [{ userId: 1, userName: "홍길동" }],
    },
    {
      id: 2,
      img: "https://via.placeholder.com/150",
      category: "자기계발",
      date: "07.20",
      time: "오전 11:00",
      name: "자기계발 세미나",
      loc: "서울특별시 강남구",
      participants: [],
      max: 10,
      crnt: 4,
      profilImg: "https://via.placeholder.com/50",
      nickname: "김영희",
      intro: "자기계발에 관심 있는 분들을 위한 세미나입니다.",
      activity: "자기계발 관련 활동을 함께 합니다.",
      fee: "0",
      latitude: 37.497942,
      longitude: 127.027621,
    },
  ],
});

export const reviewState = atom({
  key: "reviewState",
  default: [
    {
      playIndex: 1,
      reviews: [
        { author: "김철수", content: "정말 즐거운 경기였어요!" },
        { author: "이영희", content: "다음에도 꼭 참여하고 싶어요!" },
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
    setPost(playInfo);
    setLoading(false);
  }, [playingId]);

  useEffect(() => {
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
      navigate("/PlayApply");
    }
  };

  const handleCancelParticipation = () => {
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
      setScraps((prevScraps) => prevScraps.filter((id) => id !== playInfo.id));
    } else {
      setScraps((prevScraps) => [...prevScraps, playInfo.id]);
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
            <button>{playInfo.category}</button>
            <button onClick={handleScrapClick}>
              <img
                src={bookmarkIcon}
                alt={isScrapped ? "스크랩됨" : "스크랩"}
              />
            </button>
            <h2>{playInfo.name}</h2>
            <p>{playInfo.date}</p>
            <p>{playInfo.time}</p>
            <p>{playInfo.loc}</p>
            <p>
              {playInfo.crnt}/{playInfo.max}명
            </p>
          </div>
        </div>
        <div className="play-detial-component-top">
          <button className="detail-category-btn">{playInfo.category}</button>
          <div className="detail-scrap-wrap">
            <img
              className="detail-scrap-btn"
              onClick={handleScrapClick}
              src={bookmarkIcon}
            />
            <div className="dteail-scrap-text">스크랩</div>
          </div>
        </div>
        <div className="detail-play-name">{playInfo.name}</div>
        <div className="detail-play-date">{playInfo.date}</div>
        <div className="detail-play-time">{playInfo.time}</div>
        <div className="detail-play-loc">
          <img src={loc} />
          {playInfo.loc}
        </div>
        <div className="detail-play-people">
          <img src={peo} />
          {playInfo.crnt}/{playInfo.max}명
        </div>
      </div>

      <div className="play-detail-bottom">
        <div className="play-detail-bottom-left">
          <div className="play-detail-organizer">
            <img
              src={playInfo.profilImg}
              alt={playInfo.nickname}
              className="organizer-profile"
            />
            <p>
              <strong>담당자:</strong> {playInfo.nickname}
            </p>
            <p>{playInfo.intro}</p>
          </div>

          <div className="play-detail-reviews">
            <h3>후기</h3>
            {playReviews && playReviews.reviews.length > 0 ? (
              playReviews.reviews.map((review, i) => (
                <div key={i} className="review">
                  <p>
                    <strong>{review.author}:</strong> {review.content}
                  </p>
                </div>
              ))
            ) : (
              <p>후기가 없습니다.</p>
            )}
          </div>
          <hr />
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
          </div>
        </div>
      </div>
      <button className="join-button" onClick={handleJoinClick}>
        {isParticipating ? "참가 취소하기" : "참가하기"}
      </button>
      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleCancelParticipation}
      />
    </div>
  );
}
