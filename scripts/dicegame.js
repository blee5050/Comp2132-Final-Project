const dicePlayer = document.getElementById('playerDice');
const diceComputer = document.getElementById('computerDice');
const playerTotal = document.getElementById('playerTotal');
const playerCurrent = document.getElementById('playerCurrent');
const computerTotal = document.getElementById('computerTotal');
const computerCurrent = document.getElementById('computerCurrent');
const roundOutput = document.getElementById('roundOutput');
const gameResult = document.getElementById('gameResult');
const $rollDice = $('#roll');
const $newGame = $('#new-game');
const $result = $('#result');
const $rollButton = $('#roll');

// for animations
const $playerChar = $('.player-char');
const $compChar = $('.computer-char');
const ippoBaseSrc = 'images/characters/ippo-base-1.png'
const ippoLossSrc = 'images/characters/ippo-loss-1.png'
const ippoWinSrc = 'images/characters/ippo-win-1.png'
const volBaseSrc = 'images/characters/vol-base-1.png'
const volLossSrc = 'images/characters/vol-loss-1.png'
const volWinSrc = 'images/characters/vol-win-1.png'

// DieFace will associate an image to the appropriate value
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

// each value on the die will get an img associated the the value via DieFace class and stored into an array 
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

// randomly picks one face of the die object
Die.prototype.roll = function(){

    let j;
    let description = "";
    // will find random integer from 0 to 5 (length = 6)
    j = Math.floor(Math.random() * (this.dieFaces.length));
    //description += `${this.dieFaces[j].getValue()}`;
    return this.dieFaces[j];
}

// player object will store total and current score
class Player{
    constructor(){
        this.total = 0;
        this.current = 0;
    }

    currentScore(){
        return this.current;
    }

    totalScore(){
        return this.total;
    }
}

// function that calculates score based on established rules
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

