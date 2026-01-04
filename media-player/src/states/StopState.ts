import { State } from "./State";
import { MediaPlayer } from "../MediaPlayer";

export class StopState implements State {
  constructor(private player: MediaPlayer) {}

  play(): void {
    console.log("Playing media from beginning");
    this.player.setState(this.player.getPlayState());
  }

  pause(): void {
    console.log("Cannot pause. Media is stopped");
  }

  stop(): void {
    console.log("Media already stopped");
  }
}
