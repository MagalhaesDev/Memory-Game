const game = {
    techs: [
        "bootstrap",
        "css",
        "electron",
        "firebase",
        "html",
        "javascript",
        "jquery",
        "mongo",
        "node",
        "react",
    ],

    contador: 0,

    cards: null,

    cardGame: function(){
        
        this.cards = [];
        for(let tech of this.techs){
            this.cards.push(this.createCardGame(tech)); 
        }

        this.cards = this.cards.flatMap(card => card);
        // this.shuffleCards();
        return this.cards
    },

    createCardGame: function(tech){
        return [{
            id: this.createIdCardGame(tech),
            icon: tech,
            flipped: false,
        },{
            id: this.createIdCardGame(tech),
            icon: tech,
            flipped: false,
        }]
    },
    
    createIdCardGame: function(tech){
        return tech + parseInt(Math.random() * 1000)
    },

    // shuffleCards: function(){
    //     let cardIndex = this.cards.length;
    //     let randomIndex = 0;
    
    //     while(cardIndex !== 0){
    //         randomIndex = Math.floor(Math.random() * cardIndex);
    //         cardIndex--;
    
    //         [this.cards[randomIndex],this.cards[cardIndex]] = [this.cards[cardIndex],this.cards[randomIndex]];
    //     }
    // },

    
    firstCard: null,
    secondCard: null,
    lockMode: false,

    cardFlipContent: function(id){
        let card = this.cards.filter(card => card.id === id)[0];
        if(card.flipped || this.lockMode){
            return false;
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkGame: function () {
        if(!this.firstCard || !this.secondCard){
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    resetCard: function(){
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    unFlipCard: function(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.resetCard();
    },

    endGame: function(){
        return this.cards.filter(card => !card.flipped).length === 0;
    },

    movementCounter: function () {
        this.contador++;
        return this.contador;
    },

    updateRanking: function(){
        let inputRanking = document.getElementById("input-ranking").value;
        let ranking = document.getElementById("ranking");
        let ulRanking = document.createElement("ul");
        ulRanking.classList.add("ul-ranking");
        let liRanking = document.createElement("li");
        liRanking.innerHTML = inputRanking + " Moviments: " + this.movementCounter();
        ulRanking.appendChild(liRanking);
        ranking.appendChild(ulRanking);
    },
}