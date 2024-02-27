const gameEl = document.getElementById('game');
const playerEl = document.getElementById('player');
const newGameEl = document.getElementById('new-game');
const gameOverEl = document.getElementById('gameover');

const fields = Array.from(document.querySelectorAll('.field'));
const squares = document.querySelectorAll('.square');

squares.forEach(square => {
	square.addEventListener('click', function () {
		const squareId = Array.from(this.classList).at(-1);
		let fieldId = squareId.at(-1) - 1;
		const nextField = fields.at(fieldId);

		// Assign current player to square
		const player = getPlayer(gameEl);
		square.classList.add(player);

		// Check for field win
		this.parentElement.classList.remove('active');
		calculateFieldWin(gameEl, this.parentElement);

		// Reset active field if it already has a winner
		if (hasWinner(nextField)) {
			fieldId = -1;
		}

		// Check for gameover
		if (isGameOver(gameEl)) {
			console.log('Game over');
			gameOverEl.classList.add('show');
		} else {
			const nextPlayer = getNextPlayer(gameEl);
			nextField.classList.add('active');
			playerEl.dataset.player = nextPlayer;
			gameEl.dataset.active = fieldId;
			gameEl.dataset.player = nextPlayer;
		}
	});
});

newGameEl.addEventListener('click', () => {
	window.location.reload();
});
