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
    // 자음 또는 모음만 포함된 별명 검사 추가
    const isValidNickname =
      /^[a-zA-Z0-9가-힣]{2,8}$/.test(value) && !/^[ㄱ-ㅎㅏ-ㅣ]+$/.test(value);
    setIsValid(isValidNickname);
    setValidationMessage(isValidNickname ? "" : "2~8 자로 입력해주세요.");
    setIsDuplicate(false);
  };

  const checkDuplicate = async () => {
    if (!isValid) {
      setValidationMessage("유효한 별명을 입력해주세요.");
      return;
    }

    try {
      console.log("Checking nickname duplication for:", nickname);

      const response = await fetch(
        "https://43.201.176.194.nip.io/api/user/isExistNickName",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nickName: nickname }),
        }
      );

      const result = await response.json();

      console.log("Parsed response:", result);

      if (response.status === 200) {
        console.log("Nickname is available:", result.message);
        setIsDuplicate(false);
        setValidationMessage("사용할 수 있는 별명입니다.");
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
      setValidationMessage("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleSubmit = () => {
    if (isValid && !isDuplicate) {
      navigate("/SignUpBirthday", { state: { nickname } });
    } else {
      setValidationMessage("유효한 별명을 입력하고 중복 확인을 해주세요.");
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
              className={`signup-nickname-input ${
                !isValid ? "invalid" : isDuplicate ? "duplicate" : "valid"
              }`}
            />
            <button onClick={checkDuplicate} className="nickname-check-button">
              중복 확인
            </button>
          </div>
          <div className="nickname-validation-message-container">
            <p
              className={`nickname-validation-message ${
                !isValid || isDuplicate ? "error" : "success"
              }`}
            >
              {validationMessage}
            </p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="nickname-submit-button"
          disabled={!isValid || isDuplicate}
        >
          다음
        </button>
      </div>
      <a href="/Main" className="go-to-main">
        홈페이지로 돌아가기
      </a>
    </div>
  );
}

export default SignUpNickName;
