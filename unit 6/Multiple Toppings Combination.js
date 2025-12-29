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

// Decorator: Sugar (+10)
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

// Decorator: Honey (+20)
class Honey extends Beverage {
  constructor(beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription() {
    return `${this.beverage.getDescription()} + Honey`;
  }

  getCost() {
    return this.beverage.getCost() + 20;
  }
}

// Usage: Sugar + Honey
const tea = new Honey(new Sugar(new GreenTea()));
console.log(tea.getDescription()); // Green Tea + Sugar + Honey
console.log(tea.getCost());        // 70
