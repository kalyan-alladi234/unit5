// Base Beverage class
class Beverage {
  getDescription() {
    throw new Error("Method must be implemented");
  }

  getCost() {
    throw new Error("Method must be implemented");
  }
}

// Base Beverage: Coffee
class Coffee extends Beverage {
  getDescription() {
    return "Coffee";
  }

  getCost() {
    return 50;
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

// Decorator: WhippedCream (+15)
class WhippedCream extends Beverage {
  constructor(beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription() {
    return `${this.beverage.getDescription()} + WhippedCream`;
  }

  getCost() {
    return this.beverage.getCost() + 15;
  }
}

// Usage
const myDrink = new WhippedCream(new Honey(new Sugar(new Coffee())));
console.log(myDrink.getDescription()); // Coffee + Sugar + Honey + WhippedCream
console.log(myDrink.getCost());        // 95
