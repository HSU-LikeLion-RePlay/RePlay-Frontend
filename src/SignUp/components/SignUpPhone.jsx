import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/signupphone.css";

const SignUpPhone = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { nickname, birthday } = location.state || {
    nickname: "",
    birthday: "",
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    setIsDuplicate(null);
    setMessage("");
  };

  const handleCheckDuplicate = async () => {
    if (!phoneNumber) {
      setMessage("휴대폰번호를 입력해주세요.");
      setIsDuplicate(null);
      return;
    }

    if (phoneNumber.length !== 11) {
      setMessage("휴대폰번호는 11자리여야 합니다.");
      setIsDuplicate(null);
      return;
    }

    try {
      const response = await fetch(
        "https://43.201.176.194.nip.io/api/user/isExistPhoneId",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneId: phoneNumber }),
        }
      );

      const result = await response.json();
      console.log(response.status, result.message); // 서버 응답 상태와 메시지 확인

      if (response.status === 200) {
        setIsDuplicate(false);
        setMessage("사용 가능한 휴대폰번호입니다!");
      } else if (response.status === 400) {
        if (result.message === "이미 사용 중인 번호입니다.") {
          setIsDuplicate(true);
          setMessage("이미 사용 중인 번호입니다.");
        } else if (result.message === "전화번호가 필요합니다.") {
          setIsDuplicate(null);
          setMessage("전화번호가 필요합니다.");
        } else {
          setMessage("잘못된 요청입니다. 다시 시도해주세요.");
        }
      } else {
        setMessage("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error(error); // 네트워크 오류 확인
      setMessage("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleNextClick = () => {
    if (!isDuplicate) {
      navigate("/signuppw", {
        state: { nickname, birthday, userId: phoneNumber },
      });
    }
  };

  return (
    <div className="signup-phone-page">
      <div className="signup-phone-container">
        <div className="title-container">
          <div className="phone-title">휴대폰번호를 입력해주세요!</div>
          <div className="phone-subtitle">
            휴대폰번호는 로그인 시 아이디로 활용됩니다.
          </div>
          <div className="phone-input-container">
            <input
              className="signup-phone-input"
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="01000000000"
            />
            <button className="phone-button" onClick={handleCheckDuplicate}>
              중복 확인
            </button>
          </div>
          {message && (
            <div
              className={`message ${
                isDuplicate === false ? "success" : "error"
              }`}
            >
              {message}
            </div>
          )}
          <div className="phone-button-container">
            <button
              className="prev"
              onClick={() => navigate("/signupbirthday")}
            >
              뒤로
            </button>
            <button
              className="next"
              onClick={handleNextClick}
              disabled={!phoneNumber || isDuplicate !== false}
            >
              다음
            </button>
          </div>
        </div>
      </div>
      <a href="/Main" className="go-to-main">
        홈페이지로 돌아가기
      </a>
    </div>
  );
};

export default SignUpPhone;
