import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from 'react-datepicker';
import { getYear, getMonth, format } from 'date-fns';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import "../style/MakePlay.css"; // 일반 페이지 스타일을 적용할 CSS 파일
import { useNavigate } from 'react-router-dom';
import axios from "axios";
registerLocale('ko', ko); // 한국어 사용 등록

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
  { ko: "기타", en: "ETC" }
];

export default function MakePlay() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    date: [],
    time: { period: 'AM', hour: '12', minute: '00' },
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
  const [mapLoaded, setMapLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=ae2978fc2880d018ad22d87fdbffe488&autoload=false";
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        initializeMap();
        setMapLoaded(true);
      });
    };

    script.onerror = () => {
      console.error("Error loading the Kakao Maps script.");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeMap = () => {
    try {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);

      window.kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        const latlng = mouseEvent.latLng;
        setFormData((prevFormData) => ({
          ...prevFormData,
          location: `${latlng.getLat()}, ${latlng.getLng()}`,
          latitude: latlng.getLat(),
          longitude: latlng.getLng(),
        }));
      });
    } catch (error) {
      console.error("Error initializing the map:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleDateChange = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    let newSelectedDates;

    if (formData.date.includes(dateStr)) {
      newSelectedDates = formData.date.filter(d => d !== dateStr);
    } else {
      if (formData.date.length < 3) {
        newSelectedDates = [...formData.date, dateStr];
      } else {
        return; // 선택 3개로 제한
      }
    }
    setFormData({
      ...formData,
      date: newSelectedDates
    });
  };

  const isDateSelected = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return formData.date.includes(dateStr);
  };

  const isDateDisabled = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
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
        {'<'}
      </button>
      <span>{`${getYear(date)}년 ${getMonth(date) + 1}월`}</span>
      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        {'>'}
      </button>
    </div>
  );

  const handleRemoveDate = (dateStr) => {
    setFormData({
      ...formData,
      date: formData.date.filter(d => d !== dateStr)
    });
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      time: {
        ...formData.time,
        [name]: value
      }
    });
  };

  const handleCategoryChange = (category) => {
    setFormData({
      ...formData,
      category
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const dateStr = `${formData.date.join(', ')} ${formData.time.period} ${formData.time.hour}:${formData.time.minute}`;
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰을 가져옵니다.
    console.log("Token: ", token); // 토큰 확인
  
    const data = new FormData();
    data.append("introduce", formData.name || '.');
    data.append("title", formData.title || '.');
    data.append("date", dateStr);
    data.append("locate", formData.location || '123 Test Street');
    data.append("latitude", formData.latitude || '37.7749');
    data.append("longitude", formData.longitude || '-122.4194');
    data.append("state", "SEOUL");
    data.append("district", "SEONGBUK");
    data.append("category", formData.category || 'ETC');
    data.append("content", formData.description || '.');
    data.append("totalCount", formData.participants || '1');
    data.append("cost", formData.fee || '0');
    data.append("costDescription", "Entry fee is 100 units.");
    if (formData.photo) {
      data.append("photo", formData.photo);
    }
  
    console.log("FormData: ", Array.from(data.entries())); // FormData 확인
  
    try {
      const response = await axios.post('http://43.201.176.194:8080/api/playing/writePost', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log("Response: ", response); // 응답 확인
  
      if (response.status === 200) {
        console.log("Success:", response.data);
        // 성공하면 웰컴 페이지로 이동
        navigate('/welcomeMakePlay', { state: { nickname: formData.name } });
      } else {
        console.error("Error:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };
  
  

  return (
    <div className="make-play-container">
      <form onSubmit={handleSubmit} className="make-play-form">
        {step === 1 && (
          <div>
            <label>자기소개:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
        )}
        {step === 2 && (
          <div>
            <label>제목:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="selected-dates-container">
              <ul className="selected-dates-list">
                {formData.date.map(date => (
                  <li key={date}>
                    <button onClick={() => handleRemoveDate(date)} className="date-button">
                      {format(new Date(date), 'M.d')} <span className="remove-date">X</span>
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
                dayClassName={date =>
                  isDateSelected(date) ? 'selected-date' : undefined
                }
                calendarClassName="custom-calendar"
                filterDate={date => !isDateDisabled(date)}
              />
              <div className="time-select-container">
                <select name="period" value={formData.time.period} onChange={handleTimeChange}>
                  <option value="AM">오전</option>
                  <option value="PM">오후</option>
                </select>
                <select name="hour" value={formData.time.hour} onChange={handleTimeChange}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>
                  ))}
                </select>
                <select name="minute" value={formData.time.minute} onChange={handleTimeChange}>
                  {Array.from({ length: 6 }, (_, i) => (
                    <option key={i} value={String(i * 10).padStart(2, '0')}>{i * 10}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
        {step === 4 && (
          <div>
            <label>위치:</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required readOnly />
            <div id="map" style={{ width: '500px', height: '500px' }}></div>
          </div>
        )}
        {step === 5 && (
          <div>
            <label>카테고리:</label>
            <div>
              <div className='header'>
                <span>카테고리</span>
                <p className='category-count'>{formData.category ? 1 : 0}/1</p>
              </div>
              <div className='category-wrap'>
                {categories.map(({ ko, en }) => (
                  <button
                    className={`select-category ${formData.category === en ? 'selected' : ''}`}
                    key={en}
                    onClick={() => handleCategoryChange(en)}
                    type="button"
                  >
                    {ko}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {step === 6 && (
          <div>
            <label>설명:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </div>
        )}
        {step === 7 && (
          <div>
            <label>사진:</label>
            <input type="file" name="photo" onChange={handleChange} />
          </div>
        )}
        {step === 8 && (
          <div>
            <label>모임 인원:</label>
            <input type="number" name="participants" value={formData.participants} onChange={handleChange} min="1" required />
          </div>
        )}
        {step === 9 && (
          <div>
            <label>참가 비용:</label>
            <input type="number" name="fee" value={formData.fee} onChange={handleChange} min="0" required />
          </div>
        )}
        <div className="form-buttons">
          {step > 1 && <button type="button" onClick={handlePrevious}>뒤로</button>}
          {step < 9 && <button type="button" onClick={handleNext}>다음</button>}
          {step === 9 && <button type="submit">완료</button>}
        </div>
      </form>
    </div>
  );
}
