const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const diceEl = document.getElementById('dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

let scores, currentScore, activePlayer, playing

const init = function() {
    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    playing = true

    score0El.textContent = 0
    score1El.textContent = 0
    current0El.textContent = 0
    current1El.textContent = 0

    diceEl.classList.add('hidden')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
}

init()

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    currentScore = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

const dicex = function() {
    if (playing) {


        const dice = Math.trunc(Math.random() * 6) + 1
        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${dice}.png`


        if (dice !== 1) {
            currentScore += dice

            document.getElementById(`current--${activePlayer}`).textContent = currentScore


        } else {
            //switch next player

            switchPlayer()
        }
    }

}

btnRoll.addEventListener('click', dicex)

btnHold.addEventListener('click', function() {

    //add current score to active player's score 
    scores[activePlayer] += currentScore
        // this equals scores[1] = scores[1] + currentScore or scores[0] = scores[0] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
        // check if palyer's score is >= 30
    if (scores[activePlayer] >= 30) {
        playing = false
        diceEl.classList.add('hidden')

        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')

        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')

    } else {
        //switch to the next player
        switchPlayer()

    }

})

btnNew.addEventListener('click', init)