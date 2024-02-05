const bushes = document.querySelectorAll('.bush');
const scoreBoard = document.querySelector('.score');
const bunnies = document.querySelectorAll('.bunny');
let lastBush;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomBush(bushes) {
  const index = Math.floor(Math.random() * bushes.length);
  const bush = bushes[index];

  if (bush === lastBush) {
    return randomBush(bushes);
  }
  
  lastBush = bush;
  return bush;
}

function peep() {
  const time = randomTime(200, 1000);
  const bush = randomBush(bushes);
  bush.classList.add('up');
  setTimeout(() => {
    bush.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 10000)
}

function bonk(e) {
  if(!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

bunnies.forEach(bunny => bunny.addEventListener('click', bonk));
