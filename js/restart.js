function win() {
    for (var i = 0; i < gSize; i++) {
        for (var j = 0; j < gSize; j++) {
            if (!gMine[i][j].isShown && !gMine[i][j].isMine) {
                return;
            }
        }
    }
    gSmiley.innerHTML = '😎'
    gWin.style.display = 'block';
}



function lose() {
    for (var i = 0; i < gSize; i++) {
        for (var j = 0; j < gSize; j++) {
            if (gMine[i][j].isMine) {
                gMine[i][j].isShown = true
                gSmiley.innerHTML = '😔'
            }
        }
    }
    debugger
    gLose.style.display = 'block';
}


function restart() {
    init();
}