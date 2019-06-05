import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import { compose } from 'recompose';
// import formatDate from '../../helpers/formatDate'
import { config } from '../../config';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  type: '',
  title: '',
  message: '',
  image: '',
  sound: '',
  link: '',
  privatePost: true,
  sticky: false,
  social: false,
  error: '',
};

const Transmit = () => (
  <div>
    <h1>Transmit</h1>
    <TransmitForm />
  </div>
);

class TransmitFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { type, title, message, image, sound, link, privatePost, sticky } = this.state;

    const timestamp = new Date().toISOString().replace('.', '-');

    console.log(timestamp);

    this.props.firebase
      .message(timestamp)
      .set({
        type,
        title,
        message,
        image,
        sound,
        link,
        privatePost,
        sticky,
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeBox = event => {
    this.setState({ [event.target.name]: event.target.checked });
    console.log(event.target.checked);
  };

  render() {
    const {
      type,
      title,
      message,
      image,
      sound,
      link,
      privatePost,
      sticky,
      social,
      error
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="type"
          value={type}
          onChange={this.onChange}
          type="text"
          placeholder="Message Type"
        />
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
          value={image}
          onChange={this.onChange}
          type="file"
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

        <button type="submit">
          Transmit
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const condition = authUser => (authUser && authUser.uid === config.adminUid);

const TransmitForm = compose(
  withAuthorization(condition),
  withFirebase,
)(TransmitFormBase);

export default Transmit;

export { TransmitForm };