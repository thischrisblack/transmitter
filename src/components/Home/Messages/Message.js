import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

import SoundPlayer from "../../UI/SoundPlayer";

import { resizeImage } from "../../../utils";
import { setInitialImageSize } from "../../../utils";

const Message = ({ message, database }) => {
  // Set the image / placeholder size
  let initialImageSize;
  if (message.imageRatio) {
    if (window.innerWidth > 700) {
      initialImageSize = setInitialImageSize(message.imageRatio);
    } else {
      initialImageSize = {
        width: "100%",
        paddingTop: `${message.imageRatio * 99.7}%`
      };
    }
  }

  return (
    <li className="message">
      <div className="message__timestamp">
        {database === "calendarEvent" ? (
          new Date(Number(message.timestamp)).toUTCString()
        ) : (
          <Link to={"/message/" + message.timestamp}>
            {new Date(Number(message.timestamp)).toUTCString()}
          </Link>
        )}
      </div>

      {message.title && <div className="message__title">{message.title}</div>}

      {message.image && (
        <div
          className="message__image"
          // No click if mobile.
          onClick={window.innerWidth > 700 ? resizeImage : undefined}
          style={initialImageSize}
        >
          <img src={message.image} alt={message.title} />
        </div>
      )}

      {message.message && (
        <ReactMarkdown source={message.message} className="message__message" />
      )}
      <div className="clear" />
      {message.link && (
        <a
          className="message__link"
          href={message.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          {message.link.split("/")[2]}
        </a>
      )}
      {message.sound && <SoundPlayer source={message.sound} />}
    </li>
  );
};

export default Message;
