'use strict';

//DOM Cache
const compNumberDiv = document.getElementById('answer');
const guessForm = document.getElementById('guessForm');
const userNumberInput = document.getElementById('guess');

const attemptDiv = document.querySelector('.result');

const historyContainer = document.querySelector('.history--container');
const historyList = document.querySelector('.history__list');
const historyToggleBtn = document.querySelector('.history--btn');

const newGameButton = document.querySelector('.btn-new');

// Functions
function setupEventListeners() {
	guessForm.addEventListener('submit', (e) => {
		e.preventDefault();

		if (!isPlaying) return;

		userNum = userNumberInput.valueAsNumber;

		if (userNum) compare(userNum, computerNumber);

		guessForm.reset();
	});

	historyToggleBtn.addEventListener('click', toggleHistory);

	newGameButton.addEventListener('click', startGame.bind(this, 1000));
}

function compare(userNumber, compNumber) {
	if (userNumber < compNumber) {
		attemptDiv.innerText = `Higher🔼`;
		attempt++;
		addHistory();
	} else if (userNumber > compNumber) {
		attemptDiv.innerText = `Lower🔽`;
		attempt++;
		addHistory();
	} else if (userNumber === compNumber) {
		isPlaying = false;
		compNumberDiv.innerText = compNumber;
		attemptDiv.innerText = `You got it right. It took ${attempt} tr${attempt == 1 ? 'y' : 'ies'}.`;
		historyContainer.classList.remove('history__showing');
		historyToggleBtn.innerHTML = '&LeftAngleBracket;';
	}
}

function addHistory() {
	// 1. Add history element
	const prevGuess = document.createElement('li');
	prevGuess.className = 'history-item';
	prevGuess.id = `history-item-${attempt}`;

	prevGuess.innerHTML = `<b>${attempt}.</b> ${attemptDiv.innerText} (${userNum})`;
	historyList.appendChild(prevGuess);

	// 2. Scroll history element into view
	if (historyContainer.classList.contains('history__showing')) prevGuess.scrollIntoView({ behavior: 'smooth' });
	else setTimeout(() => prevGuess.scrollIntoView({ behavior: 'smooth' }), 300);

	// 3. Toggle history list
	historyContainer.classList.add('history__showing');
	historyToggleBtn.innerHTML = '&RightAngleBracket;';
}

function clearHistory() {
	historyList.innerHTML = '';
}
function toggleHistory() {
	if (!historyContainer.classList.contains('history__showing')) {
		historyContainer.classList.add('history__showing');
		historyToggleBtn.innerHTML = '&RightAngleBracket;';
	} else {
		historyContainer.classList.remove('history__showing');
		historyToggleBtn.innerHTML = '&LeftAngleBracket;';
	}
}

function startGame(maxNumber = 100) {
	computerNumber = Math.round(Math.random() * maxNumber) + 1;
	isPlaying = true;
	attempt = 0;

	guessForm.reset();

	attemptDiv.textContent = '';
	compNumberDiv.textContent = '???';
	historyContainer.classList.remove('history__showing');
	historyToggleBtn.innerHTML = '&LeftAngleBracket;';

	clearHistory();

	userNumberInput.focus();
	setupEventListeners();
}

//Variables
let userNum, computerNumber;
let isPlaying = true;
let attempt;

// Game Start
startGame(1000);
