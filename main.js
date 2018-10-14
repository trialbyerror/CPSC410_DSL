const Game = require("./Game.js")
const LineParser = require("./LineParser.js");

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

var game = undefined;

rl.on('SIGINT', () => {
  rl.question('Are you sure you want to exit? ', (answer) => {
    if (answer.match(/^y(es)?$/i)) rl.pause();
  });
});

rl.on('line', (line) => {
  LineParser.tokenize(line);
  if (game === undefined) {
    game = new Game("main");
  }
  rl.prompt();
});

rl.prompt();
