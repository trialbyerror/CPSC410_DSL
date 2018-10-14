const Program = require("./Program.js");
let program = new Program();
program.parse();
let party = program.evaluate();
module.exports = party;
