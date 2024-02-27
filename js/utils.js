function createMatrix(squares) {
	const matrix = [];
	let k = 0;

	for (let i = 0; i < 3; i++) {
		matrix[i] = [];
		for (let j = 0; j < 3; j++) {
			matrix[i][j] = squares[k];
			k++;
		}
	}

	return matrix;
}

function getRotatedMatrix(matrix) {
	const rotatedMatrix = [];

	for (let i = 0; i < matrix.length; i++) {
		rotatedMatrix[i] = [];
		for (let j = 0; j < matrix[i].length; j++) {
			rotatedMatrix[i][j] = matrix[j][i];
		}
	}

	return rotatedMatrix;
}

function getDiagonal(matrix) {
	const diagonal = [];

	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			if (i !== j) continue;
			diagonal.push(matrix[i][j]);
		}
	}

	return diagonal;
}

function getAntiDiagonal(matrix) {
	const rotatedMatrix = getRotatedMatrix(matrix);
	const antiDiagonal = getDiagonal(rotatedMatrix);

	return antiDiagonal;
}
