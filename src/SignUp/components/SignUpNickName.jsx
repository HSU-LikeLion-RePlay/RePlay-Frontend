//닉네임 중복 처리 - 통신 완료
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/signupnickname.css";

function SignUpNickName() {
  const [nickname, setNickname] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const navigate = useNavigate();

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    const valid = /^[a-zA-Z0-9가-힣_]{2,8}$/.test(value);
    setIsValid(valid);
    setValidationMessage(valid ? "" : "2~8 자로 입력해주세요.");
    setIsDuplicate(false);
  };

  const checkDuplicate = async () => {
    try {
      console.log("Checking nickname duplication for:", nickname);

      const response = await fetch(
        "http://43.201.176.194:8080/api/user/isExistNickName",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nickName: nickname }),
        }
      );

      const text = await response.text();
      console.log("Raw response text:", text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (error) {
        console.error("Failed to parse JSON:", text);
        throw new Error("서버에서 JSON 형식이 아닌 응답이 반환되었습니다.");
      }

      console.log("Parsed response:", result);

      if (response.status === 200) {
        console.log("Nickname is available:", result.message);
        setIsDuplicate(false);
        setValidationMessage(result.message);
      } else if (response.status === 400) {
        console.log("Nickname is not available:", result.message);
        setIsDuplicate(true);
        setValidationMessage(result.message);
      } else {
        console.error("Unexpected response status:", response.status);
        setValidationMessage("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setValidationMessage(
        error.message === "서버에서 JSON 형식이 아닌 응답이 반환되었습니다."
          ? error.message
          : "네트워크 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  const handleSubmit = () => {
    if (isValid && !isDuplicate) {
      navigate("/SignUpBirthday", { state: { nickname } });
    }
  };

  return (
    <div className="signup-nickname-container">
      <div className="signup-nickname">
        <div className="signup-nickname-title">별명을 만들어주세요!</div>
        <div className="signup-nickname-input-container">
          <div className="signup-nickname-text">
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="별명"
              className={`nickname-input ${
                !isValid ? "invalid" : isDuplicate ? "duplicate" : "valid"
              }`}
            />
            <button onClick={checkDuplicate} className="check-button">
              중복 확인
            </button>
          </div>
          <p
            className={`nickname-validation-message ${
              !isValid || isDuplicate ? "error" : "success"
            }`}
          >
            {validationMessage}
          </p>
        </div>
        <button
          onClick={handleSubmit}
          className="nickname-submit-button"
          disabled={!isValid || isDuplicate}
        >
          다음
        </button>
      </div>
      <div className="go-to-home">
        <a href="/Main" className="go-to-main">
          홈페이지로 돌아가기
        </a>
      </div>
    </div>
  );
}

export default SignUpNickName;