// function that plays the dice game
function playGame()
{
    $rollDice.click( function(){
        if(gameRound < maxRound)
        {
            gameRound++;

            // roll dice 
            playerDie1 = dieObject.roll();
            playerDie2 = dieObject.roll();
            computerDie1 = dieObject.roll();
            computerDie2 = dieObject.roll();
            // show die face
            pDieValue1 = playerDie1.getValue();
            pDieValue2 = playerDie2.getValue();
            cDieValue1 = computerDie1.getValue();
            cDieValue2 = computerDie2.getValue();
            // implement rules
            player.current = calcScore(pDieValue1, pDieValue2);
            player.total += player.currentScore();
            computer.current = calcScore(cDieValue1, cDieValue2);
            computer.total += computer.currentScore();

            // after 3 rounds show results
            if(gameRound == maxRound)
            {
                $result.show();
                $rollButton.hide();
                $newGame.show();
                if(player.totalScore() === computer.totalScore())
                {
                    gameResult.innerHTML = 
                    `DRAW!`;
                }
                if(player.totalScore() > computer.totalScore())
                {
                    clearTimeout(playerBaseTimeout);
                    $playerChar.attr('src', ippoWinSrc);
                    playerWinAnimation = requestAnimationFrame( ippoWinLoop );

                    clearTimeout(computerBaseTimeout);
                    $compChar.attr('src', volLossSrc);
                    computerLossAnimation = requestAnimationFrame( volLossLoop );
             
                    gameResult.innerHTML = 
                    `KO VICTORY!`;
                }
                if(player.totalScore() < computer.totalScore())
                {
                    clearTimeout(playerBaseTimeout);
                    $playerChar.attr('src', ippoLossSrc);
                    playerLossAnimation = requestAnimationFrame( ippoLossLoop );

                    clearTimeout(computerBaseTimeout);
                    $compChar.attr('src', volWinSrc);
                    computerWinAnimation = requestAnimationFrame( volWinLoop);

                    gameResult.innerHTML = 
                    `KO LOSS!`;
                }
            }

        }
    
        //output results
        roundOutput.innerHTML = `${gameRound}`;

        dicePlayer.innerHTML = `<p>${playerDie1.describeSelf()}${playerDie2.describeSelf()}</p>`;
        diceComputer.innerHTML = `<p>${computerDie1.describeSelf()}${computerDie2.describeSelf()}</p>`;

        playerTotal.innerHTML = 
        `${player.totalScore()}`;
        playerCurrent.innerHTML = 
        `${player.currentScore()}`;

        computerTotal.innerHTML = 
        `${computer.totalScore()}`;
        computerCurrent.innerHTML = 
        `${computer.currentScore()}`;

        // used for testing results
        console.log('player ' + player.totalScore());
        console.log('computer ' + computer.totalScore());
    });
     
    // when new game button is clicked
    $newGame.click( function(){
        $result.hide(); // hide the previous results
        $rollButton.show(); // show the roll button
        $newGame.hide(); // hide the new game button 

        clearTimeout(playerWinTimeout);// stop win animation
        clearTimeout(playerLossTimeout);// stop loss animation
        clearTimeout(playerBaseTimeout);// stop base animation
        clearTimeout(computerBaseTimeout);// stop base animation
        clearTimeout(computerWinTimeout);// stop win animation
        clearTimeout(computerLossTimeout);// stop loss animation

        // return to base animation
        $playerChar.attr('src', ippoBaseSrc);
        playerBaseAnimation = requestAnimationFrame( ippoBaseLoop );
        $compChar.attr('src', volBaseSrc);
        computerBaseAnimation = requestAnimationFrame( volBaseLoop );

        // reset game values and reset text
        gameRound = 0;
        player.total = 0;
        player.current = 0;
        computer.total = 0;
        computer.current = 0;
    
        gameResult.innerHTML = ``;
        roundOutput.innerHTML = ``;
        dicePlayer.innerHTML = `<img src="images/dice/dice-0.png" alt="blank die"><img src="images/dice/dice-0.png" alt="blank die">`;
        diceComputer.innerHTML = `<img src="images/dice/dice-0.png" alt="blank die"><img src="images/dice/dice-0.png" alt="blank die">`;

       // Revert to initial status text 
        playerTotal.innerHTML = 
        `${player.totalScore()}`;
        playerCurrent.innerHTML = 
        `${player.currentScore()}`;
        
        computerTotal.innerHTML = 
        `${computer.totalScore()}`;
        computerCurrent.innerHTML = 
        `${computer.currentScore()}`;

        // for testing 
        console.log('player ' + player.totalScore());
        console.log('computer ' + computer.totalScore());

    });
};

// fighter image animations
const ippoBaseLimit = 5;
const ippoBaseReg = /[1-5]/;
const ippoWinLimit = 9;
const ippoWinReg = /[1-9]/;
const ippoLossLimit = 3;
const ippoLossReg = /[1-3]/;
const volBaseLimit = 4;
const volBaseReg = /[1-4]/;
const volWinLimit = 7;
const volWinReg = /[1-7]/;
const volLossLimit = 4;
const volLossReg = /[1-4]/;

const delayAnimation = 150;

let ippoBaseCounter = 1;
let ippoWinCounter = 1;
let ippoLossCounter = 1;
let volBaseCounter = 1;
let volWinCounter = 1;
let volLossCounter = 1;

let playerBaseAnimation;
let playerBaseTimeout;
let playerWinAnimation;
let playerWinTimeout;
let playerLossAnimation;
let playerLossTimeout;
let computerBaseAnimation;
let computerBaseTimeout;
let computerWinAnimation;
let computerWinTimeout;
let computerLossAnimation;
let computerLossTimeout;

//base animation
function ippoBaseLoop(){
    ippoBaseCounter++;
    const src = `${ippoBaseSrc.replace(ippoBaseReg, ippoBaseCounter)}`;
    $playerChar.attr('src', src);

    playerBaseTimeout = setTimeout(function(){
        playerBaseAnimation = requestAnimationFrame( ippoBaseLoop );
    }, delayAnimation);

    if(ippoBaseCounter > ippoBaseLimit)
    {
        // resests counter to 1 to allow loop
        ippoBaseCounter = 1;
        const src = `${ippoBaseSrc.replace(ippoBaseReg, ippoBaseCounter)}`;
        $playerChar.attr('src', src);
    }
};

