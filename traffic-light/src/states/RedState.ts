import { State } from "./State";
import { TrafficLight } from "../TrafficLight";

export class RedState implements State {
  constructor(private trafficLight: TrafficLight) {}

  showLight(): void {
    console.log("RED Light – Vehicles must STOP");
  }

  next(): void {
    this.trafficLight.setState(this.trafficLight.getGreenState());
  }
}
