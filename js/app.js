/**----------------------------------------------------------*
 *                         Main Menu                         *
 *-----------------------------------------------------------*/
const btnMenu = document.querySelectorAll('.nav-menu li');
const popupWindow = document.querySelectorAll('.pop-up>li');
const btnClose = document.querySelectorAll('button.close');
const btnCancel = document.querySelectorAll('button.cancel');

let match = 0;
let n = 0;

const btnClick = () => {
    btnMenu.forEach((item, i, arr) => {
        item.addEventListener('click', () => {
            if (match) {
                popupWindow[i].style.background = 'rgba(40,100,85,0.8)';
            } 
            else {
                popupWindow[i].style.background = 'rgba(0,0,0,0.2)';
            }

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
    stopTimer();
    match = 0;
    screenGame();
    popupWindow[n].className = '';
    newGame();
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

const sortPerson = () => {
    let arr = [];

    for (let i = 0; i < person.length; i++) {
        arr[i] = person[i].time.split(':');
    }

    for (let j = arr.length - 1; j > 0; j--) {
        if (arr[j] < arr[j - 1]) {
            let t = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = t;

            let temp = person[j];
            person[j] = person[j - 1];
            person[j - 1] = temp;
        }
    }
};

const addRecord = (name, time) => {
    out = '';

    person[6] = Object.create(Person).constructor(name,time);
    sortPerson();

    for (let i = 0; i < person.length; i++) {
        out += person[i].name + ' ' + person[i].time + '</br>';
    }

    document.querySelector('.high-score').innerHTML = out;
};

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

/**----------------------------------------------------------*
 *                          Victory                          *
 *-----------------------------------------------------------*/
const victory = () => {
    document.querySelector('.time').innerHTML = 'your time ' + resultGame;
    n = 4;
    popupWindow[n].className = 'show';
};

let nickname;
const submit = () => {
    nickname = document.getElementById('nickname').value;
    if (nickname.length) popupWindow[n].className = '';
    addRecord(nickname, resultGame);
};

document.querySelector('.submit').onclick = submit;

/**----------------------------------------------------------*
 *                           Game                            *
 *-----------------------------------------------------------*/
let firstOpen;
let secondOpen;
let firstIndex = 0;
let secondIndex = 0;
let numClick = 0;

const shuffle = cards => {
    let i = cards.length, j, temp;
    while(i) {
        j = Math.floor(Math.random() * i);
        i -= 1;
        temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
};

const newGame = () => {
    let output = '';
    match = gameCards.length / 2;

    shuffle(gameCards)

    for (let i = 0; i < gameCards.length; i++) {
        output += '<div class="game__card">';
        output += '<div class="back"><img src=\"' + selectedShirt + '\" onclick=\"selectCard(' + i + ')\"></div>';
        output += '<div class="front"><img src=\"' + gameCards[i] + '\" ></div>';
        output += '</div>';
    }

    document.querySelector('.game').innerHTML = output;
    startTimer();
};

const selectCard = index => {
    if (numClick == 0) {
        isClose(firstIndex);
        isClose(secondIndex);
        numClick = 1;
    }
    if (numClick == 1) {
        firstOpen = gameCards[index];
        firstIndex = index;
        numClick = 2;
    } else {
        secondOpen = gameCards[index];
        secondIndex = index;
        numClick = 0;

        if (firstOpen === secondOpen) {
            isMatch();
            setTimeout(disappearCards, 300);
            match--;
        }
    }

    isOpen(index);

    if(!match) {
        stopTimer();
        resultTime();
        victory();
    }
};

const isOpen = index => {
    document.querySelectorAll('.game__card>.back')[index].style.transform = 'perspective( 600px ) rotateY( -180deg )';
    document.querySelectorAll('.game__card>.front')[index].style.transform = 'perspective( 600px ) rotateY( 0deg )';
};

const isClose = index => {
    document.querySelectorAll('.game__card>.back')[index].style.transform = 'perspective( 600px ) rotateY( 0deg )';
    document.querySelectorAll('.game__card>.front')[index].style.transform = 'perspective( 600px ) rotateY( 180deg )';
};

const isMatch = () => {
    document.querySelectorAll('.game__card>.front')[firstIndex].style.borderColor = '#95f3b6';
    document.querySelectorAll('.game__card>.front')[secondIndex].style.borderColor = '#95f3b6';
};

const disappearCards = () => {
    document.querySelectorAll('.game__card>.back')[firstIndex].style.display = 'none';
    document.querySelectorAll('.game__card>.front')[firstIndex].style.display = 'none';
    document.querySelectorAll('.game__card>.back')[secondIndex].style.display = 'none';
    document.querySelectorAll('.game__card>.front')[secondIndex].style.display = 'none';
};
