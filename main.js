// Game Configuration
const letters = "abcdefghijklmnopqrstuvwxyz";
const lettersArray = Array.from(letters);
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
};

// DOM Elements
const lettersContainer = document.querySelector(".letters");
const categorySpan = document.querySelector(".category span");
const lettersGuessContainer = document.querySelector(".letters-guess");
const hangmanDraw = document.querySelector(".hangman-draw");
const gameOverDiv = document.querySelector(".game-over");
const playAgainBtn = document.querySelector(".play-again");

// Game Variables
let wrongAttempts = 0;
let correctAttempts = 0;
let chosenWord = "";

// Initialize Game
function initializeGame() {
    // Reset game state
    wrongAttempts = 0;
    correctAttempts = 0;
    hangmanDraw.className = 'hangman-draw';
    gameOverDiv.textContent = '';
    gameOverDiv.className = 'game-over';
    playAgainBtn.style.display = 'none';
    lettersContainer.innerHTML = '';
    lettersGuessContainer.innerHTML = '';

    // Generate letters
    lettersArray.forEach(letter => {
        const span = document.createElement("span");
        span.appendChild(document.createTextNode(letter));
        span.className = 'letter-box';
        lettersContainer.appendChild(span);
    });

    // Select random word
    const allKeys = Object.keys(words);
    const randomPropNumber = Math.floor(Math.random() * allKeys.length);
    const randomPropName = allKeys[randomPropNumber];
    const randomPropValue = words[randomPropName];
    const randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
    chosenWord = randomPropValue[randomValueNumber].toLowerCase();

    // Set category
    categorySpan.innerHTML = randomPropName;

    // Create guess spaces
    const lettersAndSpace = Array.from(chosenWord);
    lettersAndSpace.forEach(letter => {
        const emptySpan = document.createElement("span");
        if (letter === ' ') {
            emptySpan.className = 'with-space';
            correctAttempts++;
        }
        lettersGuessContainer.appendChild(emptySpan);
    });
}

// Handle Letter Click
function handleLetterClick(e) {
    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked");
        const clickedLetter = e.target.innerHTML.toLowerCase();
        const wordLetters = Array.from(chosenWord.toLowerCase());
        const guessSpans = document.querySelectorAll(".letters-guess span");
        let letterFound = false;

        wordLetters.forEach((wordLetter, letterIndex) => {
            if (clickedLetter === wordLetter) {
                letterFound = true;
                correctAttempts++;
                guessSpans[letterIndex].innerHTML = clickedLetter;
            }
        });

        if (!letterFound) {
            wrongAttempts++;
            hangmanDraw.classList.add(`wrong-${wrongAttempts}`);
            if (wrongAttempts === 8) {
                endGame(false);
            }
        } else if (correctAttempts === wordLetters.length) {
            endGame(true);
        }
    }
}

// End Game
function endGame(isWin) {
    lettersContainer.classList.add("finished");
    
    if (isWin) {
        gameOverDiv.textContent = "Congratulations! You Won!";
        gameOverDiv.classList.add("win");
    } else {
        gameOverDiv.textContent = `Game Over! The word was: ${chosenWord}`;
        gameOverDiv.classList.add("lose");
    }
    
    playAgainBtn.style.display = 'block';
}

// Event Listeners
lettersContainer.addEventListener('click', handleLetterClick);
playAgainBtn.addEventListener('click', initializeGame);

// Start the game for the first time
initializeGame();
