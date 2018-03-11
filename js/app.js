const CARDS = [...document.getElementsByClassName('card')];
const ICON_HANDLERS = document.getElementsByClassName('icon-handler');
const MOVES = document.getElementsByTagName('span');
const RESTART_BTN = document.querySelector('button');
const PLAY_AGAIN_BTN = document.querySelector('.congrats').querySelector('button');
const STARS_PANEL = document.querySelector('.score').getElementsByTagName('li');
const MIN_LABEL = document.getElementsByClassName('min');
const SEC_LABEL = document.getElementsByClassName('sec');
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
let totalSeconds = 0;
let savedIndex = [];
//setInterval(timer, 1000);

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

function timer() {
  totalSeconds++;
  SEC_LABEL[0].innerHTML = pad(totalSeconds % 60) ;
  MIN_LABEL[0].innerHTML = pad(parseInt( totalSeconds / 60 ));
  SEC_LABEL[1].innerHTML = pad(totalSeconds % 60) ;
  MIN_LABEL[1].innerHTML = pad(parseInt( totalSeconds / 60 ));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
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
    item.classList.remove('match');
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

  totalSeconds = 0;
  document.querySelector('.timer').innerHTML = '<p>Timer: <span class="min">0</span>:<span class="sec">0</span></p>';
  document.querySelector('.grats-container').querySelector('p').innerHTML = 'With <span class="grats-moves">00</span> moves and <span class="grats-stars">0</span> Stars for <span class="min">0</span>:<span class="sec">0</span> minutes';
  starsCounter = 3;
  STARS_PANEL[0].innerHTML = '<i class="'+STARS[1]+'"></i>';
  STARS_PANEL[1].innerHTML = '<i class="'+STARS[1]+'"></i>';
  STARS_PANEL[2].innerHTML = '<i class="'+STARS[1]+'"></i>';

  PLAY_AGAIN_BTN.parentElement.parentElement.classList.add('remove-grats');
  PLAY_AGAIN_BTN.parentElement.parentElement.classList.remove('show-grats');
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
    cardClicks++;
    if (cardClicks % 2 === 0) {
      moveCounter++;
      MOVES[0].innerHTML = moveCounter;
      showStars();
    }
    if ( item.classList[1] !== 'match' && item.classList[1] !== 'card-rotate' ) {
      savedCards.push(item);
      savedIndex.push(index);
      item.classList.toggle('card-rotate');

      if ( savedCards.length > 1 && savedIndex[0] != savedIndex[1] ) {
          if ( savedCards[0].innerHTML === savedCards[1].innerHTML ) {
            savedCards[1].classList.toggle('card-rotate');
            savedCards[0].classList.toggle('card-rotate');
            savedCards[1].classList.toggle('match');
            savedCards[0].classList.toggle('match');
            matchCounter++;
            savedCards = [];
            savedIndex = [];
            if ( matchCounter === 8 ) {
              document.querySelector('.grats-moves').innerHTML = moveCounter;
              document.querySelector('.grats-stars').innerHTML = starsCounter;
              PLAY_AGAIN_BTN.parentElement.parentElement.classList.toggle('remove-grats');
              PLAY_AGAIN_BTN.parentElement.parentElement.classList.toggle('show-grats');
            }
          } else {
            savedCards[1].classList.toggle('not-match');
            savedCards[0].classList.toggle('not-match');
            setTimeout(function() {
              savedCards[1].classList.toggle('card-rotate');
              savedCards[0].classList.toggle('card-rotate');
              savedCards[1].classList.toggle('not-match');
              savedCards[0].classList.toggle('not-match');
              savedCards = [];
              savedIndex = [];
            }, 500);
          }
      }
    }
  });// End event listener
}

CARDS.forEach( gameLogic );
RESTART_BTN.addEventListener('click', restartGame );
PLAY_AGAIN_BTN.addEventListener('click', restartGame );
