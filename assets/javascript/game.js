// ** VARIABLES **

var arrCharacters = [];
var arrCards = [];

// TODO >> use a constructor to setup char objects
var Character = function (id, name, img, hp, ap, cap, player, alive) {
  this.id = id; // unique char id
  this.name = name; // char name string
  this.img = img; // image url for char
  this.hp = hp; // health points integer
  this.ap = ap; // attack power integer
  this.cap = cap; // counter attack power integer
  this.player = player; // player selected boolean
  this.alive = alive; // still alive boolean
};

var fighter1 = new Character(
  1,
  "Baby Yoda",
  "assets/images/baby-yoda.jpg",
  100,
  50,
  25,
  false,
  true
);
var fighter2 = new Character(
  2,
  "Chewbacca",
  "assets/images/chewbacca.jpg",
  100,
  50,
  25,
  false,
  true
);
var fighter3 = new Character(
  3,
  "Mickey",
  "assets/images/lucasfilm.jpg",
  100,
  50,
  25,
  false,
  true
);
var fighter4 = new Character(
  4,
  "Jawas",
  "assets/images/jawas.jpg",
  100,
  50,
  25,
  false,
  true
);

// add all characters to the character array, order is important!
arrCharacters.push(fighter1, fighter2, fighter3, fighter4);

// FUNCIONS

function createCard(objCharacter) {
  let cardDiv = $("<div>", {
    id: "character-card",
    fighterId: objCharacter.id,
    class: "card"
  });
  let cardImg = $("<img>", {
    id: "",
    class: "card-img-top",
    src: objCharacter.img,
    alt: ""
  });
  let cardBody = $("<div>", {
    class: "card-body"
  });
  let cardTitle = $("<h5>", {
    class: "card-title",
    text: objCharacter.name
  });
  let cardText = $("<p>", {
    class: "card-text",
    text: "Card text"
  });

  cardDiv.append(cardImg);
  cardDiv.append(cardBody);
  cardBody.append(cardTitle);
  cardBody.append(cardText);
  return cardDiv;
}

// ** INITIALIZE **

// create character cards and append to player selection section
$.each(arrCharacters, function (index) {
  $("#player-deck").append(createCard(arrCharacters[index]));
  arrCards.push(createCard(arrCharacters[index]));
  console.log(arrCards[index]);
});

// disable attack button
$("#attack-button").attr("class", "btn btn-danger disabled");

// when player selects character, move other chars to enemy section
$(".card").on("click", function () {

  // get the character id from the card
  let selectedId = parseInt($(this).attr("fighterId"));

  // update the player's char player:boolean property
  let selectedChar = $.grep(arrCharacters, function (c) {
    return c.id == selectedId
  });

  selectedChar[0].player = true; // note: grep returns array, so use index 0 for one char result

  $.each(arrCards, function (index, card) {
    // for each character card,
    let eachCardFighterId = parseInt(card.attr("fighterId"));
    let eachChar = $.grep(arrCharacters, function (grepChar) {
      return grepChar.id == eachCardFighterId;
    });

    if (eachChar[0].id !== selectedId &&
      eachChar[0].player == false) {
      $("#enemy-deck").append($("[fighterId='" + eachCardFighterId + "']"));
      console.log(card.parent());
    }
  });
});

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