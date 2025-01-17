import React, { useEffect } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/mainlogin.css";
import bubble from "../image/bubble.png";
import dot from "../image/circle.jpg";

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
    customPaging: (i) => (
      <button>{<img src={dot} alt={`dot-${i + 1}`} />}</button>
    ),
  };

  const handleButtonClick = (e, link) => {
    e.stopPropagation();
    navigate(link);
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
            </div>
            <div className="slide-text-container">
              <h2>{slide.name}</h2>
              <div>
                <img className="bubble" src={bubble} alt="Bubble" />
              </div>
              <div className="slide-content-title">
                {slide.name}님과 리플레이의{" "}
                <span className="slide-strong">솔직한 인터뷰</span>
              </div>
              <button
                onClick={(e) => handleButtonClick(e, slide.link)}
                className="navigate-button"
              >
                Go to Next Page
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BigSlider;
