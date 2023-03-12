import { Dispatch, RefObject, SetStateAction } from "react";
import { ISong } from "../types";
import { playAudio } from "../utils/utils";

type Props = {
  song: ISong;
  songs: ISong[];
  setCurrentSong: Dispatch<SetStateAction<ISong>>;
  isPlaying: boolean;
  audioRef: RefObject<HTMLAudioElement>;
  setSongs: Dispatch<SetStateAction<ISong[]>>;
};
function LibrarySong({
  song,
  setCurrentSong,
  isPlaying,
  audioRef,
  setSongs,
  songs,
}: Props) {
  const selectSongHandler = (songId: string) => {
    setCurrentSong(song);
    playAudio(isPlaying, audioRef);
    const newSongs = songs.map((eachSong): ISong => {
      if (eachSong.id === songId) {
        return {
          ...eachSong,
          active: true,
        };
      } else {
        return {
          ...eachSong,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };
  return (
    <div
      onClick={() => selectSongHandler(song.id)}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song?.cover} />
      <div className="song-description">
        <h3>{song?.name}</h3>
        <h4>{song?.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
