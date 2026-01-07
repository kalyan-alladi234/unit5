import { CarBuilder } from "./CarBuilder";

const car = new CarBuilder("Tesla Model S")
  .setEngine("Electric")
  .setColor("Black")
  .addSunroof()
  .setAutomaticTransmission()
  .build();

car.getDetails();
