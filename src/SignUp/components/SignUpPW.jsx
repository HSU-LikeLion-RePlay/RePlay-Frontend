import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/signuppw.css";

const SignUpPw = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { nickname, birthday, userId } = location.state || {
    nickname: "",
    birthday: "",
    userId: "",
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setAlert(e.target.value !== password);
  };

  const alertClassName = () => {
    return alert ? "login-alert-view" : "login-alert";
  };

  const handleSubmit = () => {
    if (password === confirmPassword) {
      navigate("/SignUpWelcome", {
        state: { nickname, userId, password, birthday },
      });
    } else {
      setAlert(true);
    }
  };

  return (
    <div className="signup-pw-page">
      <div className="signup-pw-container">
        <div className="password-form">
          <div className="pw-title">비밀번호를 입력해주세요!</div>
          <div className="pw-input-container1">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="pw-text">비밀번호를 한번 더 입력해주세요.</div>
          <div className="pw-input-container2">
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <div className="login-alert-container">
            <div className={alertClassName()}>
              <div class="pw-error-msg">비밀번호가 일치하지 않습니다.</div>
            </div>
          </div>
          <div className="pw-button-container">
            <button
              className="pw-back-button"
              onClick={() =>
                navigate("/signupphone", {
                  state: { nickname, birthday, userId },
                })
              }
            >
              뒤로
            </button>
            <button className="pw-submit-button" onClick={handleSubmit}>
              완료
            </button>
          </div>
        </div>
        <a href="/Main" className="pw-go-to-main">
          홈페이지로 돌아가기
        </a>
      </div>
    </div>
  );
};

export default SignUpPw;
