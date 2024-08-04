import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/mainlogin.css";
import bubble from '../image/bubble.png'
import dot from "../image/circle.jpg";

const MainSlider = ({ className, slides }) => {
  const sliderRef = React.useRef(null);

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
    draggable: true,
    arrows: false,
    customPaging: (i) => (
      <button>{<img src={dot} alt={`dot-${i + 1}`} /> }</button>
    ),
  };

  return (
    <div className={className}>
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="main-slide-content">
            <div className="slide-image-container">
              
            </div>
            <div className="slide-text-container">
            <img
                className="main-slide-image"
                src={slide.image} //이미지
                alt={`Slide ${index + 1}`} //이미지 인데스 
              />
            <h2>{slide.name}</h2>
              <div>
                <img className="bubble" src={bubble}></img>
              </div>
              <button className="slide-button">보러가기 - &gt;</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainSlider;
