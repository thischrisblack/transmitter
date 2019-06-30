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
    filteredSongs: [],
    genres: [],
    albums: [],
    bpm: [],
    filters: {}
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
        filteredSongs: songsList,
        albums: getUniqueKeys(songsList, "album"),
        genres: getUniqueKeys(songsList, "genre"),
        bpm: getUniqueKeys(songsList, "bpm"),
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

    this.setState({ filteredSongs: newFilteredSongs });
  };

  render() {
    return (
      <div className="messages">
        {this.state.loading && <Loading message="Loading..." />}

        <TypeList
          types={this.state.genres}
          updateFilter={this.updateFilter}
          title="genre"
        />

        <TypeList
          types={this.state.albums}
          updateFilter={this.updateFilter}
          title="album"
        />

        <TypeList
          types={this.state.bpm}
          updateFilter={this.updateFilter}
          title="bpm"
        />

        <SongList songs={this.state.filteredSongs} />
      </div>
    );
  }
}

Music.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
};

export default withFirebase(Music);
