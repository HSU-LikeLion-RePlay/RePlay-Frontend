import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/mainlogin.css";

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
      <button>{/* <img src={dot} alt={`dot-${i + 1}`} /> */}</button>
    ),
  };

  return (
    <div className={className}>
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
              <p>{slide.description}</p>
              <button className="slide-button">{slide.buttonText}</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainSlider;
