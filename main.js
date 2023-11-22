const players = ["x", "o"];
let currentPlayer;

startGame();

function startGame() {
  selectZone();

  document.querySelectorAll(".field").forEach(field => {
    field.addEventListener("click", () => {
      field.appendChild(getNextPlayer());
      field.classList.add("taken");

      const currentZone = field.parentElement;
      if (didPlayerWin(currentZone)) currentZone.classList.add(`${currentPlayer}-win`, "full");
      else if (isZoneFull(currentZone)) currentZone.classList.add("tie");

      if (didPlayerWin()) {
        console.log(`${currentPlayer} has won`);
        return;
      }

      const nextZone = document.getElementById(field.dataset.targetZone);
      selectZone(nextZone);
      if (isZoneFull(nextZone)) selectAnyZone();
    });
  });
}

function selectZone(zone) {
  const zones = document.querySelectorAll(".zone");
  if (!zone) zones.forEach(zone => zone.classList.add("active"));
  else {
    zones.forEach(zone => zone.classList.remove("active"));
    zone.classList.add("active");
  }
}

function selectAnyZone() {
  document.querySelectorAll(".zone").forEach(z => {
    if (!z.classList.contains("full")) z.classList.add("active");
    else z.classList.remove("active");
  });
}

function getNextPlayer() {
  const getNextPlayerSymbol = () => {
    let nextPlayerIndex = players.findIndex(x => x === currentPlayer);
    if (nextPlayerIndex === -1) nextPlayerIndex = -1;
    nextPlayerIndex++;
    return nextPlayerIndex >= players.length ? players[0] : players[nextPlayerIndex];
  };

  currentPlayer = getNextPlayerSymbol();

  const symbol = document.createElement("img");
  symbol.src = `./public/${currentPlayer}.svg`;

  document.getElementById("symbol").src = `./public/${getNextPlayerSymbol()}.svg`;

  return symbol;
}

function didPlayerWin(zone) {
  const fields = !zone ? document.querySelectorAll(".zone") : zone.querySelectorAll(".field");
  const size = fields.length / 3;
  const matrix = [];
  let k = 0;

  for (let i = 0; i < size; i++) {
    matrix[i] = [];
    for (let j = 0; j < size; j++) {
      if (!zone) {
        const bi = window.getComputedStyle(fields[k], false);
        matrix[i][j] = bi.backgroundImage.slice(4, -1).replace(/"/g, "");
      } else {
        matrix[i][j] = fields[k].children[0]?.src || "";
      }
      k++;
    }
  }

  if (!zone) console.log(matrix);

  const rotatedMatrix = [];
  for (let i = 0; i < size; i++) {
    rotatedMatrix[i] = [];
    for (let j = 0; j < size; j++) {
      rotatedMatrix[i][j] = matrix[j][i];
    }
  }

  const getDiagonal = m => {
    return m
      .map((row, rowIndex) => {
        return row.map((col, colIndex) => {
          if (rowIndex === colIndex) return col;
          return "";
        });
      })
      .flat()
      .filter(x => !!x);
  };

  const isDiagonal = m => {
    const d = getDiagonal(m);
    if (d.length < 3) return false;
    const diagonal = new Set(d);
    return diagonal.size === 1;
  };

  const setsOfThree = m => {
    return m.some(x => {
      if (x.filter(val => !!val).length < 3) return false;
      const s = new Set(x);
      return s.size === 1;
    });
  };

  return (
    setsOfThree(matrix) ||
    setsOfThree(rotatedMatrix) ||
    isDiagonal(matrix) ||
    isDiagonal(matrix.map(x => [...x].reverse()))
  );
}

function isZoneFull(zone) {
  const fields = Array.from(zone.querySelectorAll(".field"));
  return fields.every(field => field.classList.contains("taken")) || zone.classList.contains("full");
}
