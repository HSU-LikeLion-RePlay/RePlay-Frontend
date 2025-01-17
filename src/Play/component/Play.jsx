import React, { useState,useEffect } from 'react';
import Category from './Category';
import Mentoring from './Mentoring';
import SelectDate from './SelectDate';
import Location from './Location';
import { useNavigate } from 'react-router-dom';
import LoginHeader from '../../Header/components/LoginHeader';
import logo from '../images/logo.svg';
import namelogo from '../images/namelogo.svg'
import PlayHeader from '../../Header/components/PlayHeader';
import Footer from '../../Footer/components/Footer'
import '../style/Play.css'
import plus from '../images/Plus.png'
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
        "https://43.201.176.194.nip.io/api/playing/filtering", {
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
     <PlayHeader/>
    <div className='play-container'>
      <div className="play-banner">
        <div className='play-banner-ments'>
        <div className="play-banner-comment"> 애들은 가라. <br/> 다시 한번 <span> 뜨겁게 </span> 놀아보자.</div>
        <div className="play-banner-explain">리플레이의 놀이터는 모든 시니어를 위한 놀이공간입니다.<br/>지금 바로 다양한 놀이에 참여해보세요!</div>
        </div>
        <div className="play-banner-logo">
          <img  className="banner-img"src={logo}></img>
          <img className="banner-name"src={namelogo}></img>
        </div>


      </div>

        <div className='play-content'>
        <div className='play-left-container'>
          <SelectDate selectedDates={selectedDates} setSelectedDates={setSelectedDates} />
          <Location selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
          <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <div className="save-button-container">
            <button onClick={handleSave} className="save-button">적용하기</button>
          </div>
        </div>

          <div className='play-right-container'>

            <div className='play-button-container'><button onClick={() => navigate('/makeplay')}> <img src={plus}/>놀이터 만들기</button></div>
            <Mentoring />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
