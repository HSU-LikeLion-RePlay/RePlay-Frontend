// src/components/EventCard.jsx
import React from "react";
import "../css/eventcard.css";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <img src={event.img} alt="Event" className="event-image" />
      <div className="category-badge">{event.category}</div>
      <div className="event-info">
        <div className="event-date">
          {event.date} {event.time}
        </div>
        <div className="event-title">{event.name}</div>
        <div className="event-details">
          <div className="event-location">📍 {event.loc}</div>
          <div className="event-participants">
            👥 {event.crnt}/{event.max}
          </div>
        </div>
        {/* <div className="event-nickname">
          <img src={event.profilImg} alt="Profile" className="profile-image" />
          {event.nickname}
        </div> */}
        <div className="event-intro">{event.intro}</div>
        <div className="event-activity">{event.activity}</div>
        <div className="event-fee">{event.fee}</div>
      </div>
    </div>
  );
};

export default EventCard;
