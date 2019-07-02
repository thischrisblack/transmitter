import React from "react";

import { formatTimer } from "../../../utils";

const SongList = ({
  songs,
  playSong,
  nowPlaying,
  progressPercent,
  progress,
  duration,
  playing
}) => {
  if (!songs.length) return <p>No songs.</p>;
  nowPlaying = parseInt(nowPlaying);
  const handleClick = event => {
    playSong(event.currentTarget.dataset.track);
  };
  return (
    <ul className="playlist songs songs__list">
      {songs.map((song, key) => {
        return (
          <li
            key={key}
            data-track={key}
            onClick={handleClick}
            className={key === nowPlaying && playing ? "active" : "balls"}
          >
            {song.title && (
              <div className="songs__list--title">
                {song.album} / {song.title}
                {key === nowPlaying && playing && (
                  <span>
                    <span className="sound-player sound-player__timer">
                      {" "}
                      {formatTimer(progress)} / {formatTimer(duration)}
                    </span>
                    <div
                      className="sound-player__progress-bar"
                      style={{ width: progressPercent * 100 + "%" }}
                    />
                  </span>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SongList;
