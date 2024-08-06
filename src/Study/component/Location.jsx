import React, { useState } from 'react';
import '../style/Location.css';
import glass from '../images/Glass.svg';
import before from '../images/before.svg';

const locations = {
    서울: ["전체", "강남", "강동", "강북", "강서", "관악", "광진", "구로", "금천", "노원", "도봉", "동대문", "동작", "마포", "서대문", "서초", "성동", "성북", "송파", "양천", "영등포", "용산", "은평", "종로", "중구", "중랑"],
    경기: ["전체", "가평", "고양", "광명", "광주", "구리", "군포", "김포", "부천", "성남", "수원", "시흥", "안산", "안성", "안양", "오산", "용인", "의왕", "의정부", "이천", "파주", "평택", "포천", "하남", "화성"],
    부산: ["전체", "강서", "금정", "기장", "남구", "동구", "동래", "부산진", "북구", "사상", "사하", "서구", "수영", "연제", "영도", "중구", "해운대"],
    경남: ["전체", "거제", "김해", "마산", "밀양", "사천", "양산", "진주", "창원", "통영", "하동", "함안", "함양", "산청", "거창", "의령", "창녕"],
    인천: ["전체", "강화", "계양", "남동", "동구", "미추홀", "부평", "서구", "연수", "웅진", "중구"],
    경북: ["전체", "경산", "경주", "구미", "김천", "문경", "상주", "안동", "영주", "영천", "포항", "칠곡", "봉화", "울진", "울릉"],
    대구: ["전체", "남구", "달서", "달성", "동구", "북구", "서구", "수성", "중구"],
    충남: ["전체", "천안", "논산", "공주", "보령", "서산", "아산", "당진", "연기", "금산", "부여", "서천"],
    전남: ["전체", "광양", "목포", "순천", "여수", "완도", "강진", "해남", "영암", "진도", "무안", "신안"],
    전북: ["전체", "군산", "익산", "전주", "정읍", "남원", "김제", "완주", "진안", "무주", "장수", "임실", "순창"],
    충북: ["전체", "제천", "청주", "충주", "옥천", "보은", "영동", "진천", "괴산", "음성", "증평"],
    강원: ["전체", "강릉", "동해", "삼척", "속초", "원주", "춘천", "철원", "평창", "홍천", "횡성"],
    광주: ["전체", "광산", "남구", "동구", "북구", "서구"],
    대전: ["전체", "대덕", "동구", "서구", "유성", "중구"],
    울산: ["전체", "남구", "동구", "북구", "울주", "중구"],
    제주: ["전체", "제주", "서귀포"],
    세종: ["전체"]
};

