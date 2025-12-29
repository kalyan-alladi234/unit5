class Engine {
  start() {
    console.log("Engine started");
  }
}

class Car {
  constructor() {
    // Tight coupling: Car directly creates Engine
    this.engine = new Engine();
  }

  drive() {
    this.engine.start();
    console.log("Car is driving");
  }
}

// Usage
const car = new Car();
car.drive();
