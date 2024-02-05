const bushes = document.querySelectorAll('.bush');
const scoreBoard = document.querySelector('.score');
const bunnies = document.querySelectorAll('.bunny');
const levelDisplay = document.querySelector('.level');
const carrotsContainer = document.querySelector('.carrots');
let lastBush;
let timeUp = false;
let score = 0;
let level = 1;

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
  if (score < 50) {
    const time = randomTime(getMinTime(), getMaxTime());
    const bush = randomBush(bushes);
    bush.classList.add('up');
    setTimeout(() => {
      bush.classList.remove('up');
      if (!timeUp) peep();
    }, time);
  } else {
    timeUp = true;
    showCard();
  }
}

function getMinTime() {
  switch (level) {
    case 1:
      return 800;
    case 2:
      return 500;
    case 3:
      return 300;
    default:
      return 800;
  }
}

function getMaxTime() {
  switch (level) {
    case 1:
      return 1500;
    case 2:
      return 1000;
    case 3:
      return 700;
    default:
      return 1500;
  }
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  level = 1;
  peep();
  setTimeout(() => timeUp = true, 60000);
}

function bonk(e) {
  if(!e.isTrusted) return; // cheater!
  score++;
  if (score >= 10 && score < 25) {
    level = 2;
  } else if (score >= 25) {
    level = 3;
  }
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;

  updateCarrots();
}

function updateCarrots() {
  carrotsContainer.innerHTML = '';
  const carrotImage = document.createElement('img');
  
  switch (level) {
    case 1:
      carrotImage.src = 'level1.png';
      break;
    case 2:
      carrotImage.src = 'level2.png';
      break;
    case 3:
      carrotImage.src = 'level3.png';
      break;
    default:
      carrotImage.src = 'level1.png';
      break;
  }
          
  carrotImage.classList.add('carrot-image');
  carrotsContainer.appendChild(carrotImage);
}

function showCard() {
  const overlay = document.getElementById('overlay');
  const alertCard = document.getElementById('alertCard');
  
  overlay.style.display = 'block';
  alertCard.style.display = 'block';
}

function hideCard() {
  const overlay = document.getElementById('overlay');
  const alertCard = document.getElementById('alertCard');
  
  overlay.style.display = 'none';
  alertCard.style.display = 'none';
}

function playAgain() {
  hideCard();
  startGame();
}

bunnies.forEach(bunny => bunny.addEventListener('click', bonk));

hideCard();
updateCarrots();