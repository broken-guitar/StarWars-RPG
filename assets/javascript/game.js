// ** VARIABLES **

var arrCharacters = [];
var arrCards = [];

var playerSelected = false;
var enemySelected = false;
var gamePhase = "";
var gameWon = false;
var defaultMessageClass = "h3 d-inline-block align-middle ml-3";

var playerChar = {};
var enemyChar = {};

var messageTimeout;

// character object constructor 
var Character = function (id, name, img, baseHp, gameHp, baseAp, gameAp, cap, player, alive) {
  this.id = id; // unique char id
  this.name = name; // char name string
  this.img = img; // image url for char
  this.baseHp = baseHp; // base health points integer
  this.gameHp = gameHp; // running health points integer
  this.baseAp = baseAp; // base attack power integer
  this.gameAp = gameAp; // running attack power integer
  this.cap = cap; // counter attack power integer
  this.player = player; // player selected boolean
  this.alive = alive; // still alive boolean
};



var fighter1 = new Character(
  1,
  "Baby Yoda",
  "assets/images/baby-yoda.jpg",
  100, 100,
  20, 20,
  20,
  false,
  true
);
var fighter2 = new Character(
  2,
  "Chewbacca",
  "assets/images/chewbacca.jpg",
  150, 150,
  25, 25,
  25,
  false,
  true
);
var fighter3 = new Character(
  3,
  "Mickey",
  "assets/images/lucasfilm.jpg",
  75, 75,
  50, 50,
  75,
  false,
  true
);
var fighter4 = new Character(
  4,
  "Jawas",
  "assets/images/jawas.jpg",
  80, 80,
  30, 30,
  30,
  false,
  true
);

// add all characters to the character array
arrCharacters.push(fighter1, fighter2, fighter3, fighter4);

// FUNCTIONS

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
    healthId: character.id,
    class: "card-text",
    text: "HP: " + character.gameHp
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

function animateStat($element, dmgVal) {
  let $dmgStat = $("<span>");
  $dmgStat.attr({
    "class": "dmg-stat h1 text-danger"
  }).text("-" + dmgVal);
  $dmgStat.css({
    "position": "absolute",
    "top": "50%",
    // "display": "inline-block",
    "left": "50%",
    "height": "100px",
    "width": "100px",
    "margin-left": "-50px",
    "margin-top": "-50px",
    "z-index": 100
  });
  $element.append($dmgStat);
  $dmgStat.animate({
    "top": "100%",
    "opacity": "0%"
  }, 2000, "swing", function () {
    console.log("animate done");
  });
  $dmgStat.fadeOut(400, function () {
    console.log("removed");
    $dmgStat.remove();
  });
  console.log("following animate call");




}


function phaseSelectHero() {
  gamePhase = "select-hero";
  $("#attack-button").attr("class", "btn btn-lg btn-secondary disabled");
  $("#game-message").attr("class", defaultMessageClass + " text-warning");
  $("#game-message").text("Select your hero");
}

function phaseSelectEnemy() {
  gamePhase = "select-enemy";
  $("#attack-button").attr("class", "btn btn-lg btn-secondary disabled");
  $("#game-message").attr("class", defaultMessageClass + " text-secondary");
  $("#game-message").text("Select your opponent");
}

function phaseFighting() {
  gamePhase = "fighting";
  $("#attack-button").attr("class", "btn btn-lg btn-danger");
  $("#game-message").attr("class", defaultMessageClass + " text-danger");
  $("#game-message").text("Fight!");
}

function phaseGameOver(won) {
  gamePhase = "game-over";
  $("#attack-button").attr("class", "btn btn-lg btn-secondary disabled");
  $("#reset-button").attr("class", "btn btn-lg btn-success");
  if (won) {
    $("#game-message").attr("class", defaultMessageClass + " text-success");
    $("#game-message").text("You Win! Press Reset to start over.");
  } else {
    $("#game-message").text("You Lose!");
    messageTimeout = setTimeout(function () {
      $("#game-message").attr("class", defaultMessageClass + " text-danger");
      $("#game-message").text("Game Over. Press Reset to start over.");
    }, 1000);
  }
  $("#reset-button").show();
}

function resetGame() {
  $(".dmg-stat").remove();
  $("#reset-button").hide();
  playerSelected = false;
  enemySelected = false;
  arrCharacters.forEach(function (value, i, arr) {
    arr[i].alive = true;
    arr[i].player = false;
    arr[i].gameHp = arr[i].baseHp;
    arr[i].gameAp = arr[i].baseAp;
    $("[healthId='" + arr[i].id + "']").text("HP: " + arr[i].gameHp);
  });

  $(".card").each(function (index) {
    let cardId = $(this).attr("id");
    let foundIndex = arrCharacters.findIndex(function (c, i, arr) {
      return c.id == cardId;
    });
    $(this).attr("class", "card text-black bg-white");
    $(this).attr("style", "width: 14rem;");
    $("[healthId]").attr("class", "card-text text-black");
    $("#player-deck").append($(this));
  });
  clearTimeout(messageTimeout);
  phaseSelectHero();
}


// **** INITIALIZE ****
$("#reset-button").hide();
gamePhase = "select-hero";
playerSelected = false;
enemySelected = false;
arrCharacters.forEach(function (value, i, arr) {
  arr[i].player = false;
  arr[i].alive = true;
});
// create character cards and append to player selection section
$.each(arrCharacters, function (index) {
  $("#player-deck").append(createCard(arrCharacters[index]));
  arrCards.push(createCard(arrCharacters[index]));

});

phaseSelectHero();

// when player selects character, move other char cards to enemy section
$(".card").on("click", function () {
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

      // for each char card, get the char object (from character array) by id then do stuff...
      $(".card").each(function (index) {
        let cardId = parseInt($(this).attr("fighterId"));
        let card = $(this)
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
          // ...then move cards to enemy section, and update style
          // $("#enemy-deck").append($("[fighterId='" + cardId + "']"));
          $(this).attr("class", "card text-white bg-danger");

          moveAnimate(card, "#enemy-deck");

        } else {
          $(this).attr("class", "card bg-white");
          $(this).attr("style", "width: 20rem;");
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
          $(this).attr("class", "card text-white bg-dark");
          $(this).attr("style", "width: 20rem;");
          setTimeout(moveAnimate($(this), "#fight-deck"), 1000);
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

  if (gamePhase !== "fighting") {
    return;
  }

  let playerCard = $("[fighterId='" + playerChar.id + "']");
  let enemyCard = $("[fighterId='" + enemyChar.id + "']");
  let playerHealth = $("[healthId='" + playerChar.id + "']")
  let enemyHealth = $("[healthId='" + enemyChar.id + "']")

  let attackDmg = Math.floor(Math.random() * playerChar.gameAp);

  console.log("player attacks " + enemyChar.name + " for " + attackDmg + " damage!");

  // apply damage to enemy
  enemyChar.gameHp = enemyChar.gameHp - attackDmg;
  playerChar.gameAp++;
  // animate stat changes during fight
  animateStat(enemyCard, attackDmg);

  // check if enemy is still alive
  if (enemyChar.gameHp > 0) {
    // enemey still alive,
    // disable Attack button during counter attack
    gamePhase = "counter-attack";
    $("#attack-button").attr("class", "btn btn-lg btn-secondary disabled");
    $("#game-message").attr("class", defaultMessageClass + " text-danger");
    $("#game-message").text("Enemy strikes back!");
    // update enemy stats... 
    enemyHealth.text("HP: " + enemyChar.gameHp);
    //    ...and do counter attack

    delayCounterAttack = setTimeout(function () {
      let counterDmg = Math.floor(Math.random() * enemyChar.cap);
      playerChar.gameHp = playerChar.gameHp - counterDmg;
      animateStat(playerCard, counterDmg);
      gamePhase = "fighting"
      $("#attack-button").attr("class", "btn btn-lg btn-danger");
      $("#game-message").attr("class", defaultMessageClass + " text-danger");
      $("#game-message").text("Fight!");
    }, 1000);

  } else {
    // enemy is dead
    //    update enemy status and style/move card 
    enemyChar.alive = false;
    enemyHealth.text("DEAD");
    enemyCard.attr("class", "card text-white bg-secondary");
    enemyCard.attr("style", "width: 14rem;")
    moveAnimate(enemyCard, "#dead-deck");

    // check if all enemies are dead
    let allDead = true;
    arrCharacters.forEach(function (v, i, a) {
      if (v.player == false && v.alive == true) {
        console.log("alldead: ", v.name, v.alive);
        allDead = false;
      }
    });

    if (allDead) {
      // all enemies are dead, user won
      gameWon = true;
      phaseGameOver(gameWon);
    } else {
      // enemies still alive, user selects next enemy
      phaseSelectEnemy();
    }
  }

  // if player dead
  if (playerChar.gameHp <= 0) {
    // game over
    clearTimeout(delayCounterAttack);
    playerHealth.attr("class", "card-text text-danger font-weight-bold")
    playerHealth.text("YOU DIED!");
    gameWon = false;
    phaseGameOver(gameWon);
  } else {
    playerHealth.text("HP: " + playerChar.gameHp)
  }
  // else continue...
});

$("#reset-button").on("click", function () {
  resetGame();
});