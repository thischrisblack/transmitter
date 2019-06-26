import React, { Component } from "react";
import { withFirebase } from "../../Firebase";
import PropTypes from "prop-types";
// import getUniqueKeys from "../../../helpers/getUniqueKeys";
import SongList from "./SongList";
// import TypeList from "./TypeList";
import Loading from "../../UI/LoadingScreen";

class Music extends Component {
  state = {
    loading: true,
    songs: [],
    filter: null
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.music().once("value", snapshot => {
      const songsObject = snapshot.val() || {};

      const songsList = Object.keys(songsObject).map(key => ({
        ...songsObject[key]
      }));

      songsList.sort((a, b) => (a.title > b.title ? 1 : -1));

      this.setState({
        songs: songsList,
        loading: false
      });
    });

    // const { filter } = this.props.match.params;

    // this.setState({
    //   filter: filter
    // });
  }

  // updateFilter = event => {
  //   this.setState({ filter: event.target.id });
  // };

  componentWillUnmount() {
    this.props.firebase.music().off();
  }

  render() {
    return (
      <div className="messages">
        {this.state.loading && <Loading message="Loading..." />}
        <h1>MUSIC</h1>

        <SongList
          songs={this.state.songs}
          filter={this.state.filter}
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
