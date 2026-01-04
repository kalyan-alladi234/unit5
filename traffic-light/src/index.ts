import { TrafficLight } from "./TrafficLight";

const trafficLight = new TrafficLight();

for (let i = 0; i < 6; i++) {
  trafficLight.show();
  trafficLight.change();
}
