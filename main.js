/********************************************************
 * 	memory game
 ********************************************************/

//game timer
const timer = document.querySelector("#gameplayTime");
const counter = document.querySelector("#movesNumber");
const resetAction = document.querySelector("#reset-btn");
const cards = document.querySelectorAll('.memory-card');
const showScore = document.querySelector("#scoreHoder");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let interval;
var second = 0,
	minute = 0,
	moves = 0,
	totalScore = 0;

function resetGame() {
	clearInterval(interval);
	second = 0;
	minute = 0;
	moves = 0;
	totalScore = 0;
	showScore.innerHTML =  totalScore;
	timer.innerHTML = minute + ":" + second;
	counter.innerHTML =  moves;
	resetBoard();
	shuffle();
}

function startTimer() {
	interval = setInterval(function () {
		timer.innerHTML = minute + ":" + second;
		second++;
		if (second == 60) {
			minute++;
			second = 0;
		}
	}, 1000);
}

function moveCounter() {
	moves++;
	counter.innerHTML = moves;
	//start timer on first move
	if (moves == 1) {
		second = 0;
		minute = 0;
		hour = 0;
		startTimer();
	}
}


function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.add('flip');

	if (!hasFlippedCard) {
		// first click
		moveCounter();
		hasFlippedCard = true;
		firstCard = this;

		return;
	}

	// second click
	secondCard = this;

	checkForMatch();
}

function addScore() {
	totalScore = totalScore + Math.round(6000 - ((second + (minute * 60)) * moves));
	showScore.innerHTML = totalScore;
}

function checkForMatch() {
	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

	isMatch ? disableCards() : unflipCards();
}

function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	resetBoard();
	addScore();
}

function unflipCards() {
	lockBoard = true;

	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		resetBoard();
	}, 1500);
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

function shuffle() {
	cards.forEach(card => {
		setTimeout(() => {
			let randomPos = Math.floor(Math.random() * 12);
			card.style.order = randomPos;
		}, 500);
		card.classList.remove('flip');
		card.addEventListener('click', flipCard);
	});
};

(function startGame() {
	shuffle();
	resetGame();
	resetAction.addEventListener('click', resetGame);
})();




/* end of memory game */