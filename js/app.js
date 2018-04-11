/*
 * Gobal variables
 */

let cardsPool = [];
let moves = 0;
let starCount = 3;
const loseStar = document.querySelector('.stars');
const cardsDeck = document.querySelector('.deck');
const restartGame = document.querySelector('.restart');
const playAgain = document.querySelector('#playAgain');
const losePlayAgain = document.querySelector('#losePlayAgain');
const startTheGame = document.querySelector('#startTheGame');
const timeLeft = document.querySelector('.timeLeft');
// List of cards
let cards = ['01', '01', '02', '02', '03', '03', '04', '04', '05', '05', '06', '06', '07', '07', '08', '08'];

/*
 * Game functions
 */

// Collection of listeners to start or restart the game
restartGame.addEventListener('click', function() {
  location.reload();
});

playAgain.addEventListener('click', function() {
  location.reload();
});

losePlayAgain.addEventListener('click', function() {
  location.reload();
});

startTheGame.addEventListener('click', function() {
  console.log("start");
  let start = document.querySelector('#instructionsDiv');
  start.setAttribute('style', 'display: none;')

  // Set timer
  let seconds = 60;
  let stopTime;
  //make the variable stopTime global
  window.stopTime = setInterval(timer, 1000);

  function timer() {
    seconds -=1;
    // If the time is over stop the timer and end the game
    if (seconds == 0){
      clearInterval(stopTime);
      loseGame();
    }

    // Show the left time in the score-panel
    timeLeft.innerHTML = seconds;
  }
});


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  // Insert the cards in the page
  const insertCards = document.querySelector('.deck');

  for (let i = 0; i < 16; i++) {
    let oneCard = document.createElement('li');
    oneCard.classList.add('card');
    let oneImg = document.createElement('img');
    oneImg.setAttribute('src', 'img/' + array[i] + ".jpg");
    oneImg.setAttribute('style', 'display: none;');
    oneImg.setAttribute('class', 'fa;');
    oneCard.append(oneImg);
    insertCards.append(oneCard);
  }
}

// Listener for the cards. If any is clicked send it to showCard function
function clickedCard() {
  cardsDeck.addEventListener('click', function (card) {
  showCard(card);
  });
}

// Show the clicked card
function showCard(card) {
  // Get card class to show the symbol
  let showCardSymbol = card.target;
  showCardSymbol = showCardSymbol.firstElementChild.classList;

  // Check that an li element was clicked and not just a white space in the UL element
  if (card.target && card.target.matches("li.card")) {
    //add new classes to show the cards
    card.target.firstElementChild.setAttribute ('style','display: true;');
    card.target.firstElementChild.setAttribute ('class','image open show');

    // Get the card name
    let cardId = card.target.firstElementChild.getAttribute ('src');

    // Send the card name to put them in the pile
    openedCards(cardId);
  }
}

// Evaluate the selected cards
function openedCards(showCardSymbol) {

  // Prevent to be opened more than 2 cards at a time
  let searchOpenedCards = document.querySelectorAll('.open');

  if (searchOpenedCards.length > 2){
    searchOpenedCards[2].setAttribute ('style','display: none;')
  }

  // Receive the card class and push its name
  for (let i = 0; i < 1; i++) {
    // Take the last class of the card
    cardsPool.push(showCardSymbol[5]);

    // Evaluate if there are two cards in the pool and if they are the equal run the code if
    if (cardsPool.length == 2 && cardsPool[0] == cardsPool[1]) {
      // Clean up the pool
      cleanUpCardsPool();
      keepCards();
    }
    // If there are two cards in the pool but they are not equal
    else if (cardsPool.length == 2) {
      // Clean up the pool
      cleanUpCardsPool();
      setTimeout(turnBackCards, 900);
    }
    // If have been selected just one card go on and do nothing
    else {
    }
  }
}

// Clean up the pool
function cleanUpCardsPool(){
  cardsPool = [];
}

// Turn back the opened cards
function turnBackCards(card) {
  // Select the opened cards
  let turnCards = document.getElementsByClassName('open');
  
  // Turn the cards back
  for (let i = 0; i < 2; i++) {
    turnCards[0].setAttribute ('style','display: none;');
    turnCards[0].classList.remove ('open', 'show');
  }

  // Call the userMoves function
  userMoves();
}

// Keep card opened if they match
function keepCards() {
  // Select the opened cards
  let keepCards = document.getElementsByClassName('open');

  // Mark the cards as matched
  for (let i = 0; i < 2; i++) {
      keepCards[i].classList.add ('match');
  }

  // Remove classes open show
  for (let i = 0; i < 2; i++) {
    keepCards[0].classList.remove ('open', 'show');
  }

  // Call the userMoves function
  userMoves();

  // If all the cards match, finish the game
  let matched = document.querySelectorAll('.match');
  if (matched.length == 16){
    winGame();
  }
}

// Count user's moves
function userMoves() {
  let setMoves = document.querySelector('.moves');
  moves += 1;
  // Add 1 move
  setMoves.textContent = moves;

  if (moves == 12) {
    loseStars();
  }
  else if (moves == 16) {
    loseStars();
  }
  else if (moves == 20) {
    clearInterval(stopTime);
    loseStars();
    loseGame();
  }
}

// Remove stars
function loseStars() {
  const star = document.querySelector('.stars');
  starCount -= 1;

  star.firstElementChild.remove();
  if (starCount == 0) {
    setTimeout(loseGame,1000);
  }
}

// If all the cards match finish the game
function winGame() {
  // Stop timer
  clearInterval(stopTime);

  // Get and show the time, moves and stars
  let yourMoves = document.querySelector('#yourMoves');
  let getMoves = document.querySelector('.moves').innerHTML;
  yourMoves.textContent = "Your moves: " + getMoves;

  let yourTime = document.querySelector('#yourTime');
  let getTime = document.querySelector('.timeLeft').innerHTML;
  yourTime.textContent = "Your time: " + (60 - getTime) + " seconds";

  let yourStars = document.querySelector('#yourStars');
   yourStars.textContent = "Your stars: " + starCount;
  let showMessage = document.querySelector('#winnerDiv');
  showMessage.setAttribute('style', 'display: inline-block;');
}

// If not all the cards match and there is no time left or no moves left finish the game
function loseGame() {
  // Stop timer
  clearInterval(stopTime);

  let yourMoves = document.querySelector('#loseYourMoves');
  let getMoves = document.querySelector('.moves').innerHTML;
  yourMoves.textContent = "Your moves: " + getMoves;

  let loseYourTime = document.querySelector('#loseYourTime');
  let getTime = document.querySelector('.timeLeft').innerHTML;
  loseYourTime.textContent = "Your time: " + (60 - getTime) + " seconds";

  let yourStars = document.querySelector('#loseYourStars');
  //let getStars = document.querySelector('.stars').innerHTML;
   yourStars.textContent = "Your stars: " + starCount;
  let showMessage = document.querySelector('#loseGameDiv');
  showMessage.setAttribute('style', 'display: inline-block;');
}

// Call the clickedCard function to listen for click on the cards
clickedCard();

// Shuffle the cards
shuffle(cards);
