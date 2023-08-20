const cardElements = document.querySelectorAll(".grid-item");
let cards = new Map();
let nums = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let start = false

// shuffles arr of nums
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};
shuffleArray(nums);
// maps elements to certain numbers
for (i = 0; i < 16; i++) {
  cards.set(cardElements[i], nums[i]);
}

let flippedCards = new Array();
let matchingCards = new Array();

var sec = 0;
function pad(val) { return val > 9 ? val : "0" + val; }
// runs the function every second displays time
setInterval(function () {
  if (matchingCards.length == 16) { return }
  else if (start) {
    document.getElementById("seconds").innerHTML = pad(++sec % 60);
    document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10) % 60);
    document.getElementById("hours").innerHTML = pad(parseInt(sec / 3600, 10));
  }

}, 1000);

// put an event listener on all the cards
cardElements.forEach((element) => {
  element.addEventListener("click", function (element) {
    turnOver(element.target);
  });
});

// checks if the last two cards are the same
function checkCards() {
  let pair = flippedCards.slice(-2);
  console.log(pair[0] == pair[1])
  if (pair[0] == pair[1]) {

    return 0

  }

  else if (cards.get(pair[0]) == cards.get(pair[1])) {

    return 1;
  }

  return 2;
}

// take the last two elements from flipped cards
// and flip them back
function flipCards() {
  array = flippedCards.splice(-2);

  for (i = 0; i < 2; i++) {
    array[i].innerText = `  Hidden  `;
    array[i].clickable = "1"
    flippedCards.pop();
  }
}

// stops all funtions form time 
// runs flip cards
function timeout(time) {
  setTimeout(flipCards, time);
}


function turnOver(element) {
  start = true


  if (element.getAttribute("clickable") == "1") {

    element.innerText = `  ${cards.get(element)}  `;
    flippedCards.push(element);
    element.clickable = "0"
    console.log(element.getAttribute("clickable"))

    if (flippedCards.length % 2 === 0) {

      SameCards = checkCards();

      if (SameCards == 2) {
        timeout(1000);
      }
      else if (SameCards == 1) {
        array = flippedCards.splice(-2);
        for (i = 0; i < 2; i++) {
          matchingCards.push(array[i])
        }
        flippedCards.splice(flippedCards.length - 2, 2);
      }
      else if (SameCards == 0) {
        flippedCards.pop()
      }

    }
  }




  console.log(matchingCards, flippedCards)
}




// restarts the game 
function restart() {
  start = false // timer stops
  sec = 0 // timer reset 
  flippedCards = new Array()
  matchingCards = new Array()
  document.getElementById("seconds").innerHTML = ''
  document.getElementById("minutes").innerHTML = ''
  document.getElementById("hours").innerHTML = ''
  shuffleArray(nums)
  cards = new Map()
  for (i = 0; i < 16; i++) {
    cardElements[i].innerText = ' hidden '
    cardElements[i].clickable = "1"
    cards.set(cardElements[i], nums[i]);
  }

}
