import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');  // 로컬 스토리지에서 토큰 가져오기

      if (!token) {
        console.error('No token found in local storage');
        return;
      }

      try {
        const response = await axios.get('https://43.201.176.194.nip.io/api/user/getMyPage', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('API Response:', response.data.data);
        setUserData(response.data.data);
      } catch (error) {
        console.error('API 요청 실패:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        안녕하세요 {userData.nickName}님!
      </div>
      <div> {userData.token}</div>
      <div>
        <div>
          {userData.nickName}님의 회원 정보
          <button onClick={() => navigate('/editProfil')}>수정하기</button>
        </div>
        <div>
          <img src={userData.profileImage} alt="프로필 사진" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
        </div>
        <div>
          <span>출생년도: {userData.year}</span>
        </div>
        <div>
          <span>연락처: {userData.phoneId}</span>
        </div>
      </div>

      <div className='movePage'>
        <h3>나의 배움터</h3>
        <button onClick={() => navigate('/myStudy')}>내가 참여한 배움터</button>
        <button onClick={() => navigate('/myScrapStudy')}>스크랩한 배움터</button>
      </div>

      <div>
        <h3>나의 놀이터</h3>
        <button onClick={() => navigate('/myPlay')}>내가 참여한 놀이터</button>
        <button onClick={() => navigate('/myScrapPlay')}>스크랩한 놀이터</button>
        <button onClick={() => navigate('/myCreatedPlay')}>내가 만든 놀이터</button>
      </div>

      <div>
        <h3>나의 생생정보터</h3>
        <button onClick={() => navigate('/myInfo')}>스크랩한 정보터</button>
      </div>
    </>
  );
}
