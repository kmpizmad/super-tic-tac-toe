function isGameOver(game) {
	const fields = getFields(game.querySelectorAll('.field'));
	const matrix = createMatrix(fields);
	const rotatedMatrix = getRotatedMatrix(matrix);
	const diagonal = getDiagonal(matrix);
	const antiDiagonal = getAntiDiagonal(matrix);

	return (
		checkRows(matrix) ||
		checkRows(rotatedMatrix) ||
		equalValues(diagonal) ||
		equalValues(antiDiagonal)
	);
}

function calculateFieldWin(game, field) {
	const squares = getSquares(field.querySelectorAll('.square'));
	const matrix = createMatrix(squares);
	const rotatedMatrix = getRotatedMatrix(matrix);
	const diagonal = getDiagonal(matrix);
	const antiDiagonal = getAntiDiagonal(matrix);

	const didWin =
		checkRows(matrix) ||
		checkRows(rotatedMatrix) ||
		equalValues(diagonal) ||
		equalValues(antiDiagonal);

	if (didWin) {
		const player = getWinner(game);
		field.classList.add(player);
	}
}

function hasWinner(field) {
	return Array.from(field.classList.values()).findIndex(x => x.includes('winner')) >= 0;
}

function checkRows(matrix) {
	return matrix.some(equalValues);
}

function equalValues(arr) {
	const values = arr.filter(Boolean);
	const set = new Set(values);
	return values.length === 3 && set.size === 1;
}

function getFields(fields) {
	return Array.from(fields).map(field => {
		const classes = Array.from(field.classList.values());
		const playerIndex = classes.findIndex(x => x.includes('winner'));
		return classes[playerIndex] || '';
	});
}

function getSquares(squares) {
	return Array.from(squares).map(square => {
		const classes = Array.from(square.classList.values());
		const playerIndex = classes.findIndex(x => x.includes('player'));
		return classes[playerIndex] || '';
	});
}
