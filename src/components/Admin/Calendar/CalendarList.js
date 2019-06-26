import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import SoundPlayer from "../../UI/SoundPlayer";
import { deleteMessage } from "../../../helpers/firebaseCRUD";
import formatDate from "../../../helpers/formatDate";

const CalendarList = ({ dates, firebase }) => {
  const today = new Date().setHours(0, 0, 0, 0);
  dates = dates.filter(date => date.timestamp > today);

  if (!dates.length) return <p>No events.</p>;

  const handleClick = event => {
    let width = event.currentTarget.style.width;
    event.currentTarget.style.width = width === "100%" ? "20rem" : "100%";
  };

  const deletePost = event => {
    deleteMessage(event.target.dataset, firebase);
  };

  return (
    <ul className="calendar calendar__list">
      {dates.map(date => {
        let placeholderStyle;
        if (date.imageRatio) {
          const height = 20 * date.imageRatio;
          placeholderStyle = { minHeight: `${height}rem` };
        }
        return (
          <li key={date.timestamp}>
            <div className="calendar__list--timestamp">
              {formatDate(new Date(parseInt(date.timestamp)))}
              <span className="calendar__list--edit">
                {" | "}
                <Link to={{ pathname: "/lord/transmit", post: date }}>
                  edit
                </Link>
                {" | "}
                <span
                  className="calendar__list--delete"
                  data-postid={date.timestamp}
                  data-database="calendarEvent"
                  data-image={date.image}
                  data-sound={date.sound}
                  onClick={deletePost}
                >
                  &times;
                </span>
              </span>
            </div>
            {date.title && (
              <div className="calendar__list--title">{date.title}</div>
            )}
            {date.image && (
              <div
                className="calendar__list--image"
                onClick={handleClick}
                style={placeholderStyle}
              >
                <img src={date.image} alt={date.title} />
              </div>
            )}
            {date.message && (
              <ReactMarkdown
                source={date.message}
                className="calendar__list--message"
              />
            )}
            <div className="clear" />
            {date.link && (
              <a className="calendar__list--link" href={date.link}>
                {date.link.split("/")[2]}
              </a>
            )}
            {date.sound && <SoundPlayer source={date.sound} />}
          </li>
        );
      })}
    </ul>
  );
};

export default CalendarList;
