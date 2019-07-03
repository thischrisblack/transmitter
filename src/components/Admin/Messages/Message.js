import React from "react";
import ReactMarkdown from "react-markdown";

import SoundPlayer from "../../UI/SoundPlayer";
import EditDelete from "./EditDelete";

import { resizeImage } from "../../../utils";

const Message = ({ message, firebase, database }) => {
  let initialImageSize;

  if (message.imageRatio) {
    const height = 20 * message.imageRatio;
    initialImageSize = { width: "20rem", minHeight: `${height}rem` };
  }

  return (
    <li key={message.timestamp}>
      <div className="messages__list--timestamp">
        {new Date(Number(message.timestamp)).toUTCString()}
        <EditDelete database={database} message={message} firebase={firebase} />
      </div>
      {message.title && (
        <div className="messages__list--title">{message.title}</div>
      )}
      {message.image && (
        <div
          className="messages__list--image"
          onClick={resizeImage}
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
