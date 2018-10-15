const LineParser = require("./LineParser.js");
const Combat = require("./ast/Combat.js");
const RollInitiative = require("./ast/RollInitiative.js");
const Target = require("./ast/Target.js");
const Run = require("./ast/Run.js");
const dnd = require("dnd-combat-simulator");

module.exports = class Game {

  constructor() {
    LineParser.getAndCheckNext(/setup/);
    LineParser.getAndCheckNext(/party/);

    this.party = require("./static/StaticParser.js");
    console.log("Loading your party..." + "\n");
    for (let c of this.party.members) {
        console.log(c.id + "\n" +
            "Armour Class: " + c.ac + "\n" +
            "HP: " + c.hp + "\n" +
            "Initiative: " + c.initiative + "\n");
    }
  }

  parse() {
    if (!this.enemies) {
      this.setupEnemies();
      return;
    }
    const command = LineParser.getNext();
    switch (command) {
        case "roll":
            this.parseRoll();
            break;
        case "target":
            let target = new Target(this.party, this.enemies);
            target.parse();
            target.evaluate();
            break;
        case "for":
        case "run":
            let run = new Run(this.fight);
            run.parse();
            run.evaluate();
            break;

      default: break;
    }
  }

  parseRoll() {
      let identifier = new RollInitiative().parse();
      switch(identifier) {
          case "all":
              console.log("Rolling initiative for all combatants...\n");
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
              console.log("Rolling initiative for all enemies...\n");
              for (let i = 0; i < this.enemies.members.length; i++) {
                  let e = this.enemies.members[i]
                  console.log(e.id + ": " + e.rollInitiative());
              }
              break;
          case "party":
              console.log("Rolling initiative for all party members...\n");
              for (let i = 0; i < this.party.members.length; i++) {
                  let c = this.party.members[i];
                  console.log(c.id + ": " + c.rollInitiative());
              }
              break;
          default:
              let found = false;
              for (let i = 0; i < this.party.members.length; i++) {
                  if (identifier === this.party.members[i].id) {
                      console.log("Rolling initiative for " + identifier + "...\n");
                      let c = this.party.members[i];
                      console.log(c.id + ": " + c.rollInitiative());
                      found = true;
                      break;
                  }
              }
              if (found) break;
              console.log("No party member named " + identifier);
              break;
      }
  }

  setupEnemies() {
    LineParser.getAndCheckNext(/setup/);
    LineParser.getAndCheckNext(/combat/);
    this.combat = new Combat();
    this.combat.parse();
    // TODO accept more cmd line args
    this.enemies = this.combat.evaluate();
    this.fight = new dnd.Combat();
    this.fight.addParty(this.party, "players");
    this.fight.addParty(this.enemies, "enemies");
  }

  // Okay so when we spin up a program, our AST is our party and whatever arguments are passed in
  // to construct the enemies. Those are the ones we keep. All others we can evaluate on the fly

  evaluate() {
    for (let cmd of commands) {
      cmd.evaluate();
    }
  }
}
