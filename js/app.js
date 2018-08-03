

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

 

var finalScore = 0;
const allCards = document.querySelector(".deck");

var matched = document.querySelector(".match");

var listItems = []

var matchedItems = [];

var stringMoves = document.querySelector(".moves");

var moves = Number(stringMoves.textContent = 0);

var stars = document.getElementById("stars");



var restart = document.querySelector(".restart");
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
        createStars();

}

function createStars(){
    for (let i = 0; i < 3; i++) {
        const star = document.createElement("li")
         star.classList.add("fa", "fa-star")
         stars.appendChild(star);
     }
}


allCards.addEventListener("click", function(e){
    if (e.target.nodeName === "DIV"){
        addMove();
        open(e)
        add(e)
        check()
        numberOfMoves();
        gameOver();
        console.log(moves);
    }  
})

function addMove() {
    moves++;
    stringMoves.textContent = moves;
}

function open(e) {
    if (e.target.nodeName === "DIV"){
        let card = e.target
        card.classList.add("show", "open")
    }
}

function add(e){
    if (e.target.nodeName === "DIV"){
        let card = e.target
        listItems.push(card)
        console.log(listItems)  
    }
}

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
        listItems[2].classList.remove("show", "open")
        listItems[1].classList.remove("show", "open")
        listItems = []
    }
}

function numberOfMoves() {
    
    finalScore = moves;
    if ((finalScore >= 24) && (finalScore <= 25)){
        stars.removeChild(stars.childNodes[0]);
    }
    else if((finalScore >= 35) && (finalScore <=36)){
        stars.removeChild(stars.childNodes[0]);
    }
    else if (finalScore >= 50){
        stars.removeChild(stars.childNodes[0]);
        stars.textContent = "NO STARS"
    }
}

function gameOver() {
    if (icons.length === matchedItems.length){
        setTimeout(() => {
            alert(stringMoves.textContent = "You finished with " + finalScore + " moves");
        }, 500);
    }
}

function isMatched() {
    matchedItems.push(listItems[0]);
    matchedItems.push(listItems[1]);
}

restart.addEventListener("click", function(){
    allCards.innerHTML = "";
    init();
    listItems = [];
    matchedItems = [];
    moves = 0;
    stars.innerHTML = ""
    createStars();
    numberOfMoves();
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

    return array;
}
init();

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