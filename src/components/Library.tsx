import { Dispatch, RefObject, SetStateAction } from "react";
import { ISong } from "../types";
import LibrarySong from "./LibrarySong";

type Props = {
  songs: ISong[];
  setCurrentSong: Dispatch<SetStateAction<ISong>>;
  audioRef: RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  setSongs: Dispatch<SetStateAction<ISong[]>>;
  libraryStatus: boolean;
};
function Library({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}: Props) {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      {songs.map((song) => (
        <LibrarySong
          songs={songs}
          song={song}
          key={song.id}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setSongs={setSongs}
        />
      ))}
    </div>
  );
}

export default Library;
