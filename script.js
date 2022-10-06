'use strict';
// select element
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const currentel0 = document.querySelector('#current--0');
const currentel1 = document.getElementById('current--1');
const playeractive0 = document.querySelector('.player--0');
const playeractive1 = document.querySelector('.player--1');

const diceel = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');

let score, currentscore, activeplayer, playing;
// function to init
const init = function () {
  currentscore = 0;
  activeplayer = 0;
  score = [0, 0];
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  currentel0.textContent = 0;
  currentel1.textContent = 0;
  diceel.classList.add('hidden');

  playeractive0.classList.add('player--active');
  playeractive1.classList.remove('player--active');
  playeractive0.classList.remove('player--winner');
  playeractive1.classList.remove('player--winner');
};
init();

// switching player
const switchplayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentscore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  playeractive0.classList.toggle('player--active');
  playeractive1.classList.toggle('player--active');
};

btnroll.addEventListener('click', function () {
  // 1. Generating a random dice roll
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceel.classList.remove('hidden');
    diceel.src = `dice-${dice}.png`;
    // 3. Check for rolled 1
    if (dice !== 1) {
      currentscore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentscore;
    } else {
      switchplayer();
    }
  }
});
btnhold.addEventListener('click', function () {
  if (playing) {
    score[activeplayer] += currentscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      score[activeplayer];
    //     if(activeplayer===0){
    //         toatalscore1+=currentscore
    //         score0.textContent=toatalscore1
    //     }else {
    //         toatalscore2+=currentscore
    // score1.textContent=toatalscore2
    //     }

    if (score[activeplayer] >= 20) {
      playing = false;
      diceel.classList.add('hidden');

      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');

      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
    } else {
      switchplayer();
    }
  }
});
btnnew.addEventListener('click', init);
