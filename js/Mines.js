function setMinesNegsCount(mine) {
    for (var i = 0; i < gSize; i++) {
        for (var j = 0; j < gSize; j++) {
            mine[i][j].value += countMines(i, j, mine)
        }
    }
}



function countMines(cellI, cellJ, mat) {
    var minesNegsCount = 0;
    if (mat[cellI][cellJ].isMine) return '';
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isMine) {
                minesNegsCount++
            }
        }
    }
    if (minesNegsCount === 0) return '';
    return minesNegsCount;
}