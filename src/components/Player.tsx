import { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";
import { FaAngleLeft, FaAngleRight, FaPause, FaPlay } from "react-icons/fa";
import { ISong, ISongInfo } from "../types";
import { playAudio } from "../utils/utils";

type Props = {
  currentSong: ISong;
  setCurrentSong: Dispatch<SetStateAction<ISong>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<boolean>;
  audioRef: RefObject<HTMLAudioElement>;
  songInfo: ISongInfo;
  setSongInfo: Dispatch<ISongInfo>;
  songs: ISong[];
  setSongs: Dispatch<SetStateAction<ISong[]>>;
};

function Player({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
}: Props) {
  const playAudioHandler = () => {
    if (isPlaying) {
      setIsPlaying(!isPlaying);
      audioRef.current?.pause();
    } else {
      setIsPlaying(!isPlaying);
      audioRef.current?.play();
    }
  };

  const getTime = (time: number): string => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Number(e.target.value);
    setSongInfo({
      ...songInfo,
      currentTime: Number(e.target.value),
    });
  };
  const skipTrackHandler = (direction: string) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    } else {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
      } else {
        setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
      }
    }
    playAudio(isPlaying, audioRef);
  };

  const activeLibraryHandler = (nextOrPrev: ISong) => {
    const newSongs = songs.map((eachSong): ISong => {
      if (eachSong.id === nextOrPrev.id) {
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
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime!)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FaAngleLeft
          onClick={() => skipTrackHandler("skip-back")}
          size={"20px"}
          className="skip-left"
        />
        {isPlaying ? (
          <FaPause onClick={playAudioHandler} size={"20px"} className="pause" />
        ) : (
          <FaPlay onClick={playAudioHandler} size={"20px"} className="play" />
        )}
        <FaAngleRight
          onClick={() => skipTrackHandler("skip-forward")}
          size={"20px"}
          className="skip-right"
        />
      </div>
    </div>
  );
}

export default Player;
