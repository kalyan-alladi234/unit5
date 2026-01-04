import { State } from "./State";
import { TrafficLight } from "../TrafficLight";

export class YellowState implements State {
  constructor(private trafficLight: TrafficLight) {}

  showLight(): void {
    console.log("YELLOW Light – Vehicles should SLOW DOWN");
  }

  next(): void {
    this.trafficLight.setState(this.trafficLight.getRedState());
  }
}
