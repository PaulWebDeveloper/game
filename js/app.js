/**----------------------------------------------------------*
 *                         Main Menu                         *
 *-----------------------------------------------------------*/
const btnMenu = document.querySelectorAll('.nav-menu li');
const popupWindow = document.querySelectorAll('.pop-up>li');
const btnClose = document.querySelectorAll('button.close');
const btnCancel = document.querySelectorAll('button.cancel');

let n = 0;

const btnClick = () => {
    btnMenu.forEach((item, i, arr) => {
        item.addEventListener('click', () => {
            popupWindow[n].className = '';
            popupWindow[i].className = 'show';
            n = i;
        })
    });
};

const close = action => {
    action.forEach((item, i, arr) => {
        item.addEventListener('click', () => {
            popupWindow[n].className = '';
        })
    });
};

btnClick();
close(btnClose);
close(btnCancel);

/**----------------------------------------------------------*
 *               Button of menu "SHIRT CARDS"                *
 *-----------------------------------------------------------*/
let selectedShirt = 'img/shirts/back' + 2 + '.jpg';

const checkShirt = () => {
    let shirt = document.querySelector('[name="card-back"]:checked').value;
    selectedShirt = 'img/shirts/back' + shirt + '.jpg';
};

const choiceShirt = () => {
    checkShirt();
    popupWindow[n].className = [];
};

document.querySelector('.pop-up__shirt-cards .accept').onclick = choiceShirt;

/**----------------------------------------------------------*
 *                Button of menu "DIFFICULTY"                *
 *-----------------------------------------------------------*/
const initialCards = [];

for (let i = 0; i < 12; i++) {
    initialCards[i] = 'img/cards/image_' + (i + 1) + '.jpg'; 
}

let newInitialCards = initialCards;
let gameCards = newInitialCards.concat(newInitialCards);

let lengthGameContainer = '';
let quantityCards = 12;

const checkDifficult = () => {
    let levelDifficulty = document.querySelector('[name="game-difficult"]:checked').value;

    switch(levelDifficulty) {
        case 'easy':
            lengthGameContainer = '750px';
            quantityCards = 5;
        break;

        case 'medium':
            lengthGameContainer = '900px';
            quantityCards = 9;
        break;

        case 'hard':
            lengthGameContainer = '1200px';
            quantityCards = 12;
        break;
    }

    newInitialCards = initialCards.slice(0, quantityCards);
    gameCards = newInitialCards.concat(newInitialCards);
};

const screenGame = () => {
    document.querySelector('.game').style.width = lengthGameContainer;
};

const choiceDifficult = () => {
    checkDifficult();
    popupWindow[n].className = '';
};

document.querySelector('.pop-up__difficulty .accept').onclick = choiceDifficult;

/**----------------------------------------------------------*
 *                 Button of menu "New Game"                 *
 *-----------------------------------------------------------*/
const startGame = () => {
    screenGame();
    popupWindow[n].className = '';
};

document.querySelector('.start-game').onclick = startGame;

/**----------------------------------------------------------*
 *                 Button of menu "Records"                  *
 *-----------------------------------------------------------*/
const names = ['Alex', 'Anna', 'John', 'Julia', 'Mike', 'Kate'];
const highScore = document.querySelector('.high-score');
const person = [];

const Person = {
    constructor: function(name, time) {
        this.name = name;
        this.time = time;
        return this;
    }
};

let out = '';

for (let i = 0; i < names.length; i++) {
    person[i] = Object.create(Person).constructor(names[i],'01:' + (i + 5) * 2);
    out += person[i].name + ' ' + person[i].time + '</br>';
}

document.querySelector('.high-score').innerHTML = out;

/**----------------------------------------------------------*
 *                           Timer                           *
 *-----------------------------------------------------------*/
const min = document.querySelector('.min');
const sec = document.querySelector('.sec');
const time = document.querySelector('.timer');

let timerActive = false;
let countTime = 0;
let second = 0;
let m = 0;
let s = 0;
let resultGame = '';

time.style.display = 'none';

const add = time => (time < 10) ? '0' + time : time;

const timer = () => {
    countTime += 1;
    m = min.innerText = add(Math.floor(countTime / 60));
    s = sec.innerText = add(countTime % 60);
};

const startTimer = () => {
    timerActive = true;
    second = setInterval(timer, 1000);
    time.style.display = 'block';
};

const stopTimer = () => {
    clearInterval(second);
    timerActive = false;
    countTime = 0; 
};

const resultTime = () => {
    resultGame = m + ':' + s;
};
