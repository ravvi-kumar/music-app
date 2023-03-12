export interface ISong {
    name: string;
    cover: string;
    artist: string;
    audio: string;
    color: string[];
    id: string;
    active: boolean;
}
export interface ISongInfo {
    currentTime: number | undefined;
    duration: number | undefined
}