import "./style.css";

// Primero cargamos el HTML
document.querySelector("#app").innerHTML = `
  <main>
    <section class="player player--0 player--active">
      <h2 class="name" id="name--0">Player 1</h2>
      <p class="score" id="score--0">0</p>
      <div class="current">
        <p class="current-label">Current</p>
        <p class="current-score" id="current--0">0</p>
      </div>
    </section>
    <section class="player player--1">
      <h2 class="name" id="name--1">Player 2</h2>
      <p class="score" id="score--1">0</p>
      <div class="current">
        <p class="current-label">Current</p>
        <p class="current-score" id="current--1">0</p>
      </div>
    </section>

    <img src="dice-1.png" alt="Playing dice" class="dice hidden" />
    <button class="btn btn--new">🔄 New game</button>
    <button class="btn btn--roll">🎲 Roll dice</button>
    <button class="btn btn--hold">📥 Hold</button>
  </main>
`;

// Variables de estado
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let diceNumber = 1;
let isDiceHidden = true;
let isPlaying = true;
let winner = null;
let showMessage = false;

// Elementos del DOM
const sectionPlayer0 = document.querySelector(".player--0");
const sectionPlayer1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");
const imgDice = document.querySelector(".dice");

// Función para actualizar la interfaz
const updateUI = () => {
  // Actualizar scores
  score0.textContent = scores[0];
  score1.textContent = scores[1];
  
  // Actualizar current scores
  currentScore0.textContent = activePlayer === 0 ? currentScore : 0;
  currentScore1.textContent = activePlayer === 1 ? currentScore : 0;
  
  // Actualizar clases active
  sectionPlayer0.classList.toggle('player--active', activePlayer === 0);
  sectionPlayer1.classList.toggle('player--active', activePlayer === 1);
  
  // Actualizar dado
  imgDice.src = `dice-${diceNumber}.png`;
  imgDice.classList.toggle('hidden', isDiceHidden);
  
  // Actualizar clases winner
  sectionPlayer0.classList.toggle('player--winner', !isPlaying && scores[0] >= 100);
  sectionPlayer1.classList.toggle('player--winner', !isPlaying && scores[1] >= 100);
};

// Función para mostrar mensaje de victoria
const showVictoryMessage = () => {
  const overlay = document.createElement('div');
  overlay.className = 'victory-overlay';
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'victory-message';
  messageDiv.innerHTML = `
    <h1>¡Felicidades! 🎉</h1>
    <span>Jugador ${winner + 1} ha ganado</span>
  `;
  
  document.querySelector('main').appendChild(overlay);
  document.querySelector('main').appendChild(messageDiv);
  
  setTimeout(() => {
    overlay.remove();
    messageDiv.remove();
    setTimeout(initGame, 500);
  }, 3000);
};

// Función para cambiar el turno del jugador activo
const switchPlayer = () => {
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  updateUI();
};

// Función para iniciar los valores del juego
const initGame = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isDiceHidden = true;
  isPlaying = true;
  winner = null;
  updateUI();
};

// Función para lanzar el dado
const throwDice = () => {
  if (!isPlaying) return;
  
  diceNumber = Math.trunc(Math.random() * 6) + 1;
  isDiceHidden = false;
  
  if (diceNumber !== 1) {
    currentScore += diceNumber;
  } else {
    switchPlayer();
  }
  
  updateUI();
};

// Función para mantener la puntuación
const holdScore = () => {
  if (!isPlaying) return;
  
  scores[activePlayer] += currentScore;
  
  if (scores[activePlayer] >= 100) {
    isPlaying = false;
    winner = activePlayer;
    showVictoryMessage();
  } else {
    switchPlayer();
  }
  
  updateUI();
};

// Event Listeners
btnRoll.addEventListener('click', throwDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', initGame);

// Iniciar juego
initGame();
