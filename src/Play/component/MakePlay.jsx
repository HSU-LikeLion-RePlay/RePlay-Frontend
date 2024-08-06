import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { getYear, getMonth, format } from "date-fns";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import "../style/MakePlay.css"; // 일반 페이지 스타일을 적용할 CSS 파일
import { useNavigate } from "react-router-dom";
import axios from "axios";
registerLocale("ko", ko); // 한국어 사용 등록

const categories = [
  { ko: "자기계발", en: "IMPROVEMENT" },
  { ko: "외국어", en: "LANGUAGE" },
  { ko: "SNS", en: "SNS" },
  { ko: "독서", en: "BOOK" },
  { ko: "문화∙예술", en: "CULTURE" },
  { ko: "요리", en: "COOKING" },
  { ko: "여행", en: "TRIP" },
  { ko: "운동", en: "EXERCISE" },
  { ko: "나들이", en: "PICNIC" },
  { ko: "맛집탐방", en: "RESTAURANT" },
  { ko: "오락", en: "ENTERTAINMENT" },
  { ko: "기타", en: "ETC" },
];

const MakePlay = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    date: [],
    time: { period: "AM", hour: "12", minute: "00" },
    location: "",
    latitude: null,
    longitude: null,
    category: "",
    description: "",
    photo: null,
    participants: 1,
    fee: 0,
  });

  const [step, setStep] = useState(1);
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 4) {
      initializeMap();
    }
  }, [step, place]);

  const initializeMap = () => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 중심 좌표
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
    const ps = new window.kakao.maps.services.Places();
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    ps.keywordSearch(place, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        let bounds = new window.kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }
        map.setBounds(bounds);
      }
    });

    const displayMarker = (place) => {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      window.kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);

        setFormData((prevFormData) => ({
          ...prevFormData,
          location: place.address_name,
          latitude: place.y,
          longitude: place.x,
        }));
      });
    };
  };

  const handleKeywordChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDateChange = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    let newSelectedDates;

    if (formData.date.includes(dateStr)) {
      newSelectedDates = formData.date.filter((d) => d !== dateStr);
    } else {
      if (formData.date.length < 3) {
        newSelectedDates = [...formData.date, dateStr];
      } else {
        return; // 선택 3개로 제한
      }
    }
    setFormData({
      ...formData,
      date: newSelectedDates,
    });
  };

  const isDateSelected = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return formData.date.includes(dateStr);
  };

  const isDateDisabled = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return formData.date.length >= 3 && !isDateSelected(date);
  };

  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className="custom-header">
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        {"<"}
      </button>
      <span>{`${getYear(date)}년 ${getMonth(date) + 1}월`}</span>
      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        {">"}
      </button>
    </div>
  );

  const handleRemoveDate = (dateStr) => {
    setFormData({
      ...formData,
      date: formData.date.filter((d) => d !== dateStr),
    });
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      time: {
        ...formData.time,
        [name]: value,
      },
    });
  };

  const handleCategoryChange = (category) => {
    setFormData({
      ...formData,
      category,
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleCancel = () => {
    navigate("/play");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dateStr = `${formData.date.join(", ")} ${formData.time.period} ${
      formData.time.hour
    }:${formData.time.minute}`;
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰을 가져옵니다.
    console.log("Token: ", token); // 토큰 확인

    // playingWriteRequestDTO 객체를 JSON 문자열로 변환하고 Blob으로 감쌉니다.
    const playingWriteRequestDTO = new Blob(
      [
        JSON.stringify({
          introduce: formData.name || "Hello, this is a test introduction.",
          title: formData.title || "Test Title",
          date: dateStr || "2024년 8월 18일 오전 10시 30분",
          locate: formData.location || "123 Test Street",
          latitude: formData.latitude || "37.7749",
          longitude: formData.longitude || "-122.4194",
          state: "SEOUL",
          district: "SEONGBUK",
          category: formData.category || "SNS",
          content:
            formData.description || "This is a test content for the play.",
          totalCount: parseInt(formData.participants, 10) || 10,
          cost: formData.fee || "100",
          costDescription: "Entry fee is 100 units.",
        }),
      ],
      {
        type: "application/json",
      }
    );

    const data = new FormData();
    data.append("playingWriteRequestDTO", playingWriteRequestDTO);

    if (formData.photo) {
      data.append("playingImage", formData.photo);
    }

    console.log("FormData: ", Array.from(data.entries())); // FormData 확인

    try {
      const response = await axios.post(
        "https://43.201.176.194.nip.io/api/playing/writePost",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response: ", response); // 응답 확인

      if (response.status === 200 || response.status === 201) {
        console.log("Success:", response.data);
        // 성공하면 웰컴 페이지로 이동
        navigate("/welcomeMakePlay", {
          state: { nickname: formData.name, isEdited: false },
        });
      } else {
        console.error("Error:", response.status, response.data);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="make-play-container">
      <form onSubmit={handleSubmit} className="make-play-form">
        <button type="button" className="close-button" onClick={handleCancel}>
          X
        </button>
        {step === 1 && (
          <div className="make-play-introduce">
            <div className="make-play-introduce-container">
              <label>놀이터를 만들기에 앞서</label>
              <br />
              <label>간단한 자기소개 부탁드려요!</label>
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength="100"
              required
              className="makeplay-pr"
            />
            <div className="character-count">{formData.name.length}/100</div>
            <div className="makeplay-form-buttons">
              <button
                type="button"
                onClick={handleNext}
                className="makeplay-first-button"
              >
                다음
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="make-play-2">
            <div className="make-play-introduce">
              <div className="make-play-introduce-container">
                <label>당신의 놀이를</label>
                <br />
                <label>한줄로 표현해주세요!</label>
              </div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                maxLength="30"
                required
                className="makeplay-title"
              />
              <div className="character-count">{formData.title.length}/30</div>
              <div className="makeplay-form-buttons">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="makeplay-back"
                >
                  뒤로
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="makeplay-next"
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="selected-dates-container">
              <div className="make-play-3">
                놀이의 일정을 선택해주세요!
                <ul className="selected-dates-list">
                  {formData.date.map((date) => (
                    <li key={date}>
                      <button
                        onClick={() => handleRemoveDate(date)}
                        className="date-button"
                      >
                        {format(new Date(date), "M.d")}{" "}
                        <span className="remove-date">X</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="date-picker-container">
                <DatePicker
                  inline
                  selected={null}
                  onChange={handleDateChange}
                  locale="ko"
                  renderCustomHeader={renderCustomHeader}
                  dayClassName={(date) =>
                    isDateSelected(date) ? "selected-date" : undefined
                  }
                  calendarClassName="custom-calendar"
                  filterDate={(date) => !isDateDisabled(date)}
                />
                <div className="time-select-container">
                  <select
                    name="period"
                    value={formData.time.period}
                    onChange={handleTimeChange}
                  >
                    <option value="AM">오전</option>
                    <option value="PM">오후</option>
                  </select>
                  <select
                    name="hour"
                    value={formData.time.hour}
                    onChange={handleTimeChange}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={String(i + 1).padStart(2, "0")}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <select
                    name="minute"
                    value={formData.time.minute}
                    onChange={handleTimeChange}
                  >
                    {Array.from({ length: 6 }, (_, i) => (
                      <option key={i} value={String(i * 10).padStart(2, "0")}>
                        {i * 10}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="makeplay-form-buttons">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="makeplay-back-3"
                >
                  뒤로
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="makeplay-next-3"
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <label>위치:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              readOnly
            />
            <div>
              <input
                type="text"
                value={inputText}
                onChange={handleKeywordChange}
                placeholder="장소를 입력하세요"
              />
              <button onClick={handleSearch}>검색</button>
            </div>
            <div id="map" style={{ width: "500px", height: "500px" }}></div>
            <div className="makeplay-form-buttons">
              <button
                type="button"
                onClick={handlePrevious}
                className="makeplay-back"
              >
                뒤로
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="makeplay-next"
              >
                다음
              </button>
            </div>
          </div>
        )}
        {step === 5 && (
          <div>
            <label>카테고리:</label>
            <div>
              <div className="header">
                <span>카테고리</span>
                <p className="category-count">{formData.category ? 1 : 0}/1</p>
              </div>
              <div className="category-wrap">
                {categories.map(({ ko, en }) => (
                  <button
                    className={`select-category ${
                      formData.category === en ? "selected" : ""
                    }`}
                    key={en}
                    onClick={() => handleCategoryChange(en)}
                    type="button"
                  >
                    {ko}
                  </button>
                ))}
              </div>
            </div>
            <div className="makeplay-form-buttons">
              <button
                type="button"
                onClick={handlePrevious}
                className="makeplay-back"
              >
                뒤로
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="makeplay-next"
              >
                다음
              </button>
            </div>
          </div>
        )}
        {step === 6 && (
          <div>
            <label>설명:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              maxLength="500"
              required
            />
            <div className="character-count">
              {formData.description.length}/500
            </div>
            <div className="makeplay-form-buttons">
              <button
                type="button"
                onClick={handlePrevious}
                className="makeplay-back"
              >
                뒤로
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="makeplay-next"
              >
                다음
              </button>
            </div>
          </div>
        )}
        {step === 7 && (
          <div>
            <label>사진:</label>
            <input type="file" name="photo" onChange={handleChange} />
            <div className="makeplay-form-buttons">
              <button
                type="button"
                onClick={handlePrevious}
                className="makeplay-back"
              >
                뒤로
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="makeplay-next"
              >
                다음
              </button>
            </div>
          </div>
        )}
        {step === 8 && (
          <div>
            <label>모임 인원:</label>
            <input
              type="number"
              name="participants"
              value={formData.participants}
              onChange={handleChange}
              min="1"
              required
            />
            <div className="makeplay-form-buttons">
              <button
                type="button"
                onClick={handlePrevious}
                className="makeplay-back"
              >
                뒤로
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="makeplay-next"
              >
                다음
              </button>
            </div>
          </div>
        )}
        {step === 9 && (
          <div>
            <label>참가 비용:</label>
            <input
              type="number"
              name="fee"
              value={formData.fee}
              onChange={handleChange}
              min="0"
              required
            />
            <div className="makeplay-form-buttons">
              <button
                type="button"
                onClick={handlePrevious}
                className="makeplay-back"
              >
                뒤로
              </button>
              <button type="submit" className="makeplay-submit">
                완료
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default MakePlay;
