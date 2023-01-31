const cardElements = document.querySelectorAll(".grid-item");
let cards = new Map();
let nums = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

shuffleArray(nums);

for (i = 0; i < 16; i++) {
  cards.set(cardElements[i], nums[i]);
}

let flippedCards = [];
let matchingCards = [];

function checkCards(flippedcards) {
  let pair = flippedcards.slice(-2);
  let card0 = cards.get(pair[0]);
  let card1 = cards.get(pair[1]);
  if (card0 == card1) {
    return true;
  }

  return false;
}

function flipCards() {
  array = flippedCards.splice(-2);

  for (i = 0; i < 2; i++) {
    array[i].innerText = `  Hidden  `;
    flippedCards.pop();
  }
}

function timeout() {
  setTimeout(flipCards, 1000);
}

function clickable() {
  if (flippedCards.length % 2 != 0 || flippedCards.length === 0) {
    return true;
  }
  return false;
}

function turnOver(element) {
  if (!clickable()) {
    return;
  } else {
    element.innerText = `  ${cards.get(element)}  `;
    flippedCards.push(element);
    if (flippedCards.length % 2 === 0) {
      console.log(flippedCards.length);
      bool = checkCards(flippedCards);
      if (!bool) {
        timeout();
      } else {
        matchingCards.push(flippedCards[-1]);
        matchingCards.push(flippedCards[-2]);
        flippedCards.splice(flippedCards.length - 2, 2);
      }
    }
  }
}

cardElements.forEach((element) => {
  element.addEventListener("click", function () {
    turnOver(element);
  });
});
