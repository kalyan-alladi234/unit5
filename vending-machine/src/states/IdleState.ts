import { State } from "./State";
import { VendingMachine } from "../VendingMachine";

export class IdleState implements State {
  constructor(private machine: VendingMachine) {}

  insertCoin(): void {
    console.log("Coin inserted");
    this.machine.setState(this.machine.getProcessingState());
  }

  selectItem(): void {
    console.log("Please insert a coin first");
  }

  dispense(): void {
    console.log("Nothing to dispense");
  }
}
