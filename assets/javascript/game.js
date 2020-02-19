// ** VARIABLES **

var arrCharacters = [];
var arrCards = [];

var playerSelected = false;
var enemySelected = false;
var gamePhase = "";

var playerChar = {};

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

// add all characters to the character array, order is important!
arrCharacters.push(fighter1, fighter2, fighter3, fighter4);

// FUNCIONS

function createCard(character) {
  let cardDiv = $("<div>", {
    id: character.id,
    fighterId: character.id,
    class: "card",
    style: "width: 14rem;"
  });
  let cardImg = $("<img>", {
    id: "",
    class: "card-img-top",
    src: character.img,
    alt: ""
  });
  let cardBody = $("<div>", {
    class: "card-body"
  });
  let cardTitle = $("<h5>", {
    class: "card-title",
    text: character.name
  });
  let cardText = $("<p>", {
    class: "card-text",
    text: "HP: " + character.hp
  });

  cardDiv.append(cardImg);
  cardDiv.append(cardBody);
  cardBody.append(cardTitle);
  cardBody.append(cardText);
  return cardDiv;
}

function moveAnimate(element, newParent) {
  //Allow passing in either a jQuery object or selector
  element = $(element);
  newParent = $(newParent);

  var oldOffset = element.offset();
  element.appendTo(newParent);
  var newOffset = element.offset();

  var temp = element.clone().appendTo("body");
  temp.css({
    position: "absolute",
    left: oldOffset.left,
    top: oldOffset.top,
    "z-index": 1000
  });
  element.hide();
  temp.animate(
    { top: newOffset.top, left: newOffset.left },
    "slow",
    function() {
      element.show();
      temp.remove();
    }
  );
}

// **** INITIALIZE ****

gamePhase = "player-selection";
playerSelected = false;
enemySelected = false;
arrCharacters.forEach(function(value, index, arr) {
  arr[index].player = false;
});
// create character cards and append to player selection section
$.each(arrCharacters, function(index) {
  $("#player-deck").append(createCard(arrCharacters[index]));
  arrCards.push(createCard(arrCharacters[index]));
});

// disable attack button
$("#attack-button").attr("class", "btn btn-danger disabled");

// **** CLICK EVENT ****

// when player selects character, move other chars to enemy section
$(".card").on("click", function() {
  switch (gamePhase) {
    case "player-selection":
      // get the character id from the card
      let selectedId = parseInt($(this).attr("fighterId"));

      // update the player's character object (player: true)
      let selectedChar = $.grep(arrCharacters, function(o) {
        return o.id == selectedId;
      });
      playerChar = selectedChar[0]; // grep returns array, so use index 0 when expecting single result
      playerChar.player = true;
      playerSelected = true;
      console.log("player is: " + playerChar.name);

      // for each char card, get the char object by id then do stuff...
      $(".card").each(function(index) {
        let cardId = parseInt($(this).attr("fighterId"));
        let character = $.grep(arrCharacters, function(o) {
          return o.id == cardId;
        });

        // ...if not selected char, not player, and not in enemey deck...
        if (
          character[0].id !== selectedId &&
          character[0].player == false &&
          $(this)
            .parent()
            .attr("id") !== "enemy-deck"
        ) {
          // ...then move cards to enemy section, and update formatting
          // $("#enemy-deck").append($("[fighterId='" + cardId + "']"));
          $(this).attr("class", "card text-white bg-danger");
          setTimeout(moveAnimate($(this), "#enemy-deck"), 1000);
        } else {
          $(this).attr("class", "card bg-white");
          $(this).attr("style", "width: 20rem;");
          // $(this).animate(
          //   {
          //     width: "30rem"
          //   },
          //   750,
          //   function() {}
          // );
        }
      });
      gamePhase = "enemy-selection";
      console.log("game phase: " + gamePhase);
      break;

    case "enemy-selection":
      if (
        $(this)
          .parent()
          .attr("id") == "enemy-deck"
      ) {
        let selectedId = parseInt($(this).attr("fighterId"));
        let selectedEnemy = $.grep(arrCharacters, function(o) {
          return o.id == selectedId;
        });
        console.log(selectedEnemy[0]);
        if (selectedEnemy[0].alive) {
          console.log($(this));
          $("#fight-deck").append($(this));
          $(this).attr("class", "card text-white bg-dark");
          $(this).attr("style", "width: 20rem;");
        }
      }

      gamePhase = "fighting";
      break;

    case "fighting":
      break;
    default:
  }
}); // close of .card on click

// TODO on click event for each char element?

// player chooses an opponent from the enemies section

// TODO use on click event (existing?) with flag to tell status (is enemey, not dead)

// player can now click attack button

// TODO Enable attack button
// TODO create attack on click event
// TODO     - randomly determine attack sequence,
// TODO     - update vars/stats
// TODO     - when player/enemy defeated
// TODO     - game end / select next enemy
