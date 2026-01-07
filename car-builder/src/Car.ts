import { CarBuilder } from "./CarBuilder";

export class Car {
  brand: string;
  engine: string;
  color: string;
  sunroof: boolean;
  automaticTransmission: boolean;

  constructor(builder: CarBuilder) {
    this.brand = builder.brand;
    this.engine = builder.engine;
    this.color = builder.color;
    this.sunroof = builder.sunroof;
    this.automaticTransmission = builder.automaticTransmission;
  }

  getDetails(): void {
    console.log("Car Details:");
    console.log(`Brand: ${this.brand}`);
    console.log(`Engine: ${this.engine}`);
    console.log(`Color: ${this.color}`);
    console.log(`Sunroof: ${this.sunroof}`);
    console.log(`Automatic Transmission: ${this.automaticTransmission}`);
  }
}
