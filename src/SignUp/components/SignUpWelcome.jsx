import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MyPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');  // 로컬 스토리지에서 토큰 가져오기

      if (!token) {
        console.error('No token found in local storage');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://43.201.176.194.nip.io/api/user/getMyPage', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <>
      <div>
        안녕하세요 {userData.nickName ? userData.nickName : '사용자'}님!
      </div>

      <div>
        <div>
          {userData.nickName && `${userData.nickName}님의 회원 정보`}
          <button>수정하기</button>
        </div>
        <div>
          {userData.profileImage && (
            <img src={userData.profileImage} alt="프로필 사진" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
          )}
        </div>
        <div>
          {userData.year && <span>출생년도: {userData.year}</span>}
        </div>
        <div>
          {userData.phoneId && <span>연락처: {userData.phoneId}</span>}
        </div>
      </div>

      <div>
        <h3>나의 배움터</h3>
        {userData.myLearning && <p>{userData.myLearning}</p>}
        {userData.scrapedLearning && <p>{userData.scrapedLearning}</p>}
      </div>

      <div>
        <h3>나의 놀이터</h3>
        {userData.myPlayground && <p>{userData.myPlayground}</p>}
        {userData.scrapedPlayground && <p>{userData.scrapedPlayground}</p>}
        {userData.createdPlayground && <p>{userData.createdPlayground}</p>}
      </div>

      <div>
        <h3>나의 생생정보터</h3>
        {userData.myInformation && <p>{userData.myInformation}</p>}
        {userData.scrapedInformation && <p>{userData.scrapedInformation}</p>}
      </div>
    </>
  );
}
