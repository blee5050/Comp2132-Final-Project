const $popup = $('#pop-up');
const $closeButton = $('#close-pop-up');
const $nextButton = $('#next');
const $prevButton = $('#previous');

const rules = document.getElementById('rules');
const listRules = [];
listRules[1] = 
`
<span class="center"><img src="images/dice/dice-6.png" alt="six"><img src="images/dice/dice-1.png" alt="one"><b id="example-score">SCORE = 0</b></span>
<br>If any of the players two dice comes up as a 1 then the score for that round for the player is 0.
<br>
<br>(If the player rolls a 6 and 1, they get a score of 0)
`;
listRules[2] = 
`
<span class="center"><img src="images/dice/dice-5.png" alt="five"><img src="images/dice/dice-5.png" alt="five"><b id="example-score">SCORE = 20</b></span>
<br>If the player rolls a pair of the same numbers then the players score is the total of the two dice times 2.
<br>
<br>(If the player rolls 5 and 5, they get a score of (5+5)*2 = 20)
`;
listRules[3] = 
`
<span class="center"><img src="images/dice/dice-3.png" alt="three"><img src="images/dice/dice-2.png" alt="two"><b id="example-score">SCORE = 5</b></span>
<br>If the player rolls any other combination of dice other than the ones mentioned 
above then the players score is the total value of the two dice.
<br>
<br>(If a player rolls a 3 and a 2, player gets a score of 3+2 = 5)
`;

let currentRule = 1;

// next info
$nextButton.click( function(){
    ++currentRule;
    if(currentRule == 1)
    {
        $prevButton.prop('disabled', true);
        rules.innerHTML = `${listRules[currentRule]}`;
    }
    if(currentRule == 2)
    {
        $prevButton.prop('disabled', false);
        rules.innerHTML = `${listRules[currentRule]}`;
    }
    if(currentRule == 3)
    {
        rules.innerHTML = `${listRules[currentRule]}`;
        currentRule = 0;
    }
});

$prevButton.click( function(){
    --currentRule;
    if(currentRule == 1)
    {
        $prevButton.prop('disabled', true);
        rules.innerHTML = `${listRules[currentRule]}`;
    }
    if(currentRule == 2)
    {
        rules.innerHTML = `${listRules[currentRule]}`;
    }
    if(currentRule == -1)
    {
        currentRule = 2;
        rules.innerHTML = `${listRules[currentRule]}`;
    }
});


// close pop-up
$closeButton.click( function(){
    $popup.hide();
});