// win animation
function ippoWinLoop(){
    ippoWinCounter++;
    const src = `${ippoWinSrc.replace(ippoWinReg, ippoWinCounter)}`;
    $playerChar.attr('src', src);

    playerWinTimeout = setTimeout(function(){
        playerWinAnimation = requestAnimationFrame( ippoWinLoop );
    }, delayAnimation);

    if(ippoWinCounter > ippoWinLimit)
    {
        // resests counter to 1 to allow loop
        ippoWinCounter = 1;
        const src = `${ippoWinSrc.replace(ippoWinReg, ippoWinCounter)}`;
        $playerChar.attr('src', src);
    }
};

// loss animation
function ippoLossLoop(){
    ippoLossCounter++;
    const src = `${ippoLossSrc.replace(ippoLossReg, ippoLossCounter)}`;
    $playerChar.attr('src', src);

    playerLossTimeout = setTimeout(function(){
        playerLossAnimation = requestAnimationFrame( ippoLossLoop );
    }, delayAnimation);

    if(ippoLossCounter > ippoLossLimit)
    {
        // resests counter to 1 to allow loop
        ippoLossCounter = 1;
        const src = `${ippoLossSrc.replace(ippoLossReg, ippoLossCounter)}`;
        $playerChar.attr('src', src);
    }
};

// base animation
function volBaseLoop(){
    volBaseCounter++;
    const src = `${volBaseSrc.replace(volBaseReg, volBaseCounter)}`;
    $compChar.attr('src', src);

    computerBaseTimeout = setTimeout(function(){
        computerBaseAnimation = requestAnimationFrame( volBaseLoop );
    }, delayAnimation);

    if(volBaseCounter > volBaseLimit)
    {
        // resests counter to 1 to allow loop
        volBaseCounter = 1;
        const src = `${volBaseSrc.replace(volBaseReg, volBaseCounter)}`;
        $compChar.attr('src', src);
    }
};

// win animation
function volWinLoop(){
    volWinCounter++;
    const src = `${volWinSrc.replace(volWinReg, volWinCounter)}`;
    $compChar.attr('src', src);

    computerWinTimeout = setTimeout(function(){
        computerWinAnimation = requestAnimationFrame( volWinLoop );
    }, delayAnimation);

    if(volWinCounter > volWinLimit)
    {
        // resests counter to 1 to allow loop
        volWinCounter = 1;
        const src = `${volWinSrc.replace(volWinReg, volWinCounter)}`;
        $compChar.attr('src', src);
    }
};

// loss animation
function volLossLoop(){
    volLossCounter++;
    const src = `${volLossSrc.replace(volLossReg, volLossCounter)}`;
    $compChar.attr('src', src);

    computerLossTimeout = setTimeout(function(){
        computerLossAnimation = requestAnimationFrame( volLossLoop );
    }, delayAnimation);

    if(volLossCounter > volLossLimit)
    {
        // resests counter to 1 to allow loop
        volLossCounter = 1;
        const src = `${volLossSrc.replace(volLossReg, volLossCounter)}`;
        $compChar.attr('src', src);
    }
};

// Instantiate objects
const dieObject = new Die();
const player = new Player();
const computer = new Player();

const maxRound = 3;
let gameRound = 0;
let playerDie1;
let playerDie2;
let computerDie1;
let computerDie2;

// Initial status text 
playerTotal.innerHTML = 
`${player.totalScore()}`;
playerCurrent.innerHTML = 
`${player.currentScore()}`;

computerTotal.innerHTML = 
`${computer.totalScore()}`;
computerCurrent.innerHTML = 
`${computer.currentScore()}`;

// begin game
playerBaseAnimation = requestAnimationFrame( ippoBaseLoop );
computerBaseAnimation = requestAnimationFrame( volBaseLoop );
playGame();