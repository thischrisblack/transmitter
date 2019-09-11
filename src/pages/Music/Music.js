import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { withFirebase } from "../../components/Firebase";
import PropTypes from "prop-types";
import { getUniqueKeys } from "../../utils";
import SongList from "./SongList";
import TypeList from "./TypeList";
import Loading from "../../components/LoadingScreen";

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
    trackLoadError: false
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

  playSong = async songId => {
    if (songId === this.state.nowPlaying) {
      this.toggleAudio();
    } else {
      await this.resetAudio();
      await this.setState({ nowPlaying: songId });
      await this.toggleAudio();
    }
  };

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

  trackLoadError = () => {
    this.setState({ trackLoadError: true });
  };

  render() {
    const {
      loading,
      songs,
      filteredSongs,
      filters,
      nowPlaying,
      playing,
      duration,
      progress,
      trackLoadError
    } = this.state;

    return (
      <div className="music">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Chris Black: Music</title>
          <meta
            name="description"
            content="Music transmitted from an undisclosed location."
          />

          <meta property="og:title" content="Chris Black: Music" />
          <meta
            property="og:description"
            content="Music transmitted from an undisclosed location."
          />
          <meta property="og:url" content="https://www.chrisblack.net/music" />
          <meta name="twitter:title" content="Chris Black: Music" />
          <meta
            name="twitter:description"
            content="Music transmitted from an undisclosed location."
          />
        </Helmet>

        {loading && <Loading message="Loading..." />}

        {filteredSongs[nowPlaying] && (
          <audio
            src={filteredSongs[nowPlaying].url}
            ref={this.soundRef}
            onCanPlay={this.audioReady}
            onTimeUpdate={this.updateProgress}
            onEnded={this.playNextSong}
            onError={this.trackLoadError}
            preload="none"
          >
            <p>Your browser doesn't support HTML5 audio.</p>
          </audio>
        )}

        <TypeList
          types={getUniqueKeys(songs, "genre")}
          updateFilter={this.updateFilter}
          filterCategory="genre"
          activeFilter={filters.genre}
        />

        {trackLoadError && (
          <p className="error">
            At this time it seems I have surpassed my bandwidth quota for the
            day. Please try again tomorrow.
          </p>
        )}

        <SongList
          songs={filteredSongs}
          playSong={this.playSong}
          nowPlaying={nowPlaying}
          progress={progress}
          duration={duration}
          playing={playing}
          filters={filters}
        />
      </div>
    );
  }
}

Music.propTypes = {
  firebase: PropTypes.object
};

export default withFirebase(Music);
