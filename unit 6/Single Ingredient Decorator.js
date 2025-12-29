// Base Beverage class
class Beverage {
  getDescription() {
    throw new Error("Method must be implemented");
  }

  getCost() {
    throw new Error("Method must be implemented");
  }
}

// Concrete Beverage
class GreenTea extends Beverage {
  getDescription() {
    return "Green Tea";
  }

  getCost() {
    return 40;
  }
}

// Decorator: Sugar
class Sugar extends Beverage {
  constructor(beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription() {
    return `${this.beverage.getDescription()} + Sugar`;
  }

  getCost() {
    return this.beverage.getCost() + 10;
  }
}

// Usage
const tea = new Sugar(new GreenTea());
console.log(tea.getDescription()); // Green Tea + Sugar
console.log(tea.getCost());        // 50
