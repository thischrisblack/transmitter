import React, { Component } from "react";
import { withFirebase } from "../../Firebase";
import PropTypes from "prop-types";
import { getUniqueKeys } from "../../../utils.js";
import SongList from "./SongList";
import TypeList from "./TypeList";
import Loading from "../../UI/LoadingScreen";
import { formatTimer } from "../../../utils";

class Music extends Component {
  state = {
    loading: true,
    songs: [],
    filteredSongs: [],
    // So far I only filter by one value, but this is an object in case I ultimately want to filter by several values at once.
    filters: {},
    nowPlaying: 0,
    playing: false,
    duration: "",
    progress: 0,
    progressPercent: 0
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.music().once("value", snapshot => {
      const songsObject = snapshot.val() || {};

      const songsList = Object.keys(songsObject).map(key => ({
        ...songsObject[key]
      }));

      // Sort songsList by year, album, then track number.
      songsList.sort((a, b) => {
        const year = b.year.localeCompare(a.year);
        const album = a.album.localeCompare(b.album);
        const track = a.track.localeCompare(b.track, undefined, {
          numeric: true,
          sensitivity: "base"
        });

        return year || album || track;
      });

      // Initial state of filteredSongs is all the songs.
      this.setState({
        songs: songsList,
        filteredSongs: songsList,
        loading: false
      });
    });
  }

  updateFilter = async event => {
    const { key, value } = event.target.dataset;

    await this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [key]: value
      }
    }));

    let newFilteredSongs = [...this.state.songs];
    const filters = this.state.filters;

    Object.keys(filters).forEach(filter => {
      filters[filter] &&
        (newFilteredSongs = newFilteredSongs.filter(
          song => song[filter] === filters[filter]
        ));
    });
    this.toggleAudio();
    this.resetAudio();
    this.setState({ filteredSongs: newFilteredSongs, nowPlaying: 0 });
  };

  // PLAYER FUNCTIONS

  soundRef = React.createRef();

  toggleAudio = async () => {
    await this.setState({ playing: !this.state.playing });
    if (!this.state.playing) {
      this.soundRef.current.pause();
      this.soundRef.current.currentTime = 0;
    } else {
      this.soundRef.current.play();
    }
  };

  audioReady = () => {
    this.setState({
      duration: this.soundRef.current.duration
    });
  };

  updateProgress = () => {
    this.setState({ progress: this.soundRef.current.currentTime });
    const percent = this.state.progress / this.state.duration;
    this.setState({ progressPercent: percent });
  };

  resetAudio = () => {
    this.setState({
      playing: false,
      progress: 0,
      progressPercent: 0
    });
  };

  playNextSong = async () => {
    // If the current song is the last song of the array, stop, otherwise, play the next one.
    if (this.state.nowPlaying === this.state.filteredSongs.length - 1) {
      this.resetAudio();
    } else {
      await this.setState({ nowPlaying: ++this.state.nowPlaying });
      this.resetAudio();
      this.toggleAudio();
    }
  };

  render() {
    return (
      <div className="messages">
        {this.state.loading && <Loading message="Loading..." />}

        {this.state.filteredSongs[this.state.nowPlaying] && (
          <div className="sound-player">
            <audio
              src={this.state.filteredSongs[this.state.nowPlaying].url}
              ref={this.soundRef}
              onCanPlay={this.audioReady}
              onTimeUpdate={this.updateProgress}
              onEnded={this.playNextSong}
            >
              <p>Your browser doesn't support HTML5 audio.</p>
            </audio>
            <span
              className="sound-player sound-player__controls"
              onClick={this.toggleAudio}
            >
              {/* {this.state.playing ? "❚❚" : "▶"} */}
              {this.state.playing ? "STOP" : "PLAY"}
            </span>
            <span className="sound-player sound-player__timer">
              {formatTimer(this.state.progress)} /{" "}
              {formatTimer(this.state.duration)}
            </span>
            <span>
              {" "}
              | {this.state.filteredSongs[this.state.nowPlaying].title}
            </span>
            <div
              className="sound-player__progress-bar"
              style={{ width: this.state.progressPercent * 100 + "%" }}
            />
          </div>
        )}

        <TypeList
          types={getUniqueKeys(this.state.songs, "genre")}
          updateFilter={this.updateFilter}
          title="genre"
        />

        <SongList songs={this.state.filteredSongs} />
      </div>
    );
  }
}

Music.propTypes = {
  firebase: PropTypes.object
};

export default withFirebase(Music);
