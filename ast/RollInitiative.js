const LineParser = require("../LineParser.js");

class RollInitiative {

    constructor() {}

    parse() {
        LineParser.getAndCheckNext(/initiative/);
        let identifier = LineParser.getNext();

        // Throw away "enemy" if there
        if (LineParser.checkNext() === "enemy") {
            LineParser.getNext()
        }

        return identifier;
    }
}

module.exports = RollInitiative;