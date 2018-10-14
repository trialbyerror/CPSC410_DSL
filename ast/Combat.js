const LineParser = require("../LineParser.js");
const dnd = require("dnd-combat-simulator");

class Combat {

  constructor() {
    this.commands = [];
  }

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
        this.commands.push(forNode);
        forNode.parse();
        break;
      case "spawn":
        const enemy = new EnemyNode();
        this.commands.push(enemy);
        enemy.parse();
        break;
      default:
        throw new Error("Invalid arguments to run combat: must specify at least one enemy.");
        break;
    }
  }

  evaluate() {
    console.log("Evaluating Combat")
    const enemies = [];
    for (const cmd of this.commands) {
      const cmdEval = cmd.evaluate();
      if (Array.isArray(cmdEval)) {
        for (const enemy of cmdEval) {
          enemies.push(enemy);
        }
      } else {
        enemies.push(cmdEval);
      }
    }
    const party = new dnd.Party();
    for (const enemy of enemies) {
      party.addMember(enemy);
    }
    return party;
  }
}

class ForNode {
  constructor() {}

  parse() {
    console.log("parsing forNode");
    this.numTimes = parseInt(LineParser.getNext());
    LineParser.getAndCheckNext(/times/);
    this.body = this.getForType();
    this.body.parse();
    return;
  }

  getForType() {
    const next = LineParser.getNext();
    switch (next) {
      case "spawn":
        return new EnemyNode();
        break;
      default:
        throw new Error("no other for loop bodies supported except enemydec");
    }
  }

  evaluate() {
    console.log("Evaluating ForNode")
    const completedActions = [];
    for (let i=0; i < this.numTimes; i++) {
      completedActions.push(this.body.evaluate());
    }
    return completedActions;
  }
}

class EnemyNode {
  constructor() {}

  parse() {
    console.log("parsing enemy node");
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
    LineParser.getAndCheckNext(/enemy/);
  }

  // returns a Combatant reflecting the enemy type
  evaluate() {
    console.log("Evaluating EnemyNode")
    // TODO make this more robust if time.
    return new dnd.Combatant(this.type, 11, 12, 2, 3, 6, 1, 1);
  }

}

module.exports = Combat;
