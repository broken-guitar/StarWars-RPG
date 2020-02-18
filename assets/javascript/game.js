// ** VARIABLES **

var arrCharacters = [];
var arrCards = [];

// TODO >> use a constructor to setup char objects
var Character = function(id, name, img, hp, ap, cap, player, alive) {
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

// add all characters to the character array
arrCharacters.push(fighter1, fighter2, fighter3, fighter4);

// FUNCIONS

function createCard(objCharacter) {
  let cardDiv = $("<div>", { id: objCharacter.id, class: "card" });
  let cardImg = $("<img>", {
    id: "",
    class: "card-img-top",
    src: objCharacter.img,
    alt: ""
  });
  let cardBody = $("<div>", { class: "card-body" });
  let cardTitle = $("<h5>", { class: "card-title", text: objCharacter.name });
  let cardText = $("<p>", { class: "card-text", text: "Card text" });

  cardDiv.append(cardImg);
  cardDiv.append(cardBody);
  cardBody.append(cardTitle);
  cardBody.append(cardText);
  console.log(cardDiv);
  return cardDiv;
}

// ** INITIALIZE **

// TODO >> dynamically create character cards with jquery
$.each(arrCharacters, function(index) {
  $("#player-deck").append(createCard(arrCharacters[index]));
  arrCards.push(createCard(arrCharacters[index]));
  console.log(arrCards);
});

// TODO disable 'attack' button until player chooses char
$("#fight-button").attr("class", "btn btn-danger disabled");

// player chooses a character by clicking picture

$(".card").on("click", function() {
  console.log($(this).attr("id"));
  let selectedId = $(this).attr("id");
  $.each(arrCards, function(index, arrCards) {
    if (!(arrCards.attr("id") == selectedId)) {
      console.log("test click: " + arrCards.attr("id") + " index: " + index);
      $("#enemy-deck").append($("#" + arrCards.attr("id")));
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
