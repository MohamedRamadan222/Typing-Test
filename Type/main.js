const words = [
  "Java",
  "Dart",
  "flutter",
  "array",
  "object",
  "string",
  "boolean",
  "number",
  "pugs",
  "null",
  "loop",
  "full",
  "ahmed",
  "argument",
  "method",
  "class",
  "cool",
  "css",
  "event",
  "One",
];

// Setting Levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// Default Level
let defaultLevelName = "Easy"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];

// Catch Selectors

let StartButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upComingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// Setting level Name + Seconds + Score

lvlNameSpan.innerHTML = defaultLevelName;
secondSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable Past Event
input.onpaste = function () {
  return false;
};

// Start game

StartButton.onclick = function () {
  this.remove();
  input.focus();
  genWords();

  // Generate Word Function
};

function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];

  // Get Word Index
  let wordIndex = words.indexOf(randomWord);

  // Remove Word From Array
  words.splice(wordIndex, 1);

  // Show The Random Word
  theWord.innerHTML = randomWord;

  // Empty Upcoming Words
  upComingWords.innerHTML = "";

  // Generate Words
  for (let i = 0; i < words.length; i++) {
    // Create div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upComingWords.appendChild(div);
  }
  // Call Stsart Play Function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLocaleLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // Call Generate Word Function
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "Good";
          let spanText = document.createTextNode("أحسنت");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Remove Upcoming Box
          upComingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}
