import React from "react";
import { withFirebase } from "../../Firebase";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

import SoundPlayer from "../../UI/SoundPlayer";
import Loading from "../../UI/LoadingScreen";

class SingleMessage extends React.Component {
  state = {
    loading: true,
    message: null
  };

  componentDidMount() {
    this.props.firebase
      .message(this.props.match.params.id)
      .once("value", snapshot => {
        this.setState({
          message: { ...snapshot.val(), timestamp: this.props.match.params.id },
          loading: false
        });
      });
  }

  render() {
    const { loading, message } = this.state;

    return (
      <div className="single-message">
        {loading && <Loading message="Loading..." />}
        {message && (
          <div>
            {message.timestamp && (
              <div className="single-message__timestamp">
                {new Date(Number(message.timestamp)).toUTCString()}
              </div>
            )}

            {message.title && (
              <div className="single-message__title">{message.title}</div>
            )}

            {message.image && (
              <div
                className="single-message__image"
                style={{
                  width: "100%",
                  paddingTop: `${message.imageRatio * 99.7}%`
                }}
              >
                <img src={message.image} alt={message.title} />
              </div>
            )}

            {message.message && (
              <ReactMarkdown
                source={message.message}
                className="single-message__message"
              />
            )}
            <div className="clear" />
            {message.link && (
              <a
                className="single-message__link"
                href={message.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                {message.link.split("/")[2]}
              </a>
            )}
            {message.sound && <SoundPlayer source={message.sound} />}
          </div>
        )}
      </div>
    );
  }
}

SingleMessage.propTypes = {
  firebase: PropTypes.object,
  id: PropTypes.string
};

export default withFirebase(SingleMessage);
