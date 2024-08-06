import React from "react";
import "../css/advertisementsupporter.css";
import LoginHeader from "../../Header/components/LoginHeader";
import Footer from "../../Footer/components/Footer";
import backgroundImage from "../image/biglogo.png"; // 배경 이미지 경로를 맞춰주세요

const AdvertisementSupporter = () => {
  const handleApplyClick = () => {
    window.location.href = "https://forms.gle/YzAGYRDRtNnGHCpc7"; // 이동할 외부 URL로 변경하세요
  };

  return (
    <div>
      <LoginHeader />
      <div className="Advertisement-supporter-container">
        <img
          src={backgroundImage}
          alt="Background"
          className="background-image"
        />
        <button
          className="advertisement-apply-button"
          onClick={handleApplyClick}
        >
          서포터즈 지원하기
        </button>
        <div className="Advertisement-supporter-header">
          <div className="Advertisement-supporter-title">
            <div>2025</div>
            <div className="Advertisement-supporter-highlight">
              대학생 리플레이 서포터즈
            </div>
            <div>모집합니다</div>
          </div>
          <div className="sub-heading">
            리플레이에서 활약할 서포터즈 -{" "}
            <span className="sub-heading-highlight">도움이를 모집합니다!</span>
            <br />
            <div className="sub-heading-small">
              {" "}
              도움이는 리플레이의 멘토링 서비스인 ‘배움터’의 멘토입니다.
            </div>
          </div>
        </div>

        <div className="advertaisement-detail-details">
          <div className="advertaisement-detail">
            <span className="detail-heading">모집기간</span>
            <span className="span">
              2024. 08. 05(월) ~ 2024. 12. 09(월) 17:00
            </span>
          </div>
          <div className="advertaisement-detail">
            <span className="detail-heading">지원자격</span>
            <span className="span">
              전국 17개 시도 소재 일반대학(원) 및 전문대학 재학생
            </span>
          </div>
          <div className="advertaisement-detail">
            <span className="detail-heading">활동기간</span>
            <span className="span">
              2025.03 ~ 2025.11
              <br />
              우수 도움이 서포터즈 선정은 11월 진행 예정
            </span>
          </div>
          <div className="advertaisement-detail">
            <span className="detail-heading">활동내용</span>
            <span className="span">
              - 발대식 및 역량강화 교육 수료
              <br />
              - 서포터즈 월미션 (멘토링 프로그램 개설) 수행
              <br />
              - 리플레이 서비스 홍보 활동 수행
              <br />- 뉴그레이 세대를 위한 활동 계획
            </span>
          </div>
          <div className="advertaisement-detail">
            <span className="detail-heading">활동혜택</span>
            <span className="span">
              - 봉사시간 부여
              <br />- 20만원 상당의 활동 지원금
            </span>
          </div>
          <div className="advertaisement-detail">
            <span className="detail-heading">접수방법</span>
            <span className="span">구글폼 접수</span>
          </div>
          <div className="advertaisement-detail">
            <span className="detail-heading">결과발표</span>
            <span className="span">2024. 12. 24(월)</span>
          </div>
          <div className="advertaisement-detail">
            <span className="detail-heading">문의처</span>
            <span className="span"> 000000@000000(메일) </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdvertisementSupporter;
