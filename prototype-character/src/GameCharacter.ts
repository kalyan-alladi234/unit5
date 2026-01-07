export class GameCharacter {
  name: string;
  level: number;
  weapon: string;

  constructor(name: string, level: number, weapon: string) {
    this.name = name;
    this.level = level;
    this.weapon = weapon;
  }

  clone(): GameCharacter {
    return new GameCharacter(this.name, this.level, this.weapon);
  }
}
