import React from "react";

import { formatTimer } from "../../../utils";

const SongList = ({
  songs,
  playSong,
  nowPlaying,
  progressPercent,
  progress,
  duration,
  playing,
  filters
}) => {
  if (!songs.length) return <p>No songs.</p>;

  nowPlaying = parseInt(nowPlaying);

  const handleClick = event => {
    playSong(event.currentTarget.dataset.track);
  };

  let prevAlbum, thisAlbum;

  return (
    <div className="playlist">
      {songs.map((song, key) => {
        prevAlbum = thisAlbum;
        thisAlbum = song.album;

        return (
          <div key={key}>
            {prevAlbum !== thisAlbum && !filters.genre && (
              <div className="playlist__album">
                <span className="playlist__album--title">{song.album}</span>
                {song.album !== "Unreleased Demos" && (
                  <span className="playlist__album--year"> ({song.year})</span>
                )}
              </div>
            )}

            <div
              key={key}
              data-track={key}
              onClick={handleClick}
              className={
                "playlist__item " + (key === nowPlaying && playing && "active")
              }
            >
              {song.title}
              {key === nowPlaying && playing && (
                <span>
                  <span className="playlist__timer">
                    {" "}
                    {formatTimer(progress)} / {formatTimer(duration)}
                  </span>
                  <div
                    className="playlist__progress-bar"
                    style={{ width: progressPercent * 100 + "%" }}
                  />
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SongList;
