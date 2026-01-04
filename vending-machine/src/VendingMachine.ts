import { State } from "./states/State";
import { IdleState } from "./states/IdleState";
import { ProcessingState } from "./states/ProcessingState";
import { DispensingState } from "./states/DispensingState";

export class VendingMachine {
  private idleState: State;
  private processingState: State;
  private dispensingState: State;

  private currentState: State;

  constructor() {
    this.idleState = new IdleState(this);
    this.processingState = new ProcessingState(this);
    this.dispensingState = new DispensingState(this);

    this.currentState = this.idleState;
  }

  setState(state: State): void {
    this.currentState = state;
  }

  getIdleState(): State {
    return this.idleState;
  }

  getProcessingState(): State {
    return this.processingState;
  }

  getDispensingState(): State {
    return this.dispensingState;
  }

  insertCoin(): void {
    this.currentState.insertCoin();
  }

  selectItem(): void {
    this.currentState.selectItem();
  }

  dispense(): void {
    this.currentState.dispense();
  }
}
