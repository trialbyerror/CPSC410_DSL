const LineParser = require("../LineParser.js");
const dnd = require("dnd-combat-simulator");

class Combat {

  constructor() {}

  parse() {
    while (LineParser.moreTokens()) {
      LineParser.getAndCheckNext(/\//);
      const command = LineParser.getNext();
      this.parseOneCommand(command);
    }
  }

  parseOneCommand(command) {
    switch(command) {
      case "for":
        const forNode = new ForNode();
        break;
      case "spawn":
        const enemy = new EnemyNode();
        break;
      default:
        throw new Error("Invalid arguments to run combat: must specify at least one enemy.");
        break;
    }
  }
}

class EnemyNode {
  constructor() {}

  parse() {
    const type = LineParser.getNext();
    switch (type) {
      case "huge":
      case "small":
      case "medium":
      case "random":
        this.type = type;
        break;
      default:
        throw new Error("Did not specify a type for the enemy. \nPlease specify one of: small medium huge random");
        break;
    }
    LineParser.getAndCheckNext("enemy");
  }

  // returns a Combatant reflecting the enemy type
  evaluate() {
    // TODO make this more robust if time.
    return new dnd.Combatant(this.type, 11, 12, 2, 3, 6, 1, 1);
  }

}

module.exports = Combat;
