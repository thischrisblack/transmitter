import React from "react";
import ReactMarkdown from "react-markdown";

import SoundPlayer from "../../SoundPlayer";
import EditDelete from "./EditDelete";

import { resizeImage } from "../../../utils";
import { setInitialImageSize } from "../../../utils";
import { formatDate } from "../../../utils";

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
    <li
      key={message.timestamp}
      className={"message" + (message.privatePost === true ? " private" : "")}
    >
      <div className="message__timestamp">
        {formatDate(new Date(Number(message.timestamp)))}
        <EditDelete database={database} message={message} />
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
        <a className="message__link" href={message.link}>
          {message.link.split("/")[2]}
        </a>
      )}

      {message.sound && <SoundPlayer source={message.sound} />}
    </li>
  );
};

export default Message;
