import { State } from "./State";
import { VendingMachine } from "../VendingMachine";

export class DispensingState implements State {
  constructor(private machine: VendingMachine) {}

  insertCoin(): void {
    console.log("Dispensing in progress, please wait");
  }

  selectItem(): void {
    console.log("Already dispensing");
  }

  dispense(): void {
    console.log("Item dispensed");
    this.machine.setState(this.machine.getIdleState());
  }
}
