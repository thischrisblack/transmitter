import React, { Component } from "react";
import { withAuthorization } from "../../Firebase/Session";
import { withFirebase } from "../../Firebase";
import { compose } from "recompose";
import PropTypes from "prop-types";
import { config } from "../../../config";
import * as ROUTES from "../../../constants/routes";
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";

import { transmitMessage, uploadFile } from "../../../helpers/firebaseCRUD";
import getUniqueKeys from "../../../helpers/getUniqueKeys";
import aspectRatioCalculator from "../../../helpers/aspectRatioCalculator";
import Loading from "../../UI/LoadingScreen";

class TransmitFormBase extends Component {
  state = {
    post: {
      timestamp: null,
      type: "",
      title: "",
      message: "",
      link: "",
      image: "",
      imageRatio: 0,
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

    // If this isn't adding a calendar date, get previous post types.
    if (!this.props.location.type) {
      this.props.firebase.messages().on("value", snapshot => {
        const messagesObject = snapshot.val() || {};

        const messagesList = Object.keys(messagesObject).map(key => ({
          ...messagesObject[key]
        }));

        this.setState({
          typeList: getUniqueKeys(messagesList, "type")
        });
      });
    }

    const postToEdit = this.props.location.post;

    // If post to edit, convert timestamp to number
    postToEdit && (postToEdit.timestamp = parseInt(postToEdit.timestamp));

    // Create new post object which is EITHER the post to edit, or the current state with new timestamp
    const postForState = postToEdit || {
      ...this.state.post,
      // Set post type = calendar if prop exists.
      type: this.props.location.type || "",
      timestamp: new Date().getTime()
    };

    // Set that state
    this.setState({ post: postForState, loading: false });
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

  diplayFileName = event => {
    const fileType = event.currentTarget.name;
    let fileName;
    if (fileType === "image") {
      fileName = this.imageRef.current.files[0].name;
      aspectRatioCalculator(this.imageRef.current.files[0]).then(ratio => {
        this.setState(prevState => ({
          post: {
            ...prevState.post,
            image: fileName,
            imageRatio: ratio
          }
        }));
      });
    }
    if (fileType === "sound") {
      var jsmediatags = window.jsmediatags;
      jsmediatags.read(this.soundRef.current.files[0], {
        onSuccess: function(tag) {
          console.log(tag);
        },
        onError: function(error) {
          console.log(error);
        }
      });
      fileName = this.soundRef.current.files[0].name;
      this.setState(prevState => ({
        post: {
          ...prevState.post,
          sound: fileName
        }
      }));
    }
  };

  render() {
    const { post, error, typeList, loading, transmitting } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        {transmitting && <Loading message="Transmitting..." />}
        {/* <Link to={`/lord`} className="closer">
          [CANCEL]
        </Link> */}
        <Flatpickr
          name="timestamp"
          data-enable-time
          value={post.timestamp}
          onChange={this.onDateChange}
          options={{ disableMobile: "true" }}
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
          <option value="calendar" />
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
          name="link"
          value={post.link}
          onChange={this.onChange}
          type="text"
          placeholder="Link"
        />
        <input
          className="inputFile"
          id="image"
          name="image"
          type="file"
          ref={this.imageRef}
          onChange={this.diplayFileName}
        />
        <label htmlFor="image">{post.image ? post.image : "IMAGE"}</label>
        <input
          className="inputFile"
          name="sound"
          id="sound"
          type="file"
          ref={this.soundRef}
          onChange={this.diplayFileName}
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
