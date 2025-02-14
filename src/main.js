import "./style.css";

document.querySelector("#app").innerHTML = `
    <main>
      <section class="player player--0 player--active">
        <h2 class="name" id="name--0">Player 1</h2>
        <p class="score" id="score--0">43</p>
        <div class="current">
          <p class="current-label">Current</p>
          <p class="current-score" id="current--0">3</p>
        </div>
      </section>
      <section class="player player--1">
        <h2 class="name" id="name--1">Player 2</h2>
        <p class="score" id="score--1">24</p>
        <div class="current">
          <p class="current-label">Current</p>
          <p class="current-score" id="current--1">5</p>
        </div>
      </section>

      <img src="dice" alt="Playing dice" class="dice" />
      <button class="btn btn--new">🔄 New game</button>
      <button class="btn btn--roll">🎲 Roll dice</button>
      <button class="btn btn--hold">📥 Hold</button>
    </main>

`;

// variables de estado en JS y selectores DOMXS

// activePlayer -> variable de estado en JS
const sectionPlayer0 = document.querySelector(".player--0");
const sectionPlayer1 = document.querySelector(".player--1");
// score = [0,0] -> variable de estado en JS
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");

// current -> variable de estado en JS
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");
const imgDice = document.querySelector(".dice");
let score, currentScore, activePlayer;

const initData = () => {
  // init state variables
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  // init DOM elements
  /*
  console.log(sectionPlayer0, "sectionPlayer0");
  console.log(score0, "score0");
  console.log(score1, "score1");
  console.log(currentScore0, "currentScore0");
  console.log(currentScore1, "currentScore1");
  */
  console.log(btnRoll);
  console.log(imgDice, "imgDice");
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  imgDice.classList.add("hidden");

  btnRoll.addEventListener("click", thorwDice);
};

initData();
function thorwDice() {
  // 1. Generar un número aleatorio entre 1 y 6
  const numberDice = Math.trunc(Math.random() * 6) + 1;

  // 2. Mostrar la imagen del dado correspondiente
  imgDice.classList.remove("hidden");
  imgDice.src = `dice-${numberDice}.png`;

  if(numberDice != 1) {
    currentScore += numberDice;
    if(activePlayer == 0){
      currentScore0.textContent = currentScore;
    }
    else{
      currentScore1.textContent = currentScore;
    }
  }
}
