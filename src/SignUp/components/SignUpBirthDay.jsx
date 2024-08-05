import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import "../css/signupbirthday.css";

const SignUpBirthday = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { nickname } = location.state || { nickname: "" };

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

  const handleNextClick = () => {
    if (selectedYear) {
      navigate("/SignUpPhone", {
        state: { nickname, birthday: selectedYear.value },
      });
    }
  };

  return (
    <div className="signup-birthday-container">
      <div className="signup-birthday-box">
        <div className="birthday-title">출생연도를 선택해주세요!</div>
        <div className="dropdown">
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            options={generateYearOptions()}
            placeholder="1950"
            isClearable
            classNamePrefix="react-select"
          />
        </div>
        <div className="birthday-buttons">
          <button className="prev" onClick={() => navigate("/SignUpNickName")}>
            뒤로
          </button>
          <button className="next" onClick={handleNextClick}>
            다음
          </button>
        </div>
      </div>
      <a href="/Main" className="go-to-main">
        홈페이지로 돌아가기
      </a>
    </div>
  );
};

export default SignUpBirthday;
