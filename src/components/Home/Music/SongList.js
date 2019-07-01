import React from "react";

const SongList = ({ songs }) => {
  if (!songs.length) return <p>No songs.</p>;
  const playTrack = event => {
    console.log(event.currentTarget.dataset.track);
  };
  return (
    <ul className="songs songs__list">
      {songs.map((song, key) => {
        return (
          <li key={key} data-track={key} onClick={playTrack}>
            {song.title && (
              <div className="songs__list--title">
                {song.album} / {song.title}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SongList;
