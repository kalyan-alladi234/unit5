// Shipping strategy interface
interface ShippingStrategy {
  calculate(): number;
}

// Standard shipping
class StandardShipping implements ShippingStrategy {
  calculate(): number {
    return 50;
  }
}

// Express shipping
class ExpressShipping implements ShippingStrategy {
  calculate(): number {
    return 100;
  }
}

// Shipping class (CLOSED for modification, OPEN for extension)
class Shipping {
  private strategy: ShippingStrategy;

  constructor(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }

  calculate(): number {
    return this.strategy.calculate();
  }
}

// Usage
const standard = new Shipping(new StandardShipping());
console.log(standard.calculate()); // 50

const express = new Shipping(new ExpressShipping());
console.log(express.calculate()); // 100
