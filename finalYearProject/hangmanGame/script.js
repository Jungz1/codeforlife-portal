//retrieves elements from HTML
const chosenWord = document.getElementById('word');
const wrongGuesses = document.getElementById('wrong-letters');
const replayButton = document.getElementById('play-button');
const guessPopup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts= document.querySelectorAll(".figure-part");

const words = ['recursion', 'programming', 'interface', 'while', 'loop', 'python', 'javascript'];
const hints = ['to call a function within itself', 'The act of development', 'Users interact with ...', 'A type of loop', 'recuring code', 'popular programming language', 'programming for web'];
const topic = ['recursion', 'definitions', 'GUI', 'loops', 'programming paradigms', 'programming languages', 'programming languages'];

let num = Math.floor(Math.random() * words.length);
let selectedWord = words[num];
let selectedHint = hints[num];
let selectedTopic = topic[num];

const correctLetters = [];
const wrongLetters = [];

document.getElementById("hint").innerHTML = selectedHint;
//Show hidden word
function displayWord(){
    chosenWord.innerHTML = `
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>  `
    )
    .join('')}
    `;
    //cleans string
    const innerWord = chosenWord.innerText.replace(/\n/g, '');
    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congratulations! You got the word';
        guessPopup.style.display= 'flex';
    }
}
// Update the wrong letters
function updateWrongGuesses(){
    //Displays the wrong letters
    wrongGuesses.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}`;
    //Display hangman parts
    figureParts.forEach((part,index) => {
        const errors = wrongLetters.length;
        if(index < errors) {
            part.style.display = 'block'
        }
        else{
            part.style.display = 'none';
        }
    });
    //Checks if player has lost depending on hangman parts
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = `You should work on ${selectedTopic}`;
        guessPopup.style.display = 'flex';
    }
}
function showNotification(){
    //tells user if they have already made the same guess before
    notification.classList.add('show');
}
//Keydown letter press
window.addEventListener('keydown', e =>{
    //checks the button pressed is a letter before checking word
    if(e.keyCode >= 65 && e.keyCode <=90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            //if the letter is in the word
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            } else{
                //calls notification if the letter has already been guessed
                showNotification();
            }
        } else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                //adds letter to wrong guesses list
                updateWrongGuesses();
            } else{
                showNotification();
            }
        }
    }
});
//Restarts game and variables
replayButton.addEventListener('click', () => {
    //Emptys arrays of correct and wrong guesses
    correctLetters.splice(0);
    wrongLetters.splice(0);
    //restarts word,hint and topic
    num = Math.floor(Math.random() * words.length);
    selectedWord = words[num];
    selectedHint = hints[num];
    selectedTopic = topic[num];
    displayWord();
    document.getElementById("hint").innerHTML = selectedHint;
    updateWrongGuesses();
    guessPopup.style.display = 'none';
});

displayWord();