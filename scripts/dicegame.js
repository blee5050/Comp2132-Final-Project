const diceTest = document.getElementById('diceTest');
const roundTest = document.getElementById('roundTest');
const $rollDice = $('#roll');
const $newGame = $('#new-game');

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
let maxRound = 3;
let playerDie1;
let playerDie2;
let computerDie1;
let computerDie2;


diceTest.innerHTML = 
`<p>Player Total = ${playerScoreTotal}</p>
 <p>Player Current = ${playerScoreCurrent}</p>
 <p>Computer Total = ${computerScoreTotal}</p>
 <p>Computer Current = ${computerScoreCurrent}</p>
 <p>Round = ${gameRound}</p>`;

playGame();

// begin game
function calcScore(die1, die2){
    //rule 1
    if(die1 == 1 || die2 == 1)
    {
        return 0;
    }
    //rule 2
    else if(die1 == die2)
    {
        return die1 * 4;
    }
    //rule 3
    else
    {
        return die1 + die2;
    }
}
function playGame(){

    $rollDice.click( function(){

        if(gameRound < maxRound)
        {
            gameRound++;
            // after 3 round show result.
            if(gameRound == 3)
            {
                $rollDice.prop('disabled', true);
                $newGame.prop('disabled', false);
                if(playerScoreTotal == computerScoreTotal)
                {
                    roundTest.innerHTML += 
                    `<p>It was a draw!</p>`;
                }
                else if(playerScoreTotal > computerScoreTotal)
                {
                    roundTest.innerHTML += 
                    `<p>You Win!</p>`;
                }
                else
                {
                    roundTest.innerHTML += 
                    `<p>You Lose!</p>`;
                }
            }
            playerDie1 = dieObject.roll();
            playerDie2 = dieObject.roll();
            computerDie1 = dieObject.roll();
            computerDie2 = dieObject.roll();
    
            pDieValue1 = playerDie1.getValue();
            pDieValue2 = playerDie2.getValue();
            cDieValue1 = computerDie1.getValue();
            cDieValue2 = computerDie2.getValue();

            // implement rules
            playerScoreCurrent = calcScore(pDieValue1, pDieValue2);
            playerScoreTotal += playerScoreCurrent;
            computerScoreCurrent = calcScore(cDieValue1, cDieValue2);
            computerScoreTotal += computerScoreCurrent;
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
    });
     
    $newGame.click( function(){
        $rollDice.prop('disabled', false);
        gameRound = 0;
        playerScoreTotal = 0;
        playerScoreCurrent = 0;
        computerScoreTotal = 0;
        computerScoreCurrent = 0;
    
        diceTest.innerHTML = 
        `<p>Player Total = ${playerScoreTotal}</p>
        <p>Player Current = ${playerScoreCurrent}</p>
        <p>Computer Total = ${computerScoreTotal}</p>
        <p>Computer Current = ${computerScoreCurrent}</p>
        <p>Round = ${gameRound}</p>`;
        roundTest.innerHTML = "";


        $newGame.prop('disabled', true);

    
    });
};