const locationTranslations = {
    서울: "SEOUL", 강남: "GANGNAM", 강동: "GANGDONG", 강북: "GANGBUK", 강서: "GANGSEO", 관악: "GWANAK", 광진: "GWANGJIN", 구로: "GURO", 금천: "GUMCHEON", 노원: "NOWON", 도봉: "DOBONG", 동대문: "DONGDAEMUN", 동작: "DONGJAK", 마포: "MAPO", 서대문: "SEODAEMUN", 서초: "SEOCHO", 성동: "SEONGDONG", 성북: "SEONGBUK", 송파: "SONGPA", 양천: "YANGCHEON", 영등포: "YEONGDEUNGPO", 용산: "YONGSAN", 은평: "EUNPYEONG", 종로: "JONGNO", 중구: "JUNG", 중랑: "JUNGRANG",
    경기: "GYEONGGI", 가평: "GAPYEONG", 고양: "GOYANG", 광명: "GWANGMYEONG", 광주: "GWANGJU", 구리: "GURI", 군포: "GUNPO", 김포: "GIMPO", 부천: "BUCHEON", 성남: "SEONGNAM", 수원: "SUWON", 시흥: "SIHEUNG", 안산: "ANSAN", 안성: "ANSEONG", 안양: "ANYANG", 오산: "OSAN", 용인: "YONGIN", 의왕: "UIWANG", 의정부: "UIJEONGBU", 이천: "ICHEON", 파주: "PAJU", 평택: "PYEONGTAEK", 포천: "POCHEON", 하남: "HANAM", 화성: "HWASEONG",
    부산: "BUSAN", 강서: "GANGSEO", 금정: "GEUMJEONG", 기장: "GIJANG", 남구: "NAMGU", 동구: "DONGGU", 동래: "DONGNAE", 부산진: "BUSANJIN", 북구: "BUKGU", 사상: "SASANG", 사하: "SAHA", 서구: "SEOGU", 수영: "SUYEONG", 연제: "YEONJE", 영도: "YEONGDO", 중구: "JUNGGU", 해운대: "HAEUNDAE",
    경남: "GYEONGNAM", 거제: "GEOJE", 김해: "GIMHAE", 마산: "MASAN", 밀양: "MIRYANG", 사천: "SACHEON", 양산: "YANGSAN", 진주: "JINJU", 창원: "CHANGWON", 통영: "TONGYEONG", 하동: "HADONG", 함안: "HAMAN", 함양: "HAMYANG", 산청: "SANCHEONG", 거창: "GECHANG", 의령: "UIRYEONG", 창녕: "CHANGNYEONG",
    인천: "INCHEON", 강화: "GANGHWA", 계양: "GYEYANG", 남동: "NAMDONG", 동구: "DONGGU", 미추홀: "MICHUHOL", 부평: "BUPYEONG", 서구: "SEOGU", 연수: "YEONSU", 웅진: "WOONGJIN", 중구: "JUNGGU",
    경북: "GYEONGBUK", 경산: "GYEONGSAN", 경주: "GYEONGJU", 구미: "GUMI", 김천: "GIMCHEON", 문경: "MUNGYEONG", 상주: "SANGJU", 안동: "ANDONG", 영주: "YEONGJU", 영천: "YEONGCHEON", 포항: "POHANG", 칠곡: "CHILGOK", 봉화: "BONGHWA", 울진: "ULJIN", 울릉: "ULLUNG",
    대구: "DAEGU", 남구: "NAMGU", 달서: "DALSEO", 달성: "DALSEONG", 동구: "DONGGU", 북구: "BUKGU", 서구: "SEOGU", 수성: "SUSEONG", 중구: "JUNGGU",
    충남: "CHUNGNAM", 천안: "CHEONAN", 논산: "NONSAN", 공주: "GONGJU", 보령: "BOREYEONG", 서산: "SEOSAN", 아산: "ASAN", 당진: "DANGJIN", 연기: "YEONKI", 금산: "GEUMSAN", 부여: "BUYE", 서천: "SEOCHEON",
    전남: "JEONNAM", 광양: "GWANGYANG", 목포: "MOKPO", 순천: "SUNCHEON", 여수: "YEOSU", 완도: "WANDO", 강진: "GANGJIN", 해남: "HAENAM", 영암: "YEONGAM", 진도: "JINDO", 무안: "MUAN", 신안: "SINAN",
    전북: "JEONBUK", 군산: "GUNSAN", 익산: "IKSAN", 전주: "JEONJU", 정읍: "JEONGEUP", 남원: "NAMWON", 김제: "GIMJE", 완주: "WANJU", 진안: "JINAN", 무주: "MUJU", 장수: "JANGSU", 임실: "IMSIL", 순창: "SUNCHANG",
    충북: "CHUNGBUK", 제천: "JECHEON", 청주: "CHEONGJU", 충주: "CHUNGJU", 옥천: "OCHEON", 보은: "BOEUN", 영동: "YEONGDONG", 진천: "JINCHEON", 괴산: "GOESAN", 음성: "EUMSEONG", 증평: "JEUNGPYEONG",
    강원: "GANGWON", 강릉: "GANGNEUNG", 동해: "DONGHAE", 삼척: "SAMCHEOK", 속초: "SOKCHO", 원주: "WONJU", 춘천: "CHUNCHEON", 철원: "CHEORWON", 평창: "PYEONGCHANG", 홍천: "HONGCHEON", 횡성: "HOENGSEONG",
    광주: "GWANGJU", 광산: "GWANGSAN", 남구: "NAMGU", 동구: "DONGGU", 북구: "BUKGU", 서구: "SEOGU",
    대전: "DAEJEON", 대덕: "DAEDEOK", 동구: "DONGGU", 서구: "SEOGU", 유성: "YUSEONG", 중구: "JUNGGU",
    울산: "ULSAN", 남구: "NAMGU", 동구: "DONGGU", 북구: "BUKGU", 울주: "ULJU", 중구: "JUNGGU",
    제주: "JEJU", 제주: "JEJU", 서귀포: "SEOGWIPO",
    세종: "SEJONG", 전체: "ALL"
};

