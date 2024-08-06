import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/mypage.css"; // CSS 파일을 추가합니다.
import editIcon from "../images/edit.png"; // 수정 아이콘 경로를 맞춰주세요
import MyHeader from "../../Header/components/MyHeader";
import nullImg from "../images/nullProfil.png";
import Footer from "../../Footer/components/Footer";
import arrow from "../images/rightarrow.png";
export default function MyPage() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기

      if (!token) {
        console.error("No token found in local storage");
        return;
      }

      try {
        const response = await axios.get(
          "https://43.201.176.194.nip.io/api/user/getMyPage",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response.data.data);
        setUserData(response.data.data);
      } catch (error) {
        console.error("API 요청 실패:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MyHeader />
      <div className="mypage-container">
        <div className="hello-mypage">
          안녕하세요 <span>{userData.nickName}님!</span>
        </div>
        <div className="mypage-title-header">
          <div className="mypage-title">{userData.nickName}님의 회원 정보</div>
          <button
            className="mypage-edit-button"
            onClick={() => navigate("/editProfil")}
          >
            <img src={editIcon} alt="Edit Icon" className="mypage-edit-icon" />
            <div className="mypage-edit-text">수정하기</div>
          </button>
        </div>
        <div className="mypage-user-info-container">
          <div className="mypage-user-info-content">
            <div className="mypage-profil-name">
              <img
                src={userData.profileImage || nullImg}
                alt="프로필 사진"
                className="mypage-profile-image"
              />
              <div className="mypage-user-nickname">{userData.nickName}</div>
            </div>

            <div className="mypage-user-detail">
              <span>출생년도</span> {userData.year}
            </div>
            <div className="mypage-user-detail">
              <span>연락처:</span> {userData.phoneId}
            </div>
          </div>
        </div>

        <div className="mypage-section">
          <div className="mypage-subtitle">나의 배움터</div>
          <div className="mypage-section-buttons">
            <button className="mypage-section-button">
              내가 참여한 배움터
              <img src={arrow} />
            </button>
            <button className="mypage-section-button">
              스크랩한 배움터
              <img src={arrow} />
            </button>
          </div>
          <hr className="mypage-section-hr" />
        </div>

        <div className="mypage-section">
          <div className="mypage-subtitle">나의 놀이터</div>
          <div className="mypage-section-buttons">
            <button className="mypage-section-button">
              내가 참여한 놀이터
              <img src={arrow} />
            </button>
            <button className="mypage-section-button">
              스크랩한 놀이터
              <img src={arrow} />
            </button>
            <button className="mypage-section-button">
              내가 만든 놀이터
              <img src={arrow} />
            </button>
          </div>
          <hr className="mypage-section-hr" />
        </div>

        <div className="mypage-section">
          <div className="mypage-subtitle">나의 생생정보터</div>
          <div className="mypage-section-buttons">
            <button
              className="mypage-section-button"
              onClick={() => navigate("/bookmarks")}
            >
              스크랩한 정보터
              <img src={arrow} />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
