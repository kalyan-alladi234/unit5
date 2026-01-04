import { State } from "./State";
import { MediaPlayer } from "../MediaPlayer";

export class PauseState implements State {
  constructor(private player: MediaPlayer) {}

  play(): void {
    console.log("Resuming media");
    this.player.setState(this.player.getPlayState());
  }

  pause(): void {
    console.log("Media already paused");
  }

  stop(): void {
    console.log("Stopping media from pause");
    this.player.setState(this.player.getStopState());
  }
}
