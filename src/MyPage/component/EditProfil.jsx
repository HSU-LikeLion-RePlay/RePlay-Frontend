import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/editprofil.css";

function EditProfile() {
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(null);
  const [isPhoneDuplicate, setIsPhoneDuplicate] = useState(null);
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    setIsNicknameDuplicate(null);
    setNicknameMessage("");
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setIsPhoneDuplicate(null);
    setPhoneMessage("");
  };

  const checkNicknameDuplicate = async () => {
    const nicknamePattern = /^[a-zA-Z가-힣]{2,8}$/;
    if (!nicknamePattern.test(nickname)) {
      setNicknameMessage("별명은 2~8자 사이의 영어, 한글만 가능합니다.");
      setIsNicknameDuplicate(true);
      return;
    }

    // 예시: 백엔드와의 통신을 통해 닉네임 중복 여부를 확인합니다.
    const existingNicknames = ["existingNickname1", "existingNickname2"];
    if (existingNicknames.includes(nickname)) {
      setIsNicknameDuplicate(true);
      setNicknameMessage("이미 사용 중인 별명입니다.");
    } else {
      setIsNicknameDuplicate(false);
      setNicknameMessage("사용 가능한 별명입니다!");
    }
  };

  const checkPhoneDuplicate = async () => {
    const phonePattern = /^[0-9]{11}$/;
    if (!phonePattern.test(phoneNumber)) {
      setPhoneMessage("휴대폰번호는 숫자로만 11자리여야 합니다.");
      setIsPhoneDuplicate(true);
      return;
    }

    // 예시: 백엔드와의 통신을 통해 전화번호 중복 여부를 확인합니다.
    const existingPhones = ["01022222222", "01033333333"];
    if (existingPhones.includes(phoneNumber)) {
      setIsPhoneDuplicate(true);
      setPhoneMessage("이미 사용 중인 번호입니다.");
    } else {
      setIsPhoneDuplicate(false);
      setPhoneMessage("사용 가능한 휴대폰번호입니다!");
    }
  };

  const handleSubmit = () => {
    if (!isNicknameDuplicate && !isPhoneDuplicate) {
      // 제출 로직 추가
      setShowModal(true);
      setModalMessage("수정되었습니다.");
      // navigate("/nextpage", { state: { nickname, phoneNumber } });
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

  const renderYearOptions = () => {
    const years = [];
    for (let year = 1950; year <= 2024; year++) {
      years.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return years;
  };

  return (
    <div className="edit-profile-container">
      <div className="title-edit-profile-container">내 정보 수정하기</div>
      <div className="profile-image-container">
        <label htmlFor="profileImageInput" className="profile-image-label">
          <img
            src={profileImage || "https://via.placeholder.com/100"}
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
          <select id="birthYear">{renderYearOptions()}</select>
        </div>
      </div>

      <div className="edit-form-group">
        <label htmlFor="phoneNumber">휴대폰 번호</label>
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
          !phoneNumber.match(/^[0-9]{11}$/)
        }
      >
        저장하기
      </button>

      {showModal && (
        <div className="modal-container">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
