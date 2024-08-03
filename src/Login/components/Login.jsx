import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css"; // 스타일링을 위한 CSS 파일 import

const Login = () => {
  const [phoneId, setPhoneId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePhoneIdChange = (e) => {
    setPhoneId(e.target.value);
    console.log("Phone ID changed: ", e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log("Password changed: ", e.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous error
    console.log(
      "Login attempt with phoneId:",
      phoneId,
      "and password:",
      password
    );

    try {
      const response = await fetch(
        "http://43.201.176.194:8080/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            phoneId: phoneId,
            password: password,
          }),
        }
      );

      const result = await response.json();
      console.log("Response received: ", result);

      if (response.status === 200) {
        console.log("Login successful, token:", result.data.token);
        console.log(result.data.token);
        localStorage.setItem("token", result.data.token); // 토큰만 저장
        localStorage.setItem("phoneId", phoneId); // phoneId 저장

        // 관리자 계정 확인
        if (phoneId === "01012341234" && password === "admin1234") {
          navigate("/AdminMainLogin");
        } else {
          navigate("/MainLogin");
        }
      } else if (response.status === 401) {
        console.log("Incorrect password");
        setError("비밀번호가 일치하지 않습니다.");
      } else if (response.status === 404) {
        console.log("Phone number not found");
        setError("전화번호가 존재하지 않는 회원입니다.");
      } else {
        console.log("Login failed with message: ", result.message);
        setError(result.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("Network error: ", error);
      setError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={require("../image/logo.jpg")} alt="Logo" className="logo" />
        <img
          src={require("../image/slogan.jpg")}
          alt="Slogan"
          className="slogan"
        />
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-login-group">
          <div className="login-phone">휴대폰번호</div>
          <input
            type="text"
            id="phone"
            value={phoneId}
            onChange={handlePhoneIdChange}
            placeholder="01012345678"
          />
        </div>
        <div className="input-login-group">
          <div className="login-password">비밀번호</div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력해주세요."
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-button">
          로그인
        </button>
      </form>
      <div className="kakao-login-footer">
        <div className="kakao-first">
          <div className="kakao-first-text">
            리플레이가 처음이신가요?{" "}
            <a href="/SignUpNickName" className="signup-link">
              회원가입
            </a>
            {/* 링크확인 */}
            <a href="/AdminInformationPost" className="signup-link">
              AdminInformationPost
            </a>
            <a href="/InformationPost" className="signup-link">
              InformationPost
            </a>
            <a href="/Post" className="signup-link">
              Post
            </a>
          </div>
        </div>

        <button className="start-kakao-button">
          <img
            src={require("../image/kakao_logo.png")}
            alt="Kakao"
            className="start-kakao-logo"
          />
          카카오로 시작하기
        </button>
      </div>
    </div>
  );
};

export default Login