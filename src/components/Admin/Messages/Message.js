import React from "react";
import ReactMarkdown from "react-markdown";
import SoundPlayer from "../../UI/SoundPlayer";
import { deleteMessage } from "../../../helpers/firebaseCRUD";
import { Link } from "react-router-dom";

const Message = ({ message, firebase }) => {
  let initialImageSize;

  if (message.imageRatio) {
    const height = 20 * message.imageRatio;
    initialImageSize = { width: "20rem", minHeight: `${height}rem` };
  }

  const handleClick = event => {
    let imageStyle = event.currentTarget.style;
    imageStyle.width = imageStyle.width === "100%" ? "20rem" : "100%";
  };

  const deletePost = event => {
    deleteMessage(event.target.dataset, firebase);
  };

  return (
    <li key={message.timestamp}>
      <div className="messages__list--timestamp">
        {new Date(Number(message.timestamp)).toUTCString()}
        <span className="messages__list--edit">
          {" | "}
          <Link to={{ pathname: "/lord/transmit", post: message }}>edit</Link>
          {" | "}
          <span
            className="messages__list--delete"
            data-postid={message.timestamp}
            data-database="message"
            data-image={message.image}
            data-sound={message.sound}
            onClick={deletePost}
          >
            &times;
          </span>
        </span>
      </div>
      {message.title && (
        <div className="messages__list--title">{message.title}</div>
      )}
      {message.image && (
        <div
          className="messages__list--image"
          onClick={handleClick}
          style={initialImageSize}
        >
          <img src={message.image} alt={message.title} />
        </div>
      )}
      {message.message && (
        <ReactMarkdown
          source={message.message}
          className="messages__list--message"
        />
      )}
      <div className="clear" />
      {message.link && (
        <a className="messages__list--link" href={message.link}>
          {message.link.split("/")[2]}
        </a>
      )}
      {message.sound && <SoundPlayer source={message.sound} />}
    </li>
  );
};

export default Message;
