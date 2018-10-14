class LineParser {

  constructor() {
    this.validCommands = ["setup", "for", "run", "roll", "target"];
    this.tokens = [];
    this.currentToken = 0;
  }

  tokenize(line) {
    this.tokens = line.split(" ");
    for (let token of this.tokens) {
      console.log(token);
    }
    this.currentToken = 0;
  }

  checkNext() {
      let token = "";
      if (this.currentToken < this.tokens.length) {
          token = this.tokens[this.currentToken];
      } else {
          token = "NO_MORE_TOKENS";
      }
      return token;
  }

  getNext() {
      let token = "";
      if (this.currentToken < this.tokens.length) {
          token = this.tokens[this.currentToken]
          this.currentToken++;
      } else {
          token = "NULLTOKEN";
      }
      return token;
  }

  checkToken(regexp) {
      let s = this.checkNext();
      return regexp.test(s);
  }

  getAndCheckNext(regexp) {
      let s = this.getNext();
      if (!regexp.test(s)) {
          throw new Error("Unexpected token")
      }
      return s;
  }

  moreTokens() {
      return this.currentToken < this.tokens.length;
  }

}

module.exports = new LineParser();