const Location = ({ selectedLocation, setSelectedLocation }) => {
    const [selectedRegion, setSelectedRegion] = useState(null); // 1차 지역
    const [selectedSubRegions, setSelectedSubRegions] = useState([]); // 2차 지역
    const [isLocationContainerVisible, setIsLocationContainerVisible] = useState(false);

    const handleRegionClick = (region) => {
        setSelectedRegion(region);
        setSelectedSubRegions([]); // 하위 지역 초기화
    };

    const handleSubRegionClick = (subRegion) => {
        setSelectedSubRegions(prev => {
            const isSelected = prev.includes(subRegion);
            if (isSelected) {
                // 이미 선택된 경우 제거
                return prev.filter(item => item !== subRegion);
            } else {
                // 선택되지 않은 경우 추가, 최대 3개까지 허용
                return prev.length < 3 ? [...prev, subRegion] : prev;
            }
        });
    };

    const handleClose = () => {
        setSelectedRegion(null); // 지역 선택 해제
        setSelectedSubRegions([]); // 하위 지역 선택 해제
    };

    const handleRemoveSubRegion = (subRegion) => {
        setSelectedSubRegions(prev => prev.filter(item => item !== subRegion));
    };

    const handleComplete = () => {
        const translatedLocations = selectedSubRegions.map(subRegion => {
            const translatedSubRegion = locationTranslations[subRegion];
            return `${locationTranslations[selectedRegion]} ${translatedSubRegion}`;
        });
        setSelectedLocation(translatedLocations);
        setIsLocationContainerVisible(false);
    };

    const selectedCount = selectedSubRegions.length; // 선택된 지역 개수

    return (
        <>
            <div className="loc-header">
                <span>지역 선택</span>
                <button className="search-button" onClick={() => setIsLocationContainerVisible(!isLocationContainerVisible)}>
                    <img src={glass} alt="search" />
                </button>
                <p className='loc-count'>{selectedCount}/3</p>
            </div>
            <div className="selected-locations-container">
                <ul className="selected-locations-list">
                    {selectedSubRegions.map((subRegion, index) => (
                        <li key={index}>
                            <button onClick={() => handleRemoveSubRegion(subRegion)} className="location-button">
                                {selectedRegion} {subRegion} <span className="remove-location">X</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {isLocationContainerVisible && (
                <div className="location-container">
                    {selectedRegion ? (
                        <div className="sub-region-buttons">
                            {locations[selectedRegion].map(subRegion => (
                                <button
                                    key={subRegion}
                                    className={`sub-region-button ${selectedSubRegions.includes(subRegion) ? 'selected' : ''}`}
                                    onClick={() => handleSubRegionClick(subRegion)}
                                >
                                    {subRegion}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="region-buttons">
                            {Object.keys(locations).map(region => (
                                <button
                                    key={region}
                                    className={`region-button ${selectedRegion === region ? 'selected' : ''}`}
                                    onClick={() => handleRegionClick(region)}
                                >
                                    {region}
                                </button>
                            ))}
                        </div>
                    )}
                    <div className='location-bottom'>
                        {selectedRegion && (
                            <>
                                <button className="before-button" onClick={handleClose}>
                                    <img src={before} alt="back" />
                                    이전
                                </button>
                                <button className='location-select-btn' onClick={handleComplete}>완료</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Location;
