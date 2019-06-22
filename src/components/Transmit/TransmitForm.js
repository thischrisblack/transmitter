import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { config } from "../../config";
import * as ROUTES from "../../constants/routes";
import PropTypes from "prop-types";
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";
import { Link } from "react-router-dom";
import { transmitMessage, uploadFile } from "../../helpers/firebaseCRUD";
import getUniqueTypes from "../../helpers/getUniqueTypes";
import Static from "../Loading";

class TransmitFormBase extends Component {
  state = {
    post: {
      timestamp: "",
      type: "",
      title: "",
      message: "",
      image: "",
      sound: "",
      privatePost: true,
      sticky: false,
      social: false
    },
    error: "",
    typeList: [],
    loading: false,
    transmitting: false
  };

  // Refs for the file input elements.
  imageRef = React.createRef();
  soundRef = React.createRef();

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.messages().on("value", snapshot => {
      const messagesObject = snapshot.val();

      const messagesList = Object.keys(messagesObject).map(key => ({
        ...messagesObject[key],
        timestamp: key
      }));

      this.setState(prevState => ({
        post: {
          ...prevState.post,
          timestamp: new Date().getTime()
        },
        typeList: getUniqueTypes(messagesList, "type"),
        loading: false
      }));
    });
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ transmitting: true });

    // Check for image/sound files, upload and set state if they exist.
    const imageFile = this.imageRef.current.files;
    const soundFile = this.soundRef.current.files;

    if (imageFile.length) {
      const imageURL = await uploadFile(imageFile[0], this.props.firebase);
      this.setState(prevState => ({
        post: {
          ...prevState.post,
          image: imageURL
        }
      }));
    }

    if (soundFile.length) {
      const soundURL = await uploadFile(soundFile[0], this.props.firebase);
      this.setState(prevState => ({
        post: {
          ...prevState.post,
          sound: soundURL
        }
      }));
    }

    // Post the new message to the database.
    transmitMessage(this.state.post, this.props.firebase)
      .then(() => {
        this.props.history.push(ROUTES.ADMIN);
      })
      .catch(error => {
        this.setState({ transmitting: false, error });
      });
  };

  onChange = event => {
    const changeSource = event.target;
    const newValue =
      changeSource.type === "checkbox"
        ? changeSource.checked
        : changeSource.value;
    this.setState(prevState => ({
      post: {
        ...prevState.post,
        [changeSource.name]: newValue
      }
    }));
  };

  onDateChange = event => {
    const newStamp = event[0].getTime();
    this.setState(prevState => ({
      post: {
        ...prevState.post,
        timestamp: newStamp
      }
    }));
  };

  displayFile = event => {
    const fileType = event.currentTarget.name;
    let fileName;
    if (fileType === "image") {
      fileName = this.imageRef.current.files[0].name;
    }
    if (fileType === "sound") {
      fileName = this.soundRef.current.files[0].name;
    }
    console.log(fileName);
    this.setState(prevState => ({
      post: {
        ...prevState.post,
        [fileType]: fileName
      }
    }));
  };

  render() {
    const { post, error, typeList, loading, transmitting } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        {transmitting && <Static message="Transmitting..." />}
        <Link to={`/lord`} className="closer">
          [CANCEL]
        </Link>
        <Flatpickr
          name="timestamp"
          data-enable-time
          value={post.timestamp}
          onChange={this.onDateChange}
        />
        <input
          name="type"
          value={post.type}
          onChange={this.onChange}
          type="text"
          list="prevTypes"
          placeholder={loading ? "Loading ..." : "Message Type"}
        />
        <datalist id="prevTypes">
          {typeList.map(type => (
            <option key={type} value={type} />
          ))}
        </datalist>
        <input
          name="title"
          value={post.title}
          onChange={this.onChange}
          type="text"
          placeholder="Title"
        />
        <textarea
          name="message"
          value={post.message}
          onChange={this.onChange}
          placeholder="Message"
        />
        <input
          className="inputFile"
          id="image"
          name="image"
          type="file"
          ref={this.imageRef}
          onChange={this.displayFile}
        />
        <label htmlFor="image">{post.image ? post.image : "IMAGE"}</label>
        <input
          className="inputFile"
          name="sound"
          id="sound"
          type="file"
          ref={this.soundRef}
          onChange={this.displayFile}
        />
        <label htmlFor="sound">{post.sound ? post.sound : "SOUND"}</label>
        <input
          className="inputCheckbox"
          name="privatePost"
          id="privatePost"
          checked={post.privatePost}
          onChange={this.onChange}
          type="checkbox"
        />
        <label
          htmlFor="privatePost"
          className={post.privatePost ? "selected" : "unselected"}
        >
          PRIVATE
        </label>
        <input
          className="inputCheckbox"
          name="sticky"
          id="sticky"
          checked={post.sticky}
          onChange={this.onChange}
          type="checkbox"
        />
        <label
          htmlFor="sticky"
          className={post.sticky ? "selected" : "unselected"}
        >
          STICKY
        </label>
        <input
          className="inputCheckbox"
          name="social"
          id="social"
          checked={post.social}
          onChange={this.onChange}
          type="checkbox"
        />
        <label
          htmlFor="social"
          className={post.social ? "selected" : "unselected"}
        >
          SOCIAL
        </label>

        <button type="submit" className="transmit-button">
          TRANSMIT
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

TransmitFormBase.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
};

const condition = authUser => authUser && authUser.uid === config.adminUid;

const TransmitForm = compose(
  withAuthorization(condition),
  withFirebase
)(TransmitFormBase);

export default TransmitForm;
