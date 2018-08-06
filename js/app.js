

/*
 * Create a list that holds all of your cards
 */
var icons = ["fa fa-diamond","fa fa-diamond","fa fa-paper-plane-o","fa fa-paper-plane-o","fa fa-anchor","fa fa-anchor","fa fa-leaf","fa fa-leaf","fa fa-bomb","fa fa-bomb","fa fa-bolt","fa fa-bolt","fa fa-bicycle","fa fa-bicycle","fa fa-cube","fa fa-cube"]

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const allCards = document.querySelector(".deck");

let matched = document.querySelector(".match");

let listItems = []

let matchedItems = [];

let stringMoves = document.querySelector(".moves");

let moves = stringMoves.textContent = 0;

let stars = document.getElementById("stars");

let interval;

let restart = document.querySelector(".restart");

let modalText = document.querySelector(".modalText")

let modal = document.getElementById('myModal');

document.getElementById("timer").innerHTML = "0mins 0secs"

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];




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

    return array;
}

function init() {
    shuffle(icons);
    for (icon of icons) {
        const card = document.createElement("div");
        card.classList.add('card');
        card.innerHTML = "<i class='"+ icon + "'</i>";
        allCards.appendChild(card);
    }

}

function createStars(){
    for (let i = 0; i < 3; i++) {
        const star = document.createElement("li")
         star.classList.add("fa", "fa-star")
         stars.appendChild(star);
     }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

allCards.addEventListener("click", function(e){
    if (e.target.nodeName === "DIV"){
        addMove();
        open(e)
        add(e)
        check()
        ratings();
        gameOver();
        console.log(moves);
    }  
})

// Adding Moves
function addMove() {
    moves++;
    if (moves === 1){
        Timer();
    }
    stringMoves.textContent = moves;
}
// Open the Card
function open(e) {
    if (e.target.nodeName === "DIV"){
        let card = e.target
        card.classList.add("show", "open")
    }
}

// Add Card to list
function add(e){
    if (e.target.nodeName === "DIV"){
        let card = e.target
        listItems.push(card)
        console.log(listItems)  
    }
}

// Check if two card are "Identical or Not" and Do the appropriate thing.
// I detected a bug which i can't really understand why, that when i click 3 cards really fast, and the first and last cards match, an error ocurs, the unmatched card don't go back, hence the 3rd if statement;
function check(){
    
    if((listItems.length === 2) && (listItems[0].innerHTML === listItems[1].innerHTML)) {
        listItems[0].classList.add("match")
        listItems[1].classList.add("match")
        isMatched();
        listItems = [];
    } else setTimeout(() => {
        if((listItems.length === 2) && (listItems[0].innerHTML != listItems[1].innerHTML)) {
            listItems[0].classList.remove("show", "open")
            listItems[1].classList.remove("show", "open")
            listItems = [];
        }
    }, 500);
    if (listItems.length > 2) {
        listItems[0].classList.remove("show", "open")
        listItems[1].classList.remove("show", "open")
        listItems[2].classList.remove("show", "open")
        listItems = []
    }
}

// Ratings
function ratings() {
    if (moves === 25) {
        stars.firstElementChild.remove();
    }
    if((moves >= 35) && (moves < 36)){
        stars.firstElementChild.remove();
    }
}

// GameOver: Check if the game is over.
function gameOver() {
    if (icons.length === matchedItems.length){
        clearInterval(interval)
        setTimeout(() => {
        modal.style.display = "block";
        if(stars.children.length === 1){
            modalText.innerHTML = `<p>Congratulations, You finished with ${moves} moves in ${document.getElementById("timer").innerHTML} and your rating is: <i class="fa fa-star"></i></p>`;
            }
        if(stars.children.length === 2){
                modalText.innerHTML = `<p>Congratulations, You finished with ${moves} moves in ${document.getElementById("timer").innerHTML} and your rating is: <i class="fa fa-star"></i> <i class="fa fa-star"></i></p>`;
            }
        if(stars.children.length === 3){
            modalText.innerHTML = `<p>Congratulations, You finished with ${moves} moves in ${document.getElementById("timer").innerHTML} and your rating is: <i class="fa fa-star"></i><i class="fa fa-star"> </i><i class="fa fa-star"></i></p>`;
            }
        }, 500);
        stringMoves.textContent = "You finished with " + moves;
    }
}

function isMatched() {
    matchedItems.push(listItems[0]);
    matchedItems.push(listItems[1]);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// Restart the game.
restart.addEventListener("click", function(){
    allCards.innerHTML = "";
    init();
    listItems = [];
    matchedItems = [];
    moves = 0;
    stringMoves.textContent = moves
    stars.innerHTML = ""
    createStars();
    ratings();
    clearInterval(interval)
    document.getElementById("timer").innerHTML = `0mins 0secs`
});
//  Start for the first time.
init();

// My Timer:

function Timer(){
        var h = 00
        var m = 00
        var s = 00
    interval = setInterval( function() {
        s++
        if (s == 60) {
            m++
            s = 0
        }
        if (m == 60) {
            h++
            m = 0
        }
        document.getElementById("timer").innerHTML = `${m}mins ${s}secs`
    }, 1000);
}