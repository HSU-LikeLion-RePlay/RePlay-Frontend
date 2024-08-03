export default function MyBlock({ img, category, date, time, name }) {
  //하나의 블록에 들어갈 정보들 처리 
    return (
      <div className="block-wrap">
        <div className="block-image">
          <img src={img} alt={name} />
        </div>
        <div className="block-details">
          <button className="category">{category}</button>
          <div className="content-name">{name}</div>
          <div className="time-wrap">
            <span className="date">{date}</span>
            <span className="time">{time}</span>
          </div>
        </div>
        <div className="block-action">
          <button className="action-button">참가/취소하기</button>
        </div>
      </div>
    );
  }
  