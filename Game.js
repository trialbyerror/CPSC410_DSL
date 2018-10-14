const LineParser = require("./LineParser.js");

module.exports = class Game {

  constructor() {
    LineParser.getAndCheckNext(/setup/);
    LineParser.getAndCheckNext(/party/);

    this.party = require("./static/StaticParser.js");

    console.log(this.party);
  }

  parse(line) {
    console.log("Parsing line " + line);
    switch (line) {
      // where we make all our new nodes
      default: break;
    }
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
