import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { config } from "../../config";
import * as ROUTES from "../../constants/routes";
import { transmitMessage } from "../../helpers/firebaseCRUD";
import { getMessages } from "../../helpers/firebaseCRUD";
import getUniqueTypes from "../../helpers/getUniqueTypes";
// import { uploadFile } from "../../helpers/firebaseCRUD";

class TransmitFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      title: "",
      message: "",
      image: {},
      sound: "",
      link: "",
      privatePost: true,
      sticky: false,
      social: false,
      error: "",
      typeList: []
    };
    this.setImageRef = ref => {
      this.image = ref;
    };
  }

  componentDidMount() {
    getMessages(this.props.firebase).then(messageList => {
      this.setState({
        typeList: getUniqueTypes(messageList, "type")
      });
    });
  }

  onSubmit = event => {
    transmitMessage(this.state, this.props.firebase)
      .then(response => {
        console.log(response);
        this.props.history.push(ROUTES.ADMIN);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeBox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  onImageUpload = () => {
    const uploadFile = this.image.files[0];
    const storage = this.props.firebase.storage;
    const storageRef = storage.ref();
    const newFile = storageRef.child(uploadFile.name);
    newFile.put(uploadFile).then(() => {
      newFile.getDownloadURL().then(url => {
        console.log(url);
      });
    });
  };

  render() {
    const {
      type,
      title,
      message,
      sound,
      link,
      privatePost,
      sticky,
      social,
      error,
      typeList
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="type"
          value={type}
          onChange={this.onChange}
          type="text"
          list="prevTypes"
          placeholder="Message Type"
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
        <input
          name="image"
          type="file"
          onChange={this.onImageUpload}
          ref={this.setImageRef}
          placeholder="Image"
        />
        <input
          name="sound"
          value={sound}
          onChange={this.onChange}
          type="file"
          placeholder="Sound"
        />
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
