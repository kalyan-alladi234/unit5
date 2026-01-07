import { Car } from "./Car";

export class CarBuilder {
  brand: string;
  engine: string;
  color: string;
  sunroof: boolean = false;
  automaticTransmission: boolean = false;

  constructor(brand: string) {
    this.brand = brand;
    this.engine = "";
    this.color = "";
  }

  setEngine(engine: string): CarBuilder {
    this.engine = engine;
    return this;
  }

  setColor(color: string): CarBuilder {
    this.color = color;
    return this;
  }

  addSunroof(): CarBuilder {
    this.sunroof = true;
    return this;
  }

  setAutomaticTransmission(): CarBuilder {
    this.automaticTransmission = true;
    return this;
  }

  build(): Car {
    return new Car(this);
  }
}
