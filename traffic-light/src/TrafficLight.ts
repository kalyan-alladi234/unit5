import { State } from "./states/State";
import { RedState } from "./states/RedState";
import { GreenState } from "./states/GreenState";
import { YellowState } from "./states/YellowState";

export class TrafficLight {
  private redState: State;
  private greenState: State;
  private yellowState: State;

  private currentState: State;

  constructor() {
    this.redState = new RedState(this);
    this.greenState = new GreenState(this);
    this.yellowState = new YellowState(this);

    this.currentState = this.redState; // Initial state
  }

  setState(state: State): void {
    this.currentState = state;
  }

  getRedState(): State {
    return this.redState;
  }

  getGreenState(): State {
    return this.greenState;
  }

  getYellowState(): State {
    return this.yellowState;
  }

  show(): void {
    this.currentState.showLight();
  }

  change(): void {
    this.currentState.next();
  }
}
