// ** VARIABLES **

var arrCharacters = [];

// TODO >> use a constructor to setup char objects
var Character = function (name, img, hp, ap, cap, player, alive) {
    this.name = name; // char name string
    this.img = img; // image url for char
    this.hp = hp; // health points integer
    this.ap = ap; // attack power integer
    this.cap = cap; // counter attack power integer
    this.player = player; // player selected boolean
    this.alive = alive; // still alive boolean
};

var fighter1 = new Character('yoda', '/assets/images/baby-yoda.jpg', 100, 50, 25, false, true);
var fighter2 = new Character('chewbacca', '/assets/images/chewbacca.jpg', 100, 50, 25, false, true);
var fighter3 = new Character('lucasfilm', '/assets/images/lucasfilm.jpg', 100, 50, 25, false, true);
var fighter4 = new Character('jawas', '/assets/images/jawas.jpg', 100, 50, 25, false, true);

// add all characters to the character array
arrCharacters.push(fighter1, fighter2, fighter3, fighter4);

// ** INITIALIZE **

// TODO >> dynamically create character cards with jquery


// TODO >> build the character elements?


// TODO disable 'attack' button until player chooses char
$("#fight-button").attr("class", "btn btn-danger disabled");

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