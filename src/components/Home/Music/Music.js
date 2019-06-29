import React, { Component } from "react";
import { withFirebase } from "../../Firebase";
import PropTypes from "prop-types";
import { getUniqueKeys } from "../../../utils.js";
import SongList from "./SongList";
import TypeList from "./TypeList";
import Loading from "../../UI/LoadingScreen";

class Music extends Component {
  state = {
    loading: true,
    songs: [],
    albums: [],
    moods: [],
    mood: null,
    tempi: [],
    tempo: null,
    filter: null
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.music().once("value", snapshot => {
      const songsObject = snapshot.val() || {};

      const songsList = Object.keys(songsObject).map(key => ({
        ...songsObject[key]
      }));

      songsList.sort((a, b) => {
        const year = b.year.localeCompare(a.year);
        const album = a.album.localeCompare(b.album);
        const track = a.track.localeCompare(b.track, undefined, {
          numeric: true,
          sensitivity: "base"
        });

        return year || album || track;
      });

      this.setState({
        songs: songsList,
        albums: getUniqueKeys(songsList, "album"),
        moods: getUniqueKeys(songsList, "genre"),
        tempi: getUniqueKeys(songsList, "bpm"),
        loading: false
      });
    });

    // const { filter } = this.props.match.params;

    // this.setState({
    //   filter: filter
    // });
  }

  updateFilter = event => {
    const { key, value } = event.target.dataset;
    this.setState({ [key]: value });
  };

  componentWillUnmount() {}

  render() {
    return (
      <div className="messages">
        {this.state.loading && <Loading message="Loading..." />}

        <TypeList
          types={this.state.moods}
          updateFilter={this.updateFilter}
          title="mood"
        />

        <SongList
          songs={this.state.songs}
          moodFilter={this.state.mood}
          tempoFilter={this.state.tempo}
          firebase={this.props.firebase}
        />
      </div>
    );
  }
}

Music.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
};

export default withFirebase(Music);
