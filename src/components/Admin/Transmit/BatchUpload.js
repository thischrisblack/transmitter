import React, { Component } from "react";
import PropTypes from "prop-types";
import { withAuthorization } from "../../Firebase/Session";
import { withFirebase } from "../../Firebase";
import { config } from "../../../config";
import { compose } from "recompose";
import * as ROUTES from "../../../constants/routes";
import { uploadFile } from "../../../helpers/firebaseCRUD";

class BatchUploadFormBase extends Component {
  state = {
    progress: ["Transmission will start automatically upon file selection."]
  };
  soundRef = React.createRef();
  progressRef = React.createRef();

  transmitFiles = () => {
    const fileList = this.soundRef.current.files;

    let filesTransmitted = 0;

    let progressMessages = this.state.progress;
    progressMessages.push(
      "Starting transmission of " + fileList.length + " songs ..."
    );
    this.setState({ progress: progressMessages });

    Array.from(fileList).forEach(async (file, key) => {
      var jsmediatags = window.jsmediatags;

      // Read the tags.
      function awaitableJsmediatags(file) {
        return new Promise(function(resolve, reject) {
          jsmediatags.read(file, {
            onSuccess: function(tag) {
              resolve(tag.tags);
            },
            onError: function(error) {
              reject(error);
            }
          });
        });
      }

      let tag = await awaitableJsmediatags(file);

      // Write the tags to a new post object

      const newPost = {
        album: tag.album || "",
        artist: tag.artist || "",
        genre: tag.genre || "",
        title: tag.title || "",
        track: tag.track || "",
        year: tag.year || "",
        bpm: tag.TBPM ? tag.TBPM.data : ""
      };

      // Upload the file and add the download URL to newPost object
      newPost.url = await uploadFile(file, this.props.firebase);

      // Upload the post to the DB
      const timestamp = new Date().getTime();

      this.props.firebase
        .musicTrack(timestamp)
        .set({
          ...newPost
        })
        .then(() => {
          filesTransmitted++;
          console.log("Posted " + newPost.title);
          if (filesTransmitted === fileList.length) {
            let progressMessages = this.state.progress;
            progressMessages.push("Posted " + newPost.title + ".");
            progressMessages.push(
              "All done! " +
                filesTransmitted +
                " of " +
                fileList.length +
                " songs posted at " +
                new Date()
            );
            this.setState({ progress: progressMessages });
          } else {
            let progressMessages = this.state.progress;
            progressMessages.push("Posted " + newPost.title + ".");
            progressMessages.push(
              filesTransmitted +
                " of " +
                fileList.length +
                " songs posted at " +
                new Date()
            );
            this.setState({ progress: progressMessages });
          }
        });
    });
  };

  render() {
    return (
      <div className="batch-upload">
        <input
          className="inputFile"
          name="sound"
          id="sound"
          type="file"
          ref={this.soundRef}
          onChange={this.transmitFiles}
          multiple
        />
        <label htmlFor="sound">{"→ SELECT SOUND FILES"}</label>

        {this.state.progress.map(statement => {
          return <p key={statement}>{statement}</p>;
        })}
      </div>
    );
  }
}

BatchUploadFormBase.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
};

const condition = authUser => authUser && authUser.uid === config.adminUid;

const BatchUpload = compose(
  withAuthorization(condition),
  withFirebase
)(BatchUploadFormBase);

export default BatchUpload;
