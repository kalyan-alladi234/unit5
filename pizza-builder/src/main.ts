import { PizzaBuilder } from "./PizzaBuilder";

const pizza = new PizzaBuilder("Large")
  .addCheese()
  .addMushrooms()
  .build();

pizza.getDetails();
