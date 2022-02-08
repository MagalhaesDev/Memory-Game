const FRONT = "card_front";
const BACK = "card_back";
const ICON = "icon";

startGame()


function startGame(){
    document.getElementById("ul-ranking").innerHTML = localStorage.getItem("inputRanking")
    initializeCards(game.cardGame());
}

function initializeCards(cards){
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";
    for(let card of cards){
        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add("card");

        cardContent(card, cardElement);

        cardElement.addEventListener("click", flipCard);
        gameBoard.append(cardElement);
    }
}

function cardContent(card, cardElement){
    cardFrontAndBack(FRONT, card, cardElement);
    cardFrontAndBack(BACK, card, cardElement)
}

function cardFrontAndBack(face, card, cardElement){
    const divChild = document.createElement("div");
    divChild.classList.add(face);
    if(face === FRONT){
        const imgCard = document.createElement("img");
        imgCard.classList.add(ICON);
        imgCard.src = "./images/" + card.icon + ".png";
        divChild.appendChild(imgCard);
    }else{
        divChild.innerHTML = "&lt/&gt";
    }
    cardElement.appendChild(divChild);
}

function flipCard(){
    if(game.cardFlipContent(this.id)){
    this.classList.add("flip");

    if(game.secondCard){
        game.movementCounter();
        if(game.checkGame()){
            game.resetCard();
            if(game.endGame()){
               let gameOver = document.getElementById("gameOver");
               let counter = document.getElementById("counter");
               gameOver.style.display = "flex";
               counter.innerHTML = "Contador de Movimentos: " + game.movementCounter();
            }
        }else{
           setTimeout(() => {

            let firstCardView = document.getElementById(game.firstCard.id);
            let secondCardView = document.getElementById(game.secondCard.id);

            firstCardView.classList.remove("flip");
            secondCardView.classList.remove("flip");
            game.unFlipCard();

           }, 1000);
        }
    }
    }
}

function restart(){
    game.updateRanking();
    gameBoard.innerHTML = "";
    game.contador = 0;
    let gameOver = document.getElementById("gameOver");
    gameOver.style.display = "none";
    initializeCards(game.cardGame());
}

function hotBar(){
    let ranking = document.getElementById("ranking");
    ranking.classList.toggle("activeOn");
}



