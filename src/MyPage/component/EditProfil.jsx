import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "../css/editprofil.css";
import axios from "axios";
import MyHeader from "../../Header/components/MyHeader";

function EditProfile() {
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(null);
  const [isPhoneDuplicate, setIsPhoneDuplicate] = useState(null);
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

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
        setNickname(response.data.data.nickName || "");
        setPhoneNumber(response.data.data.phoneId || "");
        setSelectedYear({ label: response.data.data.year, value: response.data.data.year });
      } catch (error) {
        console.error("API 요청 실패:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);

    const valid = /^[a-zA-Z0-9가-힣_]{2,8}$/.test(value);
    setIsNicknameValid(valid);

    if (!valid) {
      setValidationMessage("2~8 자로 입력해주세요.");
      setIsNicknameDuplicate(true);
      setNicknameMessage("별명은 2~8 자로 입력해주세요.");
    } else {
      setValidationMessage("");
      setIsNicknameDuplicate(false);
      setNicknameMessage("");
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setIsPhoneDuplicate(null);
    setPhoneMessage("");
  };

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 1950; year <= currentYear; year++) {
      years.push({ label: year.toString(), value: year.toString() });
    }
    return years;
  };

  const checkNicknameDuplicate = async () => {
    const valid = /^[a-zA-Z0-9가-힣_]{2,8}$/.test(nickname);
    if (!valid) {
      setNicknameMessage("별명은 2~8 자로 입력해주세요.");
      setIsNicknameDuplicate(true);
      return;
    }

    try {
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
      if (response.status === 200) {
        setIsNicknameDuplicate(false);
        setNicknameMessage("사용 가능한 별명입니다!");
      } else {
        setIsNicknameDuplicate(true);
        setNicknameMessage(result.message);
      }
    } catch (error) {
      setNicknameMessage("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const checkPhoneDuplicate = async () => {
    const valid = /^[0-9]{11}$/.test(phoneNumber);
    if (!valid) {
      setPhoneMessage("휴대폰번호는 숫자로만 11자리여야 합니다.");
      setIsPhoneDuplicate(true);
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
      if (response.status === 200) {
        setIsPhoneDuplicate(false);
        setPhoneMessage("사용 가능한 휴대폰번호입니다!");
      } else {
        setIsPhoneDuplicate(true);
        setPhoneMessage(result.message);
      }
    } catch (error) {
      setPhoneMessage("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleSubmit = () => {
    if (!isNicknameDuplicate && !isPhoneDuplicate && selectedYear) {
      // 제출 로직 추가
      setShowModal(true);
      setModalMessage("수정되었습니다.");
    } else {
      setShowModal(true);
      setModalMessage("저장에 실패했습니다. 입력 내용을 확인해주세요.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MyHeader />
      <div className="edit-profile edit-profile-container">
        <div className="title-edit-profile-container">내 정보 수정하기</div>
        <div className="profile-image-container">
          <label htmlFor="profileImageInput" className="profile-image-label">
            <img
              src={userData.profileImage || "https://via.placeholder.com/100"}
              alt="프로필"
              className="profile-image"
            />
            <div className="edit-profil-image">변경하기</div>
          </label>
          <input
            type="file"
            id="profileImageInput"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="edit-form-group">
          <label htmlFor="nickname">별명</label>
          <div className="edit-input-group">
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="현재 별명"
            />
            <button onClick={checkNicknameDuplicate} className="check-button">
              중복 확인
            </button>
          </div>
          {nicknameMessage && (
            <p className={isNicknameDuplicate ? "error" : "success"}>
              {nicknameMessage}
            </p>
          )}
        </div>

        <div className="edit-form-group">
          <label htmlFor="birthYear">출생년도</label>
          <div className="edit-input-group">
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              options={generateYearOptions()}
              placeholder="현재 출생년도"
              isClearable
              classNamePrefix="react-select"
            />
          </div>
        </div>

        <div className="edit-form-group">
          <label htmlFor="phoneNumber">휴대폰 번호</label>
          <div className="phone-subtitle">
            휴대폰번호는 로그인 시 아이디로 활용됩니다.
          </div>
          <div className="edit-input-group">
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="현재 번호"
            />
            <button onClick={checkPhoneDuplicate} className="check-button">
              중복 확인
            </button>
          </div>
          {phoneMessage && (
            <p className={isPhoneDuplicate ? "error" : "success"}>
              {phoneMessage}
            </p>
          )}
        </div>

        <button
          className="editprofil-submit-button"
          onClick={handleSubmit}
          disabled={
            isNicknameDuplicate ||
            isPhoneDuplicate ||
            !phoneNumber.match(/^[0-9]{11}$/) ||
            !selectedYear
          }
        >
          저장하기
        </button>

        {showModal && (
          <div className="editprofil-modal-container">
            <div className="editprofil-modal-content">
              <p>{modalMessage}</p>
              <button onClick={() => setShowModal(false)}>확인</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EditProfile;
