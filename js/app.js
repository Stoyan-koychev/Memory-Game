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
let startTime = (new Date()).getTime();
let currentTime;

/*
* Shuffle function,
* shuffle the array in random order.
* !!! this function is from -> https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/25984542
*/
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

// Fill the cadrs with the shuffled icons
for (let i = 0; i < CARDS.length; i++) {
  CARDS[i].querySelector('.icon-handler').innerHTML = '<i class="'+shuffledIconsClasses[i]+'"></i>';
}

/*
* showStars function,
* check the numbers of moves and set how much stars are shown
* the stars counter is for the pop-up
*/
function showStars() {
  if (moveCounter > 21) {
    starsCounter = 0;
    STARS_PANEL[0].innerHTML = '<i class="'+STARS[0]+'"></i>';
    STARS_PANEL[1].innerHTML = '<i class="'+STARS[0]+'"></i>';
    STARS_PANEL[2].innerHTML = '<i class="'+STARS[0]+'"></i>';
  }else if (moveCounter > 16) {
    starsCounter = 1;
    STARS_PANEL[0].innerHTML = '<i class="'+STARS[1]+'"></i>';
    STARS_PANEL[1].innerHTML = '<i class="'+STARS[0]+'"></i>';
    STARS_PANEL[2].innerHTML = '<i class="'+STARS[0]+'"></i>';
  }else if (moveCounter > 11) {
    starsCounter = 2;
    STARS_PANEL[0].innerHTML = '<i class="'+STARS[1]+'"></i>';
    STARS_PANEL[1].innerHTML = '<i class="'+STARS[1]+'"></i>';
    STARS_PANEL[2].innerHTML = '<i class="'+STARS[0]+'"></i>';
  }else if (moveCounter < 11){
    starsCounter = 3;
    STARS_PANEL[0].innerHTML = '<i class="'+STARS[1]+'"></i>';
    STARS_PANEL[1].innerHTML = '<i class="'+STARS[1]+'"></i>';
    STARS_PANEL[2].innerHTML = '<i class="'+STARS[1]+'"></i>';
  }
}

/*
* restartGame function,
* 1) shuffle the cards once again
* 2) go through all card, close them, remove the match class
*    and assign new icons
* 3) set all counters to zero and empty the arrays
*/
function restartGame() {
  shuffledIconsClasses = shuffle(ICONS_CLASS);
  CARDS.forEach( function(item, index) {
    item.classList.remove('card-rotate');
    item.querySelector('.back-of-card').classList.remove('match');
    item.querySelector('.icon-handler').innerHTML = '';
    item.querySelector('.icon-handler').innerHTML = '<i class="'+shuffledIconsClasses[index]+'"></i>';
  });

  MOVES[0].innerHTML = 0;
  matchCounter = 0;
  cardClicks = 0;
  moveCounter = 0;
  savedCards = [];
  starsCounter = 0;
  shuffledIconsClasses = [];
  startTime = (new Date()).getTime();

  starsCounter = 3;
  STARS_PANEL[0].innerHTML = '<i class="'+STARS[1]+'"></i>';
  STARS_PANEL[1].innerHTML = '<i class="'+STARS[1]+'"></i>';
  STARS_PANEL[2].innerHTML = '<i class="'+STARS[1]+'"></i>';

  PLAY_AGAIN_BTN.parentElement.parentElement.classList.add('remove-grats');
}

/*
* gameLogic function,
* 1) add event lister for click,
* 2) check if there are some items in the savedCards array
* 3) on click push the card to the savedCards array
* 4) compare the two clicked cards, on match increses the matchCounter by 1
*    and empty the savedCards array for the next compare
* 5) check the matchCounter if is equal to 8, to show the pop-up with the message
*/
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
            showStars();
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
          if (matchCounter === 8) {
            currentTime = (new Date()).getTime();
            let time = Math.floor((currentTime-startTime)/1000);
            document.querySelector('.congrats').classList.remove('remove-grats');
            document.querySelector('.grats-moves').innerHTML = moveCounter;
            document.querySelector('.grats-stars').innerHTML = starsCounter;
            document.querySelector('.timer').innerHTML = time;
            document.querySelector('.congrats').classList.add('show-grats');
          }
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
RESTART_BTN.addEventListener('click', restartGame );
PLAY_AGAIN_BTN.addEventListener('click', restartGame );
