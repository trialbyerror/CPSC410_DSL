const LineParser = require("../LineParser.js");
const Combat = require("./Combat.js");

class Target {

    constructor(party, enemies) {
        this.party = party;
        this.enemies = enemies;
    }

    parse() {
        this.name = LineParser.getNext();

        // Throw away "enemy" if there
        if (LineParser.checkNext() === "enemy") {
            LineParser.getNext()
        }

        this.identifier = LineParser.getNext();
    }

    evaluate() {
        let names = [];
        for (let i = 0; i < this.party.members.length; i++) {
            names.push(this.party.members[i].id);
        }
        for (let i = 0; i < this.enemies.members.length; i++) {
            names.push(this.enemies.members[i].id);
        }
        if (names.includes(this.name)) {
            let strategy = (combatantA, combatantB) => {
                if (combatantA.id === this.name && combatantB.id === this.name) {
                    return 0;
                } else if (combatantA.id === this.name) {
                    return -1;
                } else if (combatantB.id === this.name) {
                    return 1;
                } else {
                    return 0;
                }
            };

            if (this.identifier === "party") {
                this.party.combatStrategy = strategy;
                console.log(this.identifier + " targeted " + this.party.selectTarget(this.enemies.members).id);
            } else if (this.identifier === "enemies") {
                this.enemies.combatStrategy = strategy;
                this.enemies.selectTarget(this.party.members);
                console.log(this.identifier + " targeted " + this.enemies.selectTarget(this.party.members).id);
            } else {
                console.log("Only a party can select a target");
            }
        } else {
            console.log("There is no combatant named " + this.name);
        }
    }
}

module.exports = Target;