const Game = require("./Game.js")
const LineParser = require("./LineParser.js");

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

var game = undefined;

const handleOneLine = (line) => {
  try {
    LineParser.tokenize(line);
    if (game === undefined) {
      game = new Game();
    } else {
      game.parse();
    }
  } catch (err) {
    console.log(err);
  }
  rl.prompt();
};

rl.on('SIGINT', () => {
  rl.question('Are you sure you want to exit? ', (answer) => {
    if (answer.match(/^y(es)?$/i)) rl.pause();
  });
});

rl.on('line', handleOneLine);

rl.prompt();
