// Base bird class (no flying assumption)
class Bird {
  walk(): void {
    console.log("Walking...");
  }
}

// Flying capability
interface Flyable {
  fly(): void;
}

// Birds that can fly
class Sparrow extends Bird implements Flyable {
  fly(): void {
    console.log("Flying...");
  }
}

// Birds that cannot fly
class Ostrich extends Bird {
  // No fly() method here
  run(): void {
    console.log("Running fast...");
  }
}
