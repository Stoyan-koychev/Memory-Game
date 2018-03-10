const CARDS = [...document.getElementsByClassName('card')];
const ICON_HANDLERS = document.getElementsByClassName('icon-handler');
const MOVES = document.getElementsByTagName('span');
const RESTART_BTN = document.querySelector('button');
const PLAY_AGAIN_BTN = document.querySelector('.congrats').querySelector('button');
const STARS_PANEL = document.querySelector('.score').getElementsByTagName('li');
const STARS = [
  'far fa-star',
  'fas fa-star'
];
const ICONS_CLASS = [
  'fab fa-apple',
  'fab fa-github',
  'fab fa-behance',
  'fab fa-html5',
  'fab fa-angular',
  'fab fa-js',
  'fab fa-slack',
  'fab fa-dribbble',
  'fab fa-apple',
  'fab fa-github',
  'fab fa-behance',
  'fab fa-html5',
  'fab fa-angular',
  'fab fa-js',
  'fab fa-slack',
  'fab fa-dribbble'
];
let matchCounter = 0; //-> Will count the matches
let cardClicks = 0; // -> Every 2 clicked cards will be equal to one move
let moveCounter = 0; // -> Move cointer will be shown in the .score-panel
let savedCards = []; // -> Will hold the clicked cards
let starsCounter = 0; // -> Will count the shown stars
let shuffledIconsClasses = []; // -> The shuffled cards will be stored here

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

shuffledIconsClasses = shuffle(ICONS_CLASS);

// Fill the cadrs with the icons
for (let i = 0; i < CARDS.length; i++) {
  CARDS[i].querySelector('.icon-handler').innerHTML = '<i class="'+shuffledIconsClasses[i]+'"></i>';
};

function gameLogic(item, index) {
  item.addEventListener('click', function() {

    if ( savedCards.length === 0 ) {
        savedCards.push(item);
        item.classList.add('card-rotate');
        cardClicks++;
    } else {
        savedCards.push(item);
        item.classList.add('card-rotate');
        //On every 2 clicks the move counter will me increased by one
        cardClicks++;
        if (cardClicks % 2 === 0) {
            moveCounter++;
            MOVES[0].innerHTML = moveCounter;
        }
        let prevClass = savedCards[0].querySelector('svg').classList[1];
        let currentClass = savedCards[1].querySelector('svg').classList[1];
        if ( currentClass === prevClass ) {
          savedCards[0].querySelector('.back-of-card').classList.remove('not-match');
          savedCards[1].querySelector('.back-of-card').classList.remove('not-match');
          savedCards[0].querySelector('.back-of-card').classList.add('match');
          savedCards[1].querySelector('.back-of-card').classList.add('match');
          console.log(prevClass+' '+currentClass);
          savedCards = [];
          matchCounter++;
        } else {
        savedCards[0].querySelector('.back-of-card').classList.toggle('not-match');
        savedCards[1].querySelector('.back-of-card').classList.toggle('not-match');
        setTimeout(function(){
            savedCards[0].querySelector('.back-of-card').classList.toggle('not-match');
            savedCards[1].querySelector('.back-of-card').classList.toggle('not-match');
            savedCards[0].classList.remove('card-rotate');
            savedCards[1].classList.remove('card-rotate');
            savedCards = [];
        },500);
        }
    }

  });
}

CARDS.forEach( gameLogic );
