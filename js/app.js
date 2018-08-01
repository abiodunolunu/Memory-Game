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

 shuffle(icons)

const allCards = document.querySelector(".deck");

var listItems = []

for (icon of icons) {
    const card = document.createElement("div");
    card.classList.add('card');
    card.innerHTML = "<i class='"+ icon + "'</i>";
    allCards.appendChild(card);
}

allCards.addEventListener("click", function(e){
    if (e.target.nodeName === "DIV"){
        open(e)
        add(e)
    }
    
})

function open(e) {
    if (e.target.nodeName === "DIV"){
        let card = e.target
        card.classList.add("show")
    }
}

function add(e){
    if (e.target.nodeName === "DIV"){
        let card = e.target
        listItems.push(card)
        if ((listItems.length === 2) && (listItems[0].innerHTML === listItems[1].innerHTML)){
            for (listItem of listItems){
                listItem.classList.add("open")
            }
        }
    }
}





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