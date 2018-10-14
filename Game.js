const LineParser = require("./LineParser.js");
const Combat = require("./ast/Combat.js");
const dnd = require("dnd-combat-simulator");

module.exports = class Game {

  constructor() {
    LineParser.getAndCheckNext(/setup/);
    LineParser.getAndCheckNext(/party/);

    this.party = require("./static/StaticParser.js");

    console.log(this.party);
  }

  parse() {
    if (!this.enemies) {
      this.setupEnemies();
      return;
    }
    // TODO:
    const command = LineParser.getNext();
    switch (command) {
      // where we make all our new nodes
      default: break;
    }
  }

  setupEnemies() {
    LineParser.getAndCheckNext(/setup/);
    LineParser.getAndCheckNext(/combat/);
    this.combat = new Combat();
    this.combat.parse();
    console.log("setting up enemies");
    // TODO accept more cmd line args
    this.enemies = this.combat.evaluate();
    console.log(this.enemies);
  }

  // Okay so when we spin up a program, our AST is our party and whatever arguments are passed in
  // to construct the enemies. Those are the ones we keep. All others we can evaluate on the fly

  evaluate() {
    console.log("Evaluating program");
    for (let cmd of commands) {
      cmd.evaluate();
    }
  }

}
