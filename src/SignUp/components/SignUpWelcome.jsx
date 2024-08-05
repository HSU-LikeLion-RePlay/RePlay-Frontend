import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/signupwelcome.css";

const SignUpWelcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { nickname, userId, password, birthday } = location.state || {
    nickname: "",
    userId: "",
    password: "",
    birthday: "",
  };

  const handleHomeButtonClick = async () => {
    try {
      const response = await fetch(
        "https://43.201.176.194.nip.io/api/user/signUp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            phoneId: userId,
            password: password,
            nickname: nickname,
            year: birthday,
            userRoles: ["ROLE_USER"],
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        // 사용자 정보 localStorage에 저장
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("token", data.token); // 서버에서 발급한 토큰 저장
        navigate("/");
      } else if (response.status === 400) {
        alert("입력값이 올바르지 않습니다.");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="signup-welcome-container">
      <div className="signup-welcome-page">
        <div className="welcome-page-text">
          <span className="welcome-highlight-text">{nickname}</span>
          <div className="welcome-text"> 님 환영합니다!</div>
        </div>
        <div className="user-info-box">
          <div className="information">{nickname}님의 회원정보</div>
          <div className="line"></div>
          <div className="user-info">
            <div className="box">
              <div>
                <span className="label">아이디</span>{" "}
                <span className="value">{userId}</span>
              </div>
            </div>
            <div className="box">
              <div>
                <span className="label">비밀번호</span>{" "}
                <span className="value">{password}</span>
              </div>
            </div>
          </div>
          <p className="note">
            잊어버리지 않게{" "}
            <span className="highlight-text">꼭 기억해주세요!</span>
          </p>
        </div>
        <button className="welcome-home-button" onClick={handleHomeButtonClick}>
          홈페이지로 이동
        </button>
      </div>
    </div>
  );
};

export default SignUpWelcome;
