import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "../css/kakaologinnickname.css"; // Make sure to create a corresponding CSS file for styles

function KakaoLoginNickName() {
  const [nickname, setNickname] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const dummyData = ["yeeun", "임예은"]; // Dummy data

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    // Check if nickname is valid
    const valid = /^[a-zA-Z0-9가-힣_]{2,8}$/.test(value); // 2~8 글자, 한글, 영어, 숫자, 밑줄
    setIsValid(valid);
    setValidationMessage("");
    setIsDuplicate(false);
  };

  const checkDuplicate = () => {
    // Simulate duplicate check using dummy data
    const duplicate = dummyData.includes(nickname);
    setIsDuplicate(duplicate);
    if (duplicate) {
      setValidationMessage("중복된 별명입니다.");
    } else {
      setValidationMessage("사용 가능한 별명입니다.");
    }
  };

  const handleSubmit = () => {
    if (isValid && !isDuplicate) {
      // Navigate to SignUpNickName page
      navigate("/SignUpBirthday");
    }
  };

  return (
    <div className="kakao-login-nickname-container">
      <div className="kakao-login-nickname">
        <div className="kakao-login-nickname-title">리플레이에서 사용할</div>
        <div className="kakao-login-nickname-title">별명을 만들어주세요!</div>
        <div className="kakao-login-nickname-input-container">
          <input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="별명"
            className={`kakao-input ${
              !isValid ? "invalid" : isDuplicate ? "duplicate" : "valid"
            }`}
          />
          <button onClick={checkDuplicate} className="kakao-check-button">
            중복 확인
          </button>
          <p
            className={`validation-message ${
              !isValid || isDuplicate ? "error" : "success"
            }`}
          >
            {validationMessage || "2~8 자로 입력해주세요."}
          </p>
        </div>
        <button
          onClick={handleSubmit}
          className="kakao-submit-button"
          disabled={!isValid || isDuplicate}
        >
          다음
        </button>
      </div>
      <div className="go-to-home">
        <a href="/" className="go-to-main">
          홈페이지로 돌아가기
        </a>
      </div>
    </div>
  );
}

export default KakaoLoginNickName;
