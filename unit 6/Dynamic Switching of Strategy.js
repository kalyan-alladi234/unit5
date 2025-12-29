// Vehicle strategy implementations

class Bike {
  start() {
    console.log("Bike is starting");
  }
}

class Car {
  start() {
    console.log("Car is starting");
  }
}

// Driver (Context)
class Driver {
  constructor(vehicle) {
    this.vehicle = vehicle;
  }

  setVehicle(vehicle) {
    this.vehicle = vehicle; // switch strategy at runtime
  }

  drive() {
    this.vehicle.start();
    console.log("Driving...");
  }
}

// Usage
const driver = new Driver(new Bike());
driver.drive();

driver.setVehicle(new Car());
driver.drive();
