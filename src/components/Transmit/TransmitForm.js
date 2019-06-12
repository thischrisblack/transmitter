import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { config } from "../../config";
import * as ROUTES from "../../constants/routes";
import { transmitMessage, uploadFile } from "../../helpers/firebaseCRUD";
import getUniqueTypes from "../../helpers/getUniqueTypes";
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";

class TransmitFormBase extends Component {
  state = {
    timestamp: "",
    type: "",
    title: "",
    message: "",
    image: "",
    sound: "",
    link: "",
    privatePost: true,
    sticky: false,
    social: false,
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

    // Connect to the Firebase Realtime Database.
    this.props.firebase.messages().on("value", snapshot => {
      const messagesObject = snapshot.val();

      const messagesList = Object.keys(messagesObject).map(key => ({
        ...messagesObject[key],
        timestamp: key
      }));

      this.setState({
        // Timestamp of right now, default post ID.
        timestamp: new Date().getTime(),
        // Array of unique "types" from previous messages posted.
        typeList: getUniqueTypes(messagesList, "type"),
        loading: false
      });
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
      this.setState({ image: imageURL });
    }

    if (soundFile.length) {
      const soundURL = await uploadFile(soundFile[0], this.props.firebase);
      this.setState({ sound: soundURL });
    }

    // Post the new message (state) to the database.
    transmitMessage(this.state, this.props.firebase)
      .then(() => {
        this.props.history.push(ROUTES.ADMIN);
      })
      .catch(error => {
        this.setState({ transmitting: false, error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeBox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  onDateChange = event => {
    const newStamp = event[0].getTime();
    this.setState({ timestamp: newStamp });
  };

  render() {
    const {
      timestamp,
      type,
      title,
      message,
      link,
      privatePost,
      sticky,
      social,
      error,
      typeList,
      loading,
      transmitting
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <Flatpickr
          name="timestamp"
          data-enable-time
          value={timestamp}
          onChange={this.onDateChange}
        />
        <input
          name="type"
          value={type}
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
          value={title}
          onChange={this.onChange}
          type="text"
          placeholder="Title"
        />
        <textarea
          name="message"
          value={message}
          onChange={this.onChange}
          placeholder="Message"
        />
        <input name="image" type="file" ref={this.imageRef} />
        <input name="sound" type="file" ref={this.soundRef} />
        <input
          name="link"
          value={link}
          onChange={this.onChange}
          type="text"
          placeholder="Link"
        />
        <input
          name="privatePost"
          checked={privatePost}
          onChange={this.onChangeBox}
          type="checkbox"
        />
        <input
          name="sticky"
          checked={sticky}
          onChange={this.onChangeBox}
          type="checkbox"
        />
        <input
          name="social"
          checked={social}
          onChange={this.onChangeBox}
          type="checkbox"
        />

        <button type="submit">Transmit</button>

        {error && <p>{error.message}</p>}
        {transmitting && <p>Transmitting</p>}
      </form>
    );
  }
}

const condition = authUser => authUser && authUser.uid === config.adminUid;

const TransmitForm = compose(
  withAuthorization(condition),
  withFirebase
)(TransmitFormBase);

export default TransmitForm;
