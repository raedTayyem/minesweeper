'use strict';

var gBoard;
var gSize = 4;
var gMine;
var gTime = 0;
var minesAmount = 2;
var firstClick = 0;
var gInterval;
var isHint = false;
var isFlagged = false;
var isOpened = false;
var gHintInterval
var gSmiley;
var gWin;
var gLose;




function init() {
    gTime = 0;
    var mines = document.querySelector('.minesAmount p')
    mines.innerHTML = minesAmount
    

    gBoard = document.querySelector('.mine')
    gSmiley = document.querySelector('.smiley')
    gWin = document.querySelector(".win");
    gLose = document.querySelector(".lose");

    gWin.style.display = 'none';
    gLose.style.display = 'none';
    isFlagged = false;
    isHint = false;
    firstClick = 0;

    clearInterval(gInterval)
    buildMine(gSize)
}



function renderBoard(board) {
    var strHtml = '';
    var cell;
    var className = '';

    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board.length; j++) {
            if (board[i][j].isShown) {
                cell = board[i][j].value;
                className = 'marked';
            } else {
                cell = '';
                className = 'unMarked';
            }
            var tdId = `${i}-${j}`;
            strHtml += `<td id="${tdId}" class="${className}" onclick="cellClicked(this);" 
            oncontextmenu = "flagCell(this.id);">
                            ${cell}
                        </td>`
        }
        strHtml += '</tr>';
    }
    gBoard.innerHTML = strHtml;
}



function addMines(gMine) {
    for (var i = 0; i < (minesAmount); i++) {
        var row = getRandomInt(gSize);
        var col = getRandomInt(gSize);
        var mineBoard = gMine[row][col]
        if (mineBoard.isMine || mineBoard.isShown) {
            i--;
            continue;
        }
        mineBoard.value += '💣';
        mineBoard.isMine = true;
    }
}



function cellClicked(cell) {
    gSmiley.innerHTML = '😲'
    var Id = cell.id;
    var cellId = []
    cellId = Id.split('-').map(Number);
    var cell = gMine[cellId[0]][cellId[1]]
    if (isHint) {
        openForSec(gMine, cellId[0], cellId[1]);
        renderBoard(gMine)
        setTimeout(function () {
            isHint = false
            closeNegs(gMine, cellId[0], cellId[1])
            renderBoard(gMine)
        }, 1000);
        return;
    };

    if (cell.isMine && !cell.isShown) {
        lose()
    }
    if (cell.value === '') {
        openNegs(gMine, cellId[0], cellId[1])
    }

    cell.isShown = true;
    if (firstClick === 0) {
        addMines(gMine);
        setMinesNegsCount(gMine);
        time();
        firstClick++;
    }

    renderBoard(gMine)
    win()
}



function boardSize(value) {
    firstClick = 0;
    if (value === 'Beginner') {
        gSize = 4;
        minesAmount = 2;
    } else if (value === 'Medium') {
        gSize = 8;
        minesAmount = 12;
    } else if (value === 'Expert') {
        gSize = 12;
        minesAmount = 30;
    }
    

    init()
}



function hint(btn) {
    if (firstClick === 0) return;
    isHint = true;
    setTimeout(function () {
        document.getElementById(btn).remove()
    }, 1000)
}



function openNegs(mat, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].value === '') {
                mat[i][j].isShown = true;
            }
        }
    }
}


function openForSec(mat, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue;
            if(!mat[i][j].isShown){
                mat[i][j].isShown = true;
                mat[i][j].isOpened = true;
            }
        }
    }
}


function closeNegs(mat, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue;
            if(mat[i][j].isOpened){
                mat[i][j].isShown = false;
                mat[i][j].isOpened = false;
            }
        }
    }
}


function flagCell(Id) {
    var cellId = []
    cellId = Id.split('-').map(Number);
    var cell = gMine[cellId[0]][cellId[1]]
    if (cell.isFlagged) {
        document.getElementById(Id).innerHTML = ''
        cell.isFlagged = false
    } else if (!cell.isShown) {
        document.getElementById(Id).innerHTML = '🚩'
        cell.isFlagged = true
    }
}