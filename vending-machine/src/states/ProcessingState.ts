import { State } from "./State";
import { VendingMachine } from "../VendingMachine";

export class ProcessingState implements State {
  constructor(private machine: VendingMachine) {}

  insertCoin(): void {
    console.log("Coin already inserted");
  }

  selectItem(): void {
    console.log("Item selected");
    this.machine.setState(this.machine.getDispensingState());
  }

  dispense(): void {
    console.log("Please select an item first");
  }
}
