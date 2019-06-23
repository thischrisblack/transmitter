import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import SoundPlayer from "../../UI/SoundPlayer";
import { deleteMessage } from "../../../helpers/firebaseCRUD";
import formatDate from "../../../helpers/formatDate";

const CalendarList = ({ messages, filter, firebase }) => {
  filter && (messages = messages.filter(message => message.type === filter));

  if (!messages.length) return <p>No events.</p>;

  const handleClick = event => {
    let width = event.currentTarget.style.width;
    event.currentTarget.style.width = width === "100%" ? "20rem" : "100%";
  };

  const deletePost = event => {
    deleteMessage(event.target.dataset, firebase);
  };

  return (
    <ul className="calendar calendar__list">
      {messages.map(message => {
        let placeholderStyle;
        if (message.imageRatio) {
          const height = 20 * message.imageRatio;
          placeholderStyle = { minHeight: `${height}rem` };
        }
        return (
          <li key={message.timestamp}>
            <div className="calendar__list--timestamp">
              {formatDate(new Date(parseInt(message.timestamp)))}
              <span className="calendar__list--edit">
                {" | "}
                <Link to={{ pathname: "/lord/transmit", post: message }}>
                  edit
                </Link>
                {" | "}
                <span
                  className="calendar__list--delete"
                  data-postid={message.timestamp}
                  data-database="calendarEvent"
                  data-image={message.image}
                  data-sound={message.sound}
                  onClick={deletePost}
                >
                  &times;
                </span>
              </span>
            </div>
            {message.title && (
              <div className="calendar__list--title">{message.title}</div>
            )}
            {message.image && (
              <div
                className="calendar__list--image"
                onClick={handleClick}
                style={placeholderStyle}
              >
                <img src={message.image} alt={message.title} />
              </div>
            )}
            {message.message && (
              <ReactMarkdown
                source={message.message}
                className="calendar__list--message"
              />
            )}
            <div className="clear" />
            {message.link && (
              <a className="calendar__list--link" href={message.link}>
                {message.link.split("/")[2]}
              </a>
            )}
            {message.sound && <SoundPlayer source={message.sound} />}
          </li>
        );
      })}
    </ul>
  );
};

export default CalendarList;
