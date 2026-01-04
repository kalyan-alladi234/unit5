import { State } from "./State";
import { TrafficLight } from "../TrafficLight";

export class GreenState implements State {
  constructor(private trafficLight: TrafficLight) {}

  showLight(): void {
    console.log("GREEN Light – Vehicles can MOVE");
  }

  next(): void {
    this.trafficLight.setState(this.trafficLight.getYellowState());
  }
}
