class Tokenizer {
    constructor() {
        this.tokens =  Tokenizer._textToArray();
        this.currentToken = 0;
    }

    static _textToArray() {
        const fs = require("fs");
        let text = fs.readFileSync("./party.txt", "utf8");
        text = text.replace(/\r\n\r\n/g, "\r\n").replace(/\r\n/g, " ").replace(/,/g, "");
        const pattern = new RegExp(/\s/);
        return text.split(pattern);
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

let instance = new Tokenizer();
module.exports = instance;