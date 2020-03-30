'use strict';

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
    if (gLives > 1) {
        gLives--
        document.getElementById(`Heart${gLives}`).remove()
    } else {
        for (var i = 0; i < gSize; i++) {
            for (var j = 0; j < gSize; j++) {
                if (gMine[i][j].isMine) {
                    gMine[i][j].isShown = true
                    gSmiley.innerHTML = '😔'
                }
            }
        }
        gLose.style.display = 'block';
    }
}


function restart() {
    clearInterval(gTimeInterval)
    init();
}