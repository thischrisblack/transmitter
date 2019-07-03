import React from "react";

import { formatTimer } from "../../../utils";

const SongList = ({
  songs,
  playSong,
  nowPlaying,
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

  // Enable album name/year display at each new album.
  let prevAlbum, thisAlbum;

  return (
    <div className="playlist">
      {songs.map((song, key) => {
        prevAlbum = thisAlbum;
        thisAlbum = song.album;

        return (
          <div key={key}>
            {/* If the current track album is different from the last, and there is no active filter, display the album info */}
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
                // Sets active class if current track is playing.
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
                    style={{ width: (progress / duration) * 100 + "%" }}
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
