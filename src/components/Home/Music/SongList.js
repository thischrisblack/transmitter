import React from "react";
import SoundPlayer from "../../UI/SoundPlayer";

const SongList = ({ songs, filter, firebase }) => {
  filter && (songs = songs.filter(song => song.type === filter));

  if (!songs.length) return <p>No songs.</p>;

  return (
    <ul className="songs songs__list">
      {songs.map(song => {
        return (
          <li key={song.album + song.title}>
            {song.title && (
              <div className="songs__list--title">{song.title}</div>
            )}
            {song.url && <SoundPlayer source={song.url} />}
          </li>
        );
      })}
    </ul>
  );
};

export default SongList;
