const diceTest = document.getElementById('diceTest');
const $startButton = $('#start');

class DieFace{
    constructor(value){
        this.value = value;
    }

    describeSelf(){
        return `<img src="images/dice/dice-${this.value}.png" alt="${this.value}">`;
    }

    getValue(){
        return this.value;
    }
}

class Die{
    constructor(){
        this.values = [1,2,3,4,5,6];
       
        this.dieFaces = [];

        for(let i = 0, v = this.values.length; i < v; i++)
        {
            const dieObject = new DieFace(this.values[i]);
            this.dieFaces.push(dieObject);
        }
    }
}

class Player{
    constructor(){

    }
}

Die.prototype.roll = function(){

    let j;
    let description = "";
    // will find random integer from 0 to 5 (length = 6)
    j = Math.floor(Math.random() * (this.dieFaces.length));
    //description += `${this.dieFaces[j].getValue()}`;
    return this.dieFaces[j];
}

const dieObject = new Die();

let playerScoreTotal = 0;
let playerScoreCurrent = 0;
let computerScoreTotal = 0;
let computerScoreCurrent = 0;
let gameRound = 0;
let playerDie1;
let playerDie2;
let computerDie1;
let computerDie2;

// begin game
$startButton.click( function(){

    // if 3 rounds have not been played, roll dice
    if(gameRound != 3)
    {
        gameRound++;
        playerDie1 = dieObject.roll()
        playerDie2 = dieObject.roll()
        computerDie1 = dieObject.roll()
        computerDie2 = dieObject.roll()

        pDieValue1 = playerDie1.getValue();
        pDieValue2 = playerDie2.getValue();
        cDieValue1 = computerDie1.getValue();
        cDieValue2 = computerDie2.getValue();

        // implement rules
        // player
        if(pDieValue1 == 1 || pDieValue2 == 1)
        {
            playerScoreTotal += 0;
            playerScoreCurrent = 0;
        }

        else if(pDieValue1 == pDieValue2)
        {
            playerScoreTotal += pDieValue1 * 4;
            playerScoreCurrent = pDieValue1 * 4;
            
        }

        else
        {
            let storeValue;
            storeValue = pDieValue1 + pDieValue2;
            playerScoreTotal += storeValue;
            playerScoreCurrent = storeValue;
        }

        // computer
        if(cDieValue1 == 1 || cDieValue2 == 1)
        {
            computerScoreTotal += 0;
            computerScoreCurrent = 0;
        }

        else if(cDieValue1 == cDieValue2)
        {
            computerScoreTotal += cDieValue1 * 4;
            computerScoreCurrent = cDieValue1 * 4;
        }
        else
        {
            let storeValue;
            storeValue = cDieValue1 + cDieValue2;
            computerScoreTotal += storeValue;
            computerScoreCurrent = storeValue;
        }

        //output results
        diceTest.innerHTML = 
        `<p>${playerDie1.describeSelf()}${playerDie2.describeSelf()}</p>
         <p>${computerDie1.describeSelf()}${computerDie2.describeSelf()}</p>
         <p>Player Total = ${playerScoreTotal}</p>
         <p>Player Current = ${playerScoreCurrent}</p>
         <p>Computer Total = ${computerScoreTotal}</p>
         <p>Computer Current = ${computerScoreCurrent}</p>
         <p>Round = ${gameRound}</p>`;

    }
    // after 3 rounds of play
    else
    {
        if(playerScoreTotal == computerScoreTotal)
        {
            diceTest.innerHTML += 
            `<p>It was a draw!</p>`;
        }
        else if(playerScoreTotal > computerScoreTotal)
        {
            diceTest.innerHTML += 
            `<p>You Win!</p>`;
        }
        else
        {
            diceTest.innerHTML += 
            `<p>You Lose!</p>`;
        }
    }

});


