import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import GuideLine from './GuideLine';
import MyBlock from './MyBlock';
import { userState, playInfoState } from '../../atoms';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import locimg from '../images/Loc.svg';
import '../style/PlayApply.css';
import FeeCheck from './FeeCheck';

export default function ApplyComplete() {
  const { kakao } = window;
  const [showModal, setShowModal] = useState(true); // 모달 가시성 상태 초기값을 true로 설정
  const user = useRecoilValue(userState); // 로그인 상태 가져오기
  const [playInfos] = useRecoilState(playInfoState); // 놀이터 정보 가져오기
  const isLoggedIn = !!user; // 로그인 상태 확인
  const [address, setAddress] = useState(null); // 주소 상태
  const mapRef = useRef();

  const handleCloseModal = () => {
    setShowModal(false); // 모달 닫기
  };

  useEffect(() => {
    setShowModal(true); // 페이지 로드 시 모달 표시
  }, []);

  // 첫 번째 블록만 가져옴
  const firstBlock = playInfos.length > 0 ? playInfos[0] : null;

  useEffect(() => {
    if (firstBlock) {
      const geocoder = new kakao.maps.services.Geocoder();
      const coord = new kakao.maps.LatLng(firstBlock.latitude, firstBlock.longitude);
      const callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          setAddress(result[0].address.address_name);
        }
      };
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    }
  }, [firstBlock]);

  const handleDirectionsClick = () => {
    if (address) {
      const link = `https://map.kakao.com/link/search/${encodeURIComponent(address)}`;
      window.open(link, '_blank');
    }
  };

  return (
    <>
      <div>
        <h1>참가 신청이 완료되었습니다.</h1>
        <div className='block-container'>
          {firstBlock && (
            <MyBlock
              img={firstBlock.img}
              category={firstBlock.category}
              date={firstBlock.date}
              time={firstBlock.time}
              name={firstBlock.name}
            />
          )}
        </div>
        <div className='map-container'>
          {firstBlock && (
            <Map
              center={{ lat: firstBlock.latitude, lng: firstBlock.longitude }}
              style={{ width: '55rem', height: '25rem' }}
              level={3}
            >
              <MapMarker
                position={{ lat: firstBlock.latitude, lng: firstBlock.longitude }}
              />
            </Map>
          )}
          <div>
            <p><img src={locimg} alt='locimg' />{address ? address : '주소 정보를 가져오는 중입니다...'}</p>
            <button onClick={handleDirectionsClick}>경로 보러가기</button>
          </div>
        </div>
        <div className='feecheck-container'>
          <FeeCheck showPayButton={false} />
        </div>
      </div>
    </>
  );
}
