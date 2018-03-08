const CARDS = Array.prototype.slice.call(document.getElementsByClassName('card'));
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
