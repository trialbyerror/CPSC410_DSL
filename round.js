const dnd = require('dnd-combat-simulator');
let c = new dnd.Combat();
let f1 = new dnd.Combatant('dwarf', 10, 12, 0, 3, 6, 1, 1);
let f2 = new dnd.Combatant('elf', 15, 12, 5, 3, 6, 1, 1);

let o1 = new dnd.Combatant('goblin1', 11, 12, 2, 3, 6, 1, 1);
let o2 = new dnd.Combatant('goblin2', 9, 12, 4, 3, 6, 1, 1);

let p1 = new dnd.Party();
p1.addMember(f1);
p1.addMember(f2);

let p2 = new dnd.Party();
p2.addMember(o1);
p2.addMember(o2);

c.addParty(p1, 'players');
c.addParty(p2, 'goblins');

c.initiateCombat(console.log);

c.runRound(console.log);
