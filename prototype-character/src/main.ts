import { GameCharacter } from "./GameCharacter";

// Original character
const warrior = new GameCharacter("Warrior", 10, "Sword");

// Clone character
const warriorClone = warrior.clone();
warriorClone.name = "Warrior Clone";

// Print both characters
console.log("Original Character:", warrior);
console.log("Cloned Character:", warriorClone);
