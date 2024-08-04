import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/mypage.css"; // CSS 파일을 추가합니다.
import editIcon from "../images/edit.png"; // 수정 아이콘 경로를 맞춰주세요

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
    <div className="mypage-container">
      <div className="hello-mypage">안녕하세요 {userData.nickName}님!</div>
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

      <div className="user-info-container">
        <div className="user-info-header"></div>
        <div className="user-info-content">
          <img
            src={userData.profileImage}
            alt="프로필 사진"
            className="profile-image"
          />
          <div className="user-details">
            <div className="user-detail-nickname">{userData.nickName}</div>
          </div>{" "}
        </div>
        <div className="user-detail">
          <strong>출생년도</strong>
          {userData.year}
        </div>

        <div className="user-detail">
          <strong>연락처:</strong> {userData.phoneId}
        </div>
      </div>

      <div className="section">
        <div className="mypage-subtitle">나의 배움터</div>
        <div className="button-container">
          <button
            className="section-button"
            onClick={() => navigate("/myStudy")}
          >
            내가 참여한 배움터
          </button>
          <button
            className="section-button"
            onClick={() => navigate("/myScrapStudy")}
          >
            스크랩한 배움터
          </button>
        </div>
      </div>

      <div className="section">
        <div className="mypage-subtitle">나의 놀이터</div>
        <div className="button-container">
          <button
            className="section-button"
            onClick={() => navigate("/myPlay")}
          >
            내가 참여한 놀이터
          </button>
          <button
            className="section-button"
            onClick={() => navigate("/myScrapPlay")}
          >
            스크랩한 놀이터
          </button>
          <button
            className="section-button"
            onClick={() => navigate("/myCreatedPlay")}
          >
            내가 만든 놀이터
          </button>
        </div>
      </div>

      <div className="section">
        <div className="mypage-subtitle">나의 생생정보터</div>
        <div className="button-container">
          <button
            className="section-button"
            onClick={() => navigate("/myInfo")}
          >
            스크랩한 정보터
          </button>
        </div>
      </div>
    </div>
  );
}
