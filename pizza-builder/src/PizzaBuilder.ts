import { Pizza } from "./Pizza";

export class PizzaBuilder {
  size: string;
  cheese: boolean = false;
  pepperoni: boolean = false;
  mushrooms: boolean = false;

  constructor(size: string) {
    this.size = size;
  }

  addCheese(): PizzaBuilder {
    this.cheese = true;
    return this;
  }

  addPepperoni(): PizzaBuilder {
    this.pepperoni = true;
    return this;
  }

  addMushrooms(): PizzaBuilder {
    this.mushrooms = true;
    return this;
  }

  build(): Pizza {
    return new Pizza(this);
  }
}
