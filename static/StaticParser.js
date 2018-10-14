const dnd = require('dnd-combat-simulator');

const Program = require("./Tokens.js");
let program = new Program();
program.parse();
let party = program.evaluate();
console.log(party);


