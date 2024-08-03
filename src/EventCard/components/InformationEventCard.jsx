import React from "react";

const InformationEventCard = ({ user }) => {
  return (
    <div className="user-info-card">
      <img src={user.img} alt="User" className="user-image" />
      <div className="user-issue">{user.issue}</div>
      <div className="user-date">{user.date}</div>
      <div className="user-title">{user.title}</div>
    </div>
  );
};

export default InformationEventCard;
