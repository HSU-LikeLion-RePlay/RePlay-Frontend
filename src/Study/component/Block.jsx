//재사용될 하나하나의 블록임
import React from "react"
import '../style/Block.css'
import location from '../images/Loc.svg'
import people from '../images/People.svg'
export default function Block({img, category, date, time, name, loc, max, crnt}){
  return(
    <div className="mentoring-block-wrap">
            <div className="mentoring-block-image">
                <img src={img}/>
            </div>
            <div className="mentoring-first-wrap">
                <button className="category">{category}</button>
                <span className="mentoring-time-wrap">
                    <span className="date">{date}</span>
                    <span className="time">{time}</span>
                </span>
            </div>
            <div className="mentoring-name">{name}</div>
            <div className="location-wrap"> 
                <span className="location-img"><img src={location}/></span>
                <span className="location"> {loc}</span>
            </div>
            <div className="participant-wrap">
                <span className="participant-img"> <img src={people}/></span>
                <span className="participant">{crnt}/{max}명</span>
            </div>
        </div>
  )
}