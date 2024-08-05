import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { getYear, getMonth, format } from 'date-fns';
import { ReactComponent as Glass } from '../images/Glass.svg';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/SelectDate.css';

registerLocale('ko', ko); // 한국어 사용 등록

const SelectDate = ({ selectedDates, setSelectedDates }) => {
  const [showDatePicker, setShowDatePicker] = useState(false); // 날짜 선택 창의 표시 상태

  const handleDateChange = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd'); // 날짜를 현지 시간대에 맞춰 형식화
    let newSelectedDates;

    if (selectedDates.includes(dateStr)) {
      newSelectedDates = selectedDates.filter(d => d !== dateStr);
    } else {
      if (selectedDates.length < 3) {
        newSelectedDates = [...selectedDates, dateStr];
      } else {
        return; // 선택 3개로 제한
      }
    }
    setSelectedDates(newSelectedDates);
  };

  const isDateSelected = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return selectedDates.includes(dateStr);
  };

  const isDateDisabled = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return selectedDates.length >= 3 && !isDateSelected(date);
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
    setSelectedDates(selectedDates.filter(d => d !== dateStr));
  };

  return (
    <div>
      <div className="date-header">
        <span>날짜 선택</span>
        <button className="search-button" onClick={() => setShowDatePicker(!showDatePicker)}>
          <Glass className="glass"/>
        </button>
        <p className='date-count'>{selectedDates.length}/3</p>
      </div>
      <div className="selected-dates-container">
        <ul className="selected-dates-list">
          {selectedDates.map(date => (
            <li key={date}>
              <button onClick={() => handleRemoveDate(date)} className="date-button">
                {format(new Date(date), 'M.d')} <span className="remove-date">X</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {showDatePicker && (
        <div className="date-picker-container">
          <DatePicker
            inline
            selected={null}
            onChange={handleDateChange}
            locale="ko" // 설정을 한국어로
            renderCustomHeader={renderCustomHeader} // 커스텀 헤더를 설정합니다.
            dayClassName={date =>
              isDateSelected(date) ? 'selected-date' : undefined
            }
            calendarClassName="custom-calendar"
            filterDate={date => !isDateDisabled(date)} // 비활성화된 날짜를 필터링
          />
          <button className='select-btn' onClick={() => setShowDatePicker(false)}>완료</button>
        </div>
      )}
    </div>
  );
};

export default SelectDate;
