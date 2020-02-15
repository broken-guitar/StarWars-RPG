
// ** VARIABLES **

var arrCharacters = [];

// setup object for each char (these hold char stats)
var char1 = {
    name: "fighter1",
    hp: 100,    // health points
    ap: 50,     // attack power
    cp: 25      // counter attack power
};
// TODO setup all other chars objects

// add all characters to the character array
arrCharacters.push(char1); 



// ** INITIALIZE **



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

