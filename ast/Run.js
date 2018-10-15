const LineParser = require("../LineParser.js");
const Combat = require("./Combat.js");

class Run {

    constructor(fight) {
        this.fight = fight;
    }

    parse() {
        if (LineParser.checkNext() === "combat") {
            this.numTimes = 1;
            this.fightType = LineParser.getNext();
        } else if (LineParser.checkNext() === "round") {
            this.numTimes = 1;
            this.fightType = LineParser.getNext();
        } else {
            this.numTimes = parseInt(LineParser.getNext());
            LineParser.getAndCheckNext(/times/);
            LineParser.getAndCheckNext(/run/);
            this.fightType = LineParser.getAndCheckNext(/(round)|(combat)/);
        }
    }

    evaluate() {
        if (this.fightType === "round") {
            this.fight.initiateCombat(console.log);
            for (let i = 0; i < this.numTimes; i++) {
                this.fight.runRound(console.log);
            }
        } else {
            let winners = [];
            for (let i = 0; i < this.numTimes; i++) {
                winners.push(this.fight.runFight(console.log));
                this.fight.reset();
            }
            let parties = {};
            for (let party_id in this.fight.parties){
                parties[party_id] = 0;
            }

            let count = 1;
            console.log('\nSurvivors:');
            winners.forEach(function(winner_party){
                console.log('Fight ' + count + ': ' + winner_party[0].party_id);
                count++;
                parties[winner_party[0].party_id] += 1;
            });

            console.log('\nWin Ratios:');
            for (let p in parties){
                console.log(p + ': ' + parties[p]);
            }
        }
    }

}

module.exports = Run;