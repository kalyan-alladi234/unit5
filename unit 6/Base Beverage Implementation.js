// Base Beverage class
class Beverage {
  getDescription() {
    throw new Error("Method must be implemented");
  }

  getCost() {
    throw new Error("Method must be implemented");
  }
}

// GreenTea class
class GreenTea extends Beverage {
  getDescription() {
    return "Green Tea";
  }

  getCost() {
    return 40;
  }
}

// Usage
const tea = new GreenTea();
console.log(tea.getDescription()); // Green Tea
console.log(tea.getCost());        // 40
