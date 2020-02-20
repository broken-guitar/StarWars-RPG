// ** VARIABLES **

var arrCharacters = [];
var arrCards = [];

var playerSelected = false;
var enemySelected = false;
var gamePhase = "";

var playerChar = {};
var enemyChar = {};

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
  75,
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
    healthId: character.id + "-health",
    class: "card-text",
    text: "HP: " + character.hp
  });

  cardDiv.append(cardImg);
  cardDiv.append(cardBody);
  cardBody.append(cardTitle);
  cardBody.append(cardText);
  return cardDiv;
}

// credit goes to Davy8 on stackoverflow for this moveAnimate function
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
  temp.animate({
      top: newOffset.top,
      left: newOffset.left
    },
    "slow",
    function () {
      element.show();
      temp.remove();
    }
  );
}

function phaseSelectHero() {
  console.log("select hero");
  gamePhase = "select-hero";
  $("#attack-button").attr("class", "btn btn-lg btn-secondary disabled");
}

function phaseSelectEnemy() {
  gamePhase = "select-enemy";
  $("#attack-button").attr("class", "btn btn-lg btn-secondary disabled");
}

function phaseFighting() {
  gamePhase = "fighting";
  $("#attack-button").attr("class", "btn btn-lg btn-danger");
}

function phaseGameOver() {
  gamePhase = "game-over";
  $("#attack-button").attr("class", "btn btn-lg btn-secondary disabled");
  $("#reset-button").attr("class", "btn btn-lg btn-success");
  $("#reset-button").show();
}

function resetGame() {

  $("#reset-button").hide();
  playerSelected = false;
  enemySelected = false;
  arrCharacters.forEach(function (value, index, arr) {
    arr[index].player = false;
    arr[index].hp = 100;
  });

  $(".card").each(function (index) {
    $(this).attr("class", "card text-black bg-white");
    $(this).attr("style", "width: 14rem;");
    $("[healthId]").text("HP: 100");
    $("[healthId]").attr("class", "card-text text-black");
    $("#player-deck").append($(this));
  });

  phaseSelectHero();
}


// **** INITIALIZE ****
$("#reset-button").hide();
gamePhase = "select-hero";
playerSelected = false;
enemySelected = false;
arrCharacters.forEach(function (value, index, arr) {
  arr[index].player = false;
});
// create character cards and append to player selection section
$.each(arrCharacters, function (index) {
  $("#player-deck").append(createCard(arrCharacters[index]));
  arrCards.push(createCard(arrCharacters[index]));

});

phaseSelectHero();

// when player selects character, move other chars to enemy section
$(".card").on("click", function () {
  console.log("test");
  switch (gamePhase) {
    case "select-hero":
      // get the character id from the card
      let selectedId = parseInt($(this).attr("fighterId"));

      // update the player's character object (player: true)
      let selectedChar = $.grep(arrCharacters, function (o) {
        return o.id == selectedId;
      });
      playerChar = selectedChar[0]; // grep returns array, so use index 0 when expecting single result
      playerChar.player = true;
      playerSelected = true;

      // for each char card, get the char object by id then do stuff...
      $(".card").each(function (index) {
        let cardId = parseInt($(this).attr("fighterId"));
        let character = $.grep(arrCharacters, function (o) {
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
      phaseSelectEnemy();
      break;

    case "select-enemy":
      // make sure the card is in the enemy section
      if (
        $(this)
        .parent()
        .attr("id") == "enemy-deck"
      ) {
        let selectedId = parseInt($(this).attr("fighterId"));
        let selectedEnemy = $.grep(arrCharacters, function (o) {
          return o.id == selectedId;
        });

        if (selectedEnemy[0].alive) {
          // valid enemy was selected
          $("#fight-deck").append($(this));
          $(this).attr("class", "card text-white bg-dark");
          $(this).attr("style", "width: 20rem;");

          enemyChar = selectedEnemy[0];

          phaseFighting();

        }
      }
      break;

    case "fighting":
      // do nothing when a card is clicked (fighting logic handled in attack button click handler)
      break;
    default:
  }
}); // close of .card on click



// attack button click 
$("#attack-button").on("click", function () {
  let playerCard = $("[fighterId='" + playerChar.id + "']");
  let enemyCard = $("[fighterId='" + enemyChar.id + "']");
  let playerHealth = $("[healthId='" + playerChar.id + "-health']")
  let enemyHealth = $("[healthId='" + enemyChar.id + "-health']")

  let attackDmg = Math.floor(Math.random() * playerChar.ap);
  console.log("player attacks " + enemyChar.name + " for " + attackDmg + " damage!");

  // apply damage to enemy: update char function?
  enemyChar.hp = enemyChar.hp - attackDmg;

  // fight logic
  if (enemyChar.hp > 0) {
    // enemey still alive, update HP text and counter attack
    enemyHealth.text("HP: " + enemyChar.hp);
    let counterDmg = Math.floor(Math.random() * enemyChar.ap);
    playerChar.hp = playerChar.hp - counterDmg;
  } else {
    // enemy is dead, update HP and style/move card 
    enemyChar.alive = false;
    enemyHealth.text("DEAD");
    enemyCard.attr("class", "card text-white bg-secondary");
    enemyCard.attr("style", "width: 14rem;")
    moveAnimate(enemyCard, "#dead-deck");

    // game moves to enemy selection phase if...
    let allDead = false;
    arrCharacters.forEach(function (v, i, a) {
      if (a[i].player == false && a[i].alive == true) {
        console.log('not all dead');
        allDead = false;
      } else {
        allDead = true;
      }
    });

    if (allDead) {
      // all enemies are dead
      console.log("all enemies dead");
      phaseGameOver();
    } else {
      // some enemies still alive
      console.log("some enemies still alive");
      phaseSelectEnemy();
    }

  }



  // if player dead
  if (playerChar.hp <= 0) {
    // game over
    playerHealth.attr("class", "card-text text-danger font-weight-bold")
    playerHealth.text("YOU DIED!");
    phaseGameOver();

  } else {
    playerHealth.text("HP: " + playerChar.hp)
  }
  // else continue...
});

$("#reset-button").on("click", function () {
  resetGame();
});

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