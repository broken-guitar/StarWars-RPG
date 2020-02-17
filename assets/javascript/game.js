// ** VARIABLES **

var arrCharacters = [];

// TODO >> use a constructor to setup char objects
var GameCharacter = function (name, hp, ap, cap, player, alive) {
    this.name = name; // char name string
    this.hp = hp; // health points integer
    this.ap = ap; // attack power integer
    this.cap = cap; // counter attack power integer
    this.player = player; // player selected boolean
    this.alive = alive; // still alive boolean
};

var fighter1 = new GameCharacter('name1', 100, 50, 25, false, true);
var fighter2 = new GameCharacter('name2', 100, 50, 25, false, true);
var fighter3 = new GameCharacter('name3', 100, 50, 25, false, true);
var fighter4 = new GameCharacter('name4', 100, 50, 25, false, true);


// setup object for each char (these hold char stats)

// TODO >> setup all other chars objects

// add all characters to the character array
arrCharacters.push(char1);



// ** INITIALIZE **

// TODO >> build the character elements?


// TODO disable 'attack' button until player chooses char
$("#btnSubmit").attr("disabled", true);

// player chooses a character by clicking picture

// TODO on click event for each char element?

// remaining characters move to 'enemies' section

// TODO move enemie char elements to enemy section

// player chooses an opponent from the enemies section

// TODO use on click event (existing?) with flag to tell status (is enemey, not dead)

// player can now click attack button

// TODO Enable attack button
// TODO create attack on click event
// TODO     - randomly determine attack sequence,
// TODO     - update vars/stats
// TODO     - when player/enemy defeated
// TODO     - game end / select next enemy