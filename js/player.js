function getPlayer(game) {
	switch (game.dataset.player) {
		default:
		case 'x':
			return 'player-x';
		case 'o':
			return 'player-o';
	}
}

function getNextPlayer(game) {
	switch (game.dataset.player) {
		default:
		case 'x':
			return 'o';
		case 'o':
			return 'x';
	}
}

function getWinner(game) {
	switch (game.dataset.player) {
		default:
		case 'x':
			return 'winner-x';
		case 'o':
			return 'winner-o';
	}
}
