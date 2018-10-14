const dnd = require('dnd-combat-simulator');

class Node {
    constructor() {
        this.tokenizer = require("./Tokenizer.js");
    }
}

class Program extends Node {
    constructor() {
        super();
        this.statements = [];
    }

    parse() {
        while(!this.tokenizer.checkToken(/NO_MORE_TOKENS/)) {
            let s = null;
            if (this.tokenizer.checkToken(/Unite/)) {
                s = new Chardec();
                this.statements.push(s);
                s.parse();
            }
        }
    }

    evaluate() {
        let party = new dnd.Party();
        for (let i = 0; i < this.statements.length; i++) {
            party.addMember(this.statements[i].evaluate());
        }
        return party;
    }
}

class Statement extends Node{
    constructor() {super()};
}

class Chardec extends Statement {
    constructor() {
        super();
        this.id = new ID();
        this.ac = new AC();
        this.hp = new HP();
        this.initiative = new Initiative();
        this.attacks = [];
    }

    parse() {
        this.id.parse();
        this.ac.parse();
        this.hp.parse();
        this.initiative.parse();
        while (this.tokenizer.checkToken(/With/)){
            let a = new Attack();
            a.parse();
            this.attacks.push(a);
        }
    }

    evaluate() {
        let combatant = new dnd.Combatant(this.id.name, this.hp.hp, this.ac.ac, this.initiative.initiative,
            0, this.attacks[0].damage, this.attacks[0].dmg_dice, 0);
        for (let i = 1; i < this.attacks.length; i++) {
            let attack = new dnd.Attack(this.attacks[i].damage, this.attacks[i].dmg_dice, 0);
            combatant.addAttack(attack);
        }
        return combatant;
    }
}

class ID extends Statement {

    constructor() {
        super();
        this.race = "";
        this.name = "";
    }

    parse() {
        // Unite thy <race> known as <name>
        this.tokenizer.getAndCheckNext(/Unite/);
        this.tokenizer.getAndCheckNext(/thy/);
        this.race = this.tokenizer.getNext();
        this.tokenizer.getAndCheckNext(/known/);
        this.tokenizer.getAndCheckNext(/as/);
        this.name = this.tokenizer.getNext();
    }

    evaluate() {
        //todo
    }
}

class AC extends Statement {

    constructor() {
        super();
        this.ac = 0;
    }

    parse() {
        // With hsi armour and shield, he is protected 4 times over
        if (this.tokenizer.checkToken(/With/)) {
            this.tokenizer.getAndCheckNext(/With/);

            // Cheating way to do the whole VARDEC part
            while (!this.tokenizer.checkToken(/^is$/)) {
                this.tokenizer.getAndCheckNext(/[a-zA-Z]+/);
            }

            this.tokenizer.getAndCheckNext(/is/);
            this.tokenizer.getAndCheckNext(/protected/);
            this.ac = parseInt(this.tokenizer.getNext());
            this.tokenizer.getAndCheckNext(/times/);
            this.tokenizer.getAndCheckNext(/over/);
        }
    }

    evaluate() {
        //todo
    }
}

class HP extends Statement {

    constructor() {
        super();
        this.hp = 0;
    }

    parse() {
        // He can withstand 24 damage from any foe
        this.tokenizer.getAndCheckNext(/[a-zA-Z][a-zA-Z]+/);
        this.tokenizer.getAndCheckNext(/can/);
        this.tokenizer.getAndCheckNext(/withstand/);
        this.hp = parseInt(this.tokenizer.getNext());
        this.tokenizer.getAndCheckNext(/damage/);
        this.tokenizer.getAndCheckNext(/from/);
        this.tokenizer.getAndCheckNext(/any/);
        this.tokenizer.getAndCheckNext(/foe/);
    }

    evaluate() {
        //todo
    }
}

class Initiative extends Statement {

    constructor() {
        super();
        this.initiative = 0;
    }

    parse() {
        // This soul is thrice as brave as any commoner
        this.tokenizer.getAndCheckNext(/This/);
        this.tokenizer.getAndCheckNext(/soul/);
        this.tokenizer.getAndCheckNext(/has/);
        this.tokenizer.getAndCheckNext(/an/);
        this.tokenizer.getAndCheckNext(/initiative/);
        this.tokenizer.getAndCheckNext(/of/);
        this.initiative = parseInt(this.tokenizer.getNext());
        if (this.initiative === 0) {
            this.initiative = 1;
        }

    }

    evaluate() {
        //todo
    }
}

class Attack extends Statement {

    constructor() {
        super();
        this.dmg_dice = 0;
        this.damage = 0;
    }

    parse() {
        // With his broadsword, he aims 2 strikes at his enemy, causing pain of the fourth degree
        this.tokenizer.getAndCheckNext(/With/);

        // Cheating way to do the whole VARDEC part
        while (!this.tokenizer.checkToken(/aims/)) {
            this.tokenizer.getAndCheckNext(/[a-zA-Z]+/);
        }
        this.tokenizer.getAndCheckNext(/aims/);
        this.dmg_dice = parseInt(this.tokenizer.getNext());
        this.tokenizer.getAndCheckNext(/strike(s)?/);
        this.tokenizer.getAndCheckNext(/at/);
        this.tokenizer.getAndCheckNext(/[a-zA-Z][a-zA-Z]+/);
        this.tokenizer.getAndCheckNext(/enemy/);
        this.tokenizer.getAndCheckNext(/causing/);
        this.tokenizer.getAndCheckNext(/pain/);
        this.tokenizer.getAndCheckNext(/of/);
        this.tokenizer.getAndCheckNext(/the/);
        switch (this.tokenizer.getNext()) {
            case "fourth":
                this.damage = 4;
                break;
            case "sixth":
                this.damage = 6;
                break;
            case "eighth":
                this.damage = 8;
                break;
            case "tenth":
                this.damage = 10;
                break;
            case "twelfth":
                this.damage = 12;
                break;
            default:
                this.damage = 4;
                break;
        }
        this.tokenizer.getAndCheckNext(/degree/);
    }

    evaluate() {
        //todo
    }
}

module.exports = Program;
