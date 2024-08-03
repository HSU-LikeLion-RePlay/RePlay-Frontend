
import React, { useState,useEffect } from 'react';
import Category from './Category';
import Mentoring from './Mentoring';
import SelectDate from './SelectDate';
import Location from './Location';
import { useNavigate } from 'react-router-dom';
import LoginHeader from '../../Header/components/LoginHeader';

import LoginHeader from '../../Header/components/LoginHeader';
export default function Play() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://43.201.176.194.nip.io/api/playing/getPlaying", {
          method: "GET",
          
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const result = await response.json();
        console.log("Response status:", response.status);
        console.log("Response result:", result);
  
        if (response.status === 200) {
          console.log("데이터 가져오기 성공:", result.data.allInfos);
        } else {
          console.error("Error message:", result.message);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    return `${month} ${day}일`;
  };

  const handleSave = async () => {
    const formattedDates = selectedDates.map(date => formatDate(date));

    const stateList = selectedLocation.map(location => location.split(' ')[0]);
    const districtList = selectedLocation.map(location => location.split(' ')[1]);

    const data = {
      category: selectedCategory,
      dateList: formattedDates,
      stateList: stateList,
      districtList: districtList,
    };

    console.log('저장된 데이터:', data);

    try {
      const response = await fetch(
        "http://43.201.176.194:8080/api/playing/filtering", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.status === 200) {
        console.log(result);
        alert(result.message);
        // 성공적인 응답에 따른 추가 작업 수행
      } else {
        console.error(result);
        alert(result.message);
        // 에러 처리
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버와 통신 중 오류가 발생했습니다.');
      // 통신 오류 처리
    }
  };

  return (
    <>
      <LoginHeader/>
      <SelectDate selectedDates={selectedDates} setSelectedDates={setSelectedDates} />
      <Location selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
      <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <button onClick={handleSave} className="save-button">적용하기</button>
      <button onClick={() => navigate('/makeplay')}>놀이터 만들기</button>
      <Mentoring />
    </>
  );
}
