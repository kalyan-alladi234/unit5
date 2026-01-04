import { State } from "./State";
import { MediaPlayer } from "../MediaPlayer";

export class PlayState implements State {
  constructor(private player: MediaPlayer) {}

  play(): void {
    console.log("Media is already playing");
  }

  pause(): void {
    console.log("Pausing media");
    this.player.setState(this.player.getPauseState());
  }

  stop(): void {
    console.log("Stopping media");
    this.player.setState(this.player.getStopState());
  }
}
