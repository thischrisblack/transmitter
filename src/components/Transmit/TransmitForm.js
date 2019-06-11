import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { config } from "../../config";
import * as ROUTES from "../../constants/routes";
import { transmitMessage, uploadFile } from "../../helpers/firebaseCRUD";
import getUniqueTypes from "../../helpers/getUniqueTypes";

class TransmitFormBase extends Component {
  state = {
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

      this.setState({
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

    const imageFile = this.imageRef.current.files;
    const soundFile = this.soundRef.current.files;

    const imageURL = imageFile.length
      ? await uploadFile(imageFile[0], this.props.firebase)
      : "";
    const soundURL = soundFile.length
      ? await uploadFile(soundFile[0], this.props.firebase)
      : "";

    this.setState({
      image: imageURL,
      sound: soundURL
    });

    transmitMessage(this.state, this.props.firebase)
      .then(response => {
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

  render() {
    const {
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
