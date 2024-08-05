import React, { useEffect } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/mainlogin.css";
import bubble from "../image/bubble.png"; // 사용 중인 bubble 이미지

const BigSlider = ({ className, slides }) => {
  const sliderRef = React.useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        sliderRef.current.slickPrev();
      } else if (event.key === "ArrowRight") {
        sliderRef.current.slickNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    arrows: false,
  };

  const handleButtonClick = (e, link) => {
    e.stopPropagation(); // 이벤트 전파 막기
    navigate(link); // 이동할 경로 설정
  };

  return (
    <div className={`${className} container`}>
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="main-slide-content">
            <div className="slide-image-container">
              <img
                className="main-slide-image"
                src={slide.image}
                alt={`Slide ${index + 1}`}
              />

              <button
                onClick={(e) => handleButtonClick(e, slide.link)}
                className="banner-navigate-button"
              >
                보러가기⟶
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BigSlider;
