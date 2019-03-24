var characterArray = [
    {
        word: "coon",
        image1: "assets/images/the-coon.png",
        image2: "assets/images/the-coon1.png"
    },
    {
        word: "kenny",
        image1: "assets/images/kenny.png",
        image2: "assets/images/kenny1.png"
    },
    {
        word: "stan",
        image1: "assets/images/stan.png",
        image2: "assets/images/stan1.png"
    },
    {
        word: "cartman",
        image1: "assets/images/cartman.png",
        image2: "assets/images/cartman1.png"
    },
    {
        word: "liane",
        image1: "assets/images/liane.png",
        image2: "assets/images/liane1.png"
    },
    {
        word: "sharon",
        image1: "assets/images/sharon.png",
        image2: "assets/images/sharon1.png"
    }]

    


var gameStatus = false;

var randomNumber = Math.floor(Math.random() * characterArray.length);

var character = characterArray[randomNumber].word;
var characterImage1 = characterArray[randomNumber].image1
var characterImage2 = characterArray[randomNumber].image2

var lettersRemaining = character.length;

var answerArray = []; 


document.addEventListener("keyup", function(event){
    if(gameStatus) {
        letterCheck(event);
    } else {
        init();
    }
});

var alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function letterCheck(guess) {
    if (alphabetArray.indexOf(guess.key) > -1) {
        correctGuessCheck(guess);
    }
}

var winScore = 0;
function correctGuessCheck(guess) {
    if (character.indexOf(guess.key) > -1) {
        correctGuess(guess);
    } else {
        incorrectGuess(guess);
    }
}

function correctGuess(guess) {
    if (answerArray.indexOf(guess.key.toUpperCase()) < 0) {
        addCorrectLetter(guess);
    }
}

function addCorrectLetter(guess) {
    for (var j = 0; j < character.length; j++) {
        if (guess.key === character[j]) {
            answerArray[j] = guess.key.toUpperCase();
            displayCurrentWord();
            lettersRemaining--;
            if (lettersRemaining === 0) {
                winScore++;
                displayWins();
                changeImage();
                addCorrect();
                displayCurrentWord();
            }
        }
    }
}

var incorrectGuessesMade = [];
var guessesLeft = 9;

function incorrectGuess(guess) {
    if (incorrectGuessesMade.indexOf(guess.key.toUpperCase()) < 0) {
        addIncorrectLetter(guess);
    }
}

function addIncorrectLetter(guess) {
    incorrectGuessesMade.push(guess.key.toUpperCase());
    displayGuessesMade();
    guessesLeft--;
    displayGuessesLeft();
    if (guessesLeft === 0) {
        changeImage();
        displayAnswer();
    }
}

function displayWins() {
    var winsDisplay = document.querySelector("#winsDisplay");
    winsDisplay.textContent = winScore;
}

function displayGuessesMade() {
    var guessesMadeDisplay = document.querySelector("#guessesMadeDisplay");
    guessesMadeDisplay.textContent = incorrectGuessesMade.join(", ");
}

function displayGuessesLeft() {
    var guessesLeftDisplay = document.querySelector("#guessesLeftDisplay");
    guessesLeftDisplay.textContent = guessesLeft;
}

function displayCurrentWord() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.innerHTML = answerArray.join(" ");
}

function displayImage() {
    var pictureDisplay = document.querySelector("#pictureDisplay");
    pictureDisplay.src = characterImage1;
}

function changeImage() {
    var pictureDisplay = document.querySelector("#pictureDisplay");
    pictureDisplay.src = characterImage2;
    gameStatus = false;
}

function displayAnswer() {
    var revealedAnswerDisplay = document.querySelector("#revealedAnswerDisplay");
    revealedAnswerDisplay.textContent = character.toUpperCase();
}

function addCorrect() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.classList.add('correct');
}

function removeCorrect() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.classList.remove('correct');
}



function init() {
    gameStatus = true;
    
    randomNumber = Math.floor(Math.random() * characterArray.length);
    
    character = characterArray[randomNumber].word;
    characterImage1 = characterArray[randomNumber].image1
    characterImage2 = characterArray[randomNumber].image2

    lettersRemaining = character.length;

     answerArray = []; 

    for (var i = 0; i < character.length; i++) {
        if (character[i] === "+") {
            answerArray[i] = "&nbsp;";
        } else {
            answerArray[i] = "_";
        }
    }

    lettersRemaining = character.length;

    guessesLeft = 9;
    displayGuessesLeft()

    incorrectGuessesMade = [];
    displayGuessesMade()
    
    displayCurrentWord();

    displayImage();

    revealedAnswerDisplay.textContent = "";



    removeCorrect();
}