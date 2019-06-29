import React from "react";

const SongList = ({ songs, moodFilter, tempoFilter, firebase }) => {
  moodFilter && (songs = songs.filter(song => song.genre === moodFilter));
  tempoFilter && (songs = songs.filter(song => song.bpm === tempoFilter));

  if (!songs.length) return <p>No songs.</p>;

  return (
    <ul className="songs songs__list">
      {songs.map(song => {
        return (
          <li key={song.album + song.title}>
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
