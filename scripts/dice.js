const diceTest = document.getElementById('diceTest');

class DieFace{
    constructor(value){
        this.value = value;
    }

    describeSelf(){
        return `<img src="images/dice/dice-${this.value}.png" alt="${this.value}">`;
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
    description += `You rolled a ${this.dieFaces[j].describeSelf()} and ${this.dieFaces.length}`;

    return description
}

const dieObject = new Die();
diceTest.innerHTML += `${dieObject.roll()}`



