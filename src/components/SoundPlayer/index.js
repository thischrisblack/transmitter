import React, { Component } from "react";
import timerFormat from "../../helpers/timerFormat";

class SoundPlayer extends Component {
  state = {
    playing: false,
    duration: "",
    progress: 0
  };

  soundRef = React.createRef();

  toggleAudio = () => {
    this.setState({ playing: !this.state.playing });
    this.state.playing
      ? this.soundRef.current.pause()
      : this.soundRef.current.play();
  };

  audioReady = () => {
    this.setState({
      duration: timerFormat(this.soundRef.current.duration)
    });
  };

  updateProgress = () => {
    this.setState({ progress: this.soundRef.current.currentTime });
  };

  resetAudio = () => {
    this.setState({
      playing: false
      // progress: 0
    });
  };

  render() {
    return (
      <div className="sound-player">
        <audio
          src={this.props.source}
          ref={this.soundRef}
          onCanPlay={this.audioReady}
          onTimeUpdate={this.updateProgress}
          onEnded={this.resetAudio}
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
          {timerFormat(this.state.progress)} / {this.state.duration}
        </span>
      </div>
    );
  }
}

export default SoundPlayer;
