// Vehicle "interface" behavior via convention

class Car {
  start() {
    console.log("Car is starting");
  }
}

class Bike {
  start() {
    console.log("Bike is starting");
  }
}

class Driver {
  constructor(vehicle) {
    this.vehicle = vehicle;
  }

  drive() {
    this.vehicle.start();
    console.log("Driving...");
  }
}

// Usage
const carDriver = new Driver(new Car());
carDriver.drive();

const bikeDriver = new Driver(new Bike());
bikeDriver.drive();
