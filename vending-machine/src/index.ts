import { VendingMachine } from "./VendingMachine";

const vendingMachine = new VendingMachine();

vendingMachine.insertCoin();
vendingMachine.selectItem();
vendingMachine.dispense();

console.log("---- Invalid actions ----");
vendingMachine.dispense();
