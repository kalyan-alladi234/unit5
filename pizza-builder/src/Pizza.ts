import { PizzaBuilder } from "./PizzaBuilder";

export class Pizza {
  size: string;
  cheese: boolean;
  pepperoni: boolean;
  mushrooms: boolean;

  constructor(builder: PizzaBuilder) {
    this.size = builder.size;
    this.cheese = builder.cheese;
    this.pepperoni = builder.pepperoni;
    this.mushrooms = builder.mushrooms;
  }

  getDetails(): void {
    console.log("Pizza Details:");
    console.log(`Size: ${this.size}`);
    console.log(`Cheese: ${this.cheese}`);
    console.log(`Pepperoni: ${this.pepperoni}`);
    console.log(`Mushrooms: ${this.mushrooms}`);
  }
}
