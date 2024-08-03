import React from "react";
import "../css/advertisementsupporter.css";

const AdvertisementSupporter = () => {
  return (
    <div className="Advertisement-supporter-container">
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
            - 반대사 입학생과 교육 수료
            <br />
            - 서포터즈 멘토링 참여 (멘토링 프로그램 개설) 수범
            <br />
            - 리플레이의 서비스 홍보 및 지원
            <br />- 누-플레이 서포터즈 활동 기획
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
          <span className="span">000대학교 0000팀 0000담당</span>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementSupporter;
