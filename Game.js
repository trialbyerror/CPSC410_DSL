const LineParser = require("./LineParser.js");
const Combat = require("./ast/Combat.js");
const RollInitiative = require("./ast/RollInitiative.js");
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
        case "roll":
            this.parseRoll();
            break;
        case "target":
            // TODO target
            break;
        case "for":
            // TODO run
            break;
      // where we make all our new nodes
      default: break;
    }
  }

  parseRoll() {
      let identifier = new RollInitiative().parse();
      switch(identifier) {
          case "all":
              console.log("Rolling initiative for all combatants...");
              for (let i = 0; i < this.party.members.length; i++) {
                  let c = this.party.members[i];
                  console.log(c.id + ": " + c.rollInitiative());
              }
              for (let i = 0; i < this.enemies.members.length; i++) {
                  let e = this.enemies.members[i];
                  console.log(e.id + ": " + e.rollInitiative());
              }
              break;
          case "enemies":
              console.log("Rolling initiative for all enemies...");
              for (let i = 0; i < this.enemies.members.length; i++) {
                  let e = this.enemies.members[i]
                  console.log(e.id + ": " + e.rollInitiative());
              }
              break;
          case "party":
              console.log("Rolling initiative for all party members...");
              for (let i = 0; i < this.party.members.length; i++) {
                  let c = this.party.members[i];
                  console.log(c.id + ": " + c.rollInitiative());
              }
              break;
          default:
              console.log("Rolling initiative for " + identifier + ": ");
              for (let i = 0; i < this.party.members.length; i++) {
                  if (identifier === this.party.members[i].id) {
                      console.log("Rolling initiative for " + identifier + ": ");
                      let c = this.party.members[i];
                      console.log(c.id + ": " + c.rollInitiative());
                      break;
                  }
              }
              console.log("No party member named " + identifier);
              break;
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
