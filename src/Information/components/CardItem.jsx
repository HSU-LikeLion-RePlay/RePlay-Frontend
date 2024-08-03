import React from "react";
import PropTypes from "prop-types";
import "../css/information.css";

const CardItem = ({ image, issue, date, title, text, onClick }) => (
  <div className="card-item" onClick={onClick}>
    <div className="card-content">
      <div className="card-image-container">
        <img src={image} alt="Card image" className="card-image" />
      </div>
      <div className="card-header">
        <div className="card-issue">{issue}</div>
        <div className="card-date">{date}</div>
      </div>
      <div className="card-title">{title}</div>
      <div className="card-text">{text}</div>
    </div>
  </div>
);

CardItem.propTypes = {
  image: PropTypes.string.isRequired,
  issue: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CardItem;
