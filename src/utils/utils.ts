import { RefObject } from "react";

export const playAudio = (
  isPlaying: boolean,
  audioRef: RefObject<HTMLAudioElement>
) => {
  if (isPlaying) {
    const playPromise = audioRef.current?.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        audioRef.current?.play();
      });
    }
  }
};
