import { State } from "./states/State";
import { PlayState } from "./states/PlayState";
import { PauseState } from "./states/PauseState";
import { StopState } from "./states/StopState";

export class MediaPlayer {
  private playState: State;
  private pauseState: State;
  private stopState: State;

  private currentState: State;

  constructor() {
    this.playState = new PlayState(this);
    this.pauseState = new PauseState(this);
    this.stopState = new StopState(this);

    this.currentState = this.stopState; // Initial state
  }

  setState(state: State): void {
    this.currentState = state;
  }

  getPlayState(): State {
    return this.playState;
  }

  getPauseState(): State {
    return this.pauseState;
  }

  getStopState(): State {
    return this.stopState;
  }

  play(): void {
    this.currentState.play();
  }

  pause(): void {
    this.currentState.pause();
  }

  stop(): void {
    this.currentState.stop();
  }
}
