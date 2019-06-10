import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { config } from "../../config";
import * as ROUTES from "../../constants/routes";
import { transmitMessage } from "../../helpers/firebaseCRUD";
import getUniqueTypes from "../../helpers/getUniqueTypes";
// import { uploadFile } from "../../helpers/firebaseCRUD";
// import { getMessages } from "../../helpers/firebaseCRUD";

class TransmitFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      ready: true
    };
    this.setImageRef = ref => {
      this.image = ref;
    };
    this.setSoundRef = ref => {
      this.sound = ref;
    };
  }

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

    // // If I want to use the external function.
    // getMessages(this.props.firebase).then(messageList => {
    //   this.setState({
    //     typeList: getUniqueTypes(messageList, "type")
    //   });
    // });
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
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

  onFileSelect = event => {
    this.setState({ ready: false });
    const fileType = event.target.name;
    const uploadFile = this[fileType].files[0];
    const storageRef = this.props.firebase.storage.ref();
    const filePath = storageRef.child(uploadFile.name);
    filePath.put(uploadFile).then(() => {
      filePath.getDownloadURL().then(url => {
        console.log(url);
        this.setState({
          [fileType]: url,
          ready: true
        });
      });
    });
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
      ready
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
          disabled={loading}
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
          onChange={this.onFileSelect}
          ref={this.setImageRef}
        />
        <input
          name="sound"
          type="file"
          onChange={this.onFileSelect}
          ref={this.setSoundRef}
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

        <button type="submit" disabled={!ready}>
          Transmit
        </button>

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
