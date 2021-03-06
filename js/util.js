'use strict';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function buildMine(size) {
    gMine = [];
    for (var i = 0; i < size; i++) {
        gMine[i] = [];
        for (var j = 0; j < size; j++) {
            gMine[i][j] = {
                value: '',
                isShown: false,
                isMine: false
            };
        }
    }
    renderBoard(gMine);
}