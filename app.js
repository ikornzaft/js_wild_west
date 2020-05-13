var activeBandit, startTime, elapsedTime, timeLimit, totalScore, pause, round, flower;

var hiscore = 0;

document.addEventListener('keypress', init);

function game() {
    document.getElementById('message').style.visibility = "hidden";
    document.getElementById('message').style.color = "darkred";
    document.removeEventListener('keypress', init);
    redraw();
    
    var drawTime = Math.floor(Math.random() * (1500 - 500)) + 500;
    
    // Si alcancó al round 5 introduce la flor    
    if (round < 6) {
        window.setTimeout(chooseBanditEasy, drawTime);
    } else {
        window.setTimeout(chooseBanditHard, drawTime)
    };
    
    var timeBeforeDead = window.setTimeout(timeOut, timeLimit + drawTime);
        
    document.addEventListener('keypress', validKey);
        

    // Verifica si el tiro es válido
    function validKey(event) {
        window.clearTimeout(timeBeforeDead);
        document.removeEventListener('keypress', validKey);
        if (flower === true) {
            document.getElementById('bandit-' + activeBandit).src = 'img/bandit' + activeBandit + '-rip.png';
            document.getElementById('sheriff').src = 'img/sheriff-shame.png';
            document.getElementById('message').style.visibility = 'visible';
            document.getElementById('message').textContent = 'Shame on you!';
            if (totalScore > hiscore) {
                hiscore = totalScore;
            };
            document.getElementById('hiscore').textContent = 'HI Score: ' + hiscore;
            //document.addEventListener('keypress', init);
            window.setTimeout(anyKey,1000);
        } else {
            if (event.keyCode === 49 || event.which === 49) {
                checkShot(0);
            } else if (event.keyCode === 50 || event.which === 50) {
                checkShot(1);
            } else if (event.keyCode === 51 || event.which === 51) {
                checkShot(2);
            } else {
                dead();
            };            
        };
    };
    
    
    // Demasiado lento
    function timeOut() {
        document.removeEventListener('keypress', validKey);
        if (flower === true) {
            flower = false;
            document.getElementById('message').style.visibility = 'visible';
            document.getElementById('message').style.color = 'green';
            document.getElementById('message').textContent = 'Nice!';
            window.setTimeout(game, pause);
        } else {
            document.getElementById('message').style.visibility = 'visible';
            document.getElementById('message').textContent = 'Too slow!';
            document.getElementById('sheriff').src = 'img/sheriff-rip.png';
            document.getElementById('bandit-' + activeBandit).src = 'img/bandit' + activeBandit + '-shoot.png';
            if (totalScore > hiscore) {
                hiscore = totalScore;
            };
            document.getElementById('hiscore').textContent = 'HI Score: ' + hiscore;
            window.setTimeout(anyKey,1000);
        };
    };
    
};



/************
FUNCTIONS
*/

// Inicializa
function init(event) {    
    round = 1;
    timeLimit = 1000;
    totalScore = 0;
    pause = 1500;
    flower = false;
    document.getElementById('message').style.visibility = 'hidden';
    document.getElementById('any_key').style.visibility = 'hidden';
    document.getElementById('actualScore').textContent = '0';    
    game();
};


// Redibuja los personajes 
function redraw() {
    for (i = 0; i < 3; i++) {
            document.getElementById('bandit-' + i).src = 'img/bandit' + i + '-still.png';
    };
    document.getElementById('sheriff').src = 'img/sheriff-still.png';
};


// Elige el bandido 
function chooseBanditEasy() {
    activeBandit = Math.floor(Math.random()*3);
    document.getElementById('bandit-' + activeBandit).src = 'img/bandit' + activeBandit + '-draw.png';
    startTime = Date.now();
    return activeBandit, startTime;
}


// Elige el bandido o la flor
function chooseBanditHard() {
    activeBandit = Math.floor(Math.random()*3);
    startTime = Date.now();
    if (Math.floor(Math.random()*3) === 0) {
        flower = true;
        document.getElementById('bandit-' + activeBandit).src = 'img/bandit' + activeBandit + '-rose.png';
        return activeBandit, startTime;
    } else {
        document.getElementById('bandit-' + activeBandit).src = 'img/bandit' + activeBandit + '-draw.png';
        return activeBandit, startTime;
    };
}



// Chequea el tiro del jugador
function checkShot(choice) {
    var speedOfShot = checkTime(startTime);
    
    if (choice === activeBandit && speedOfShot < timeLimit) {
        document.getElementById('bandit-' + activeBandit).src = 'img/bandit' + activeBandit + '-rip.png';
        document.getElementById('sheriff').src = 'img/sheriff-smile.png';
        
        if (speedOfShot < 330) {
            totalScore = totalScore + 40;
            document.getElementById('message').style.visibility = 'visible';
            document.getElementById('message').style.color = 'green';
            document.getElementById('message').textContent = 'Excellent!';
        } else if (speedOfShot < 360) {
            totalScore = totalScore + 20;
            document.getElementById('message').style.visibility = 'visible';
            document.getElementById('message').style.color = 'green';
            document.getElementById('message').textContent = 'Great!';
        } else {
                totalScore = totalScore + 10;
        };
        
        document.getElementById('actualScore').textContent = totalScore;
        timeLimit = timeLimit - 20;
        pause = pause - 40;
        round++;
        window.setTimeout(game, pause);
    } else {
        document.getElementById('bandit-' + choice).src = 'img/bandit' + choice + '-rip.png';
        dead();
    }
    
};


// Calcula el tiempo del disparo
function checkTime(t) {
    elapsedTime = Date.now() - t;
    return elapsedTime;
};



// Muerte
function dead() {
    document.getElementById('sheriff').src = 'img/sheriff-rip.png';
    document.getElementById('bandit-' + activeBandit).src = 'img/bandit' + activeBandit + '-shoot.png';
    //document.getElementById('message').style.display = 'block';
    document.getElementById('message').style.visibility = 'visible';
    document.getElementById('message').textContent = 'You are dead!';
    if (totalScore > hiscore) {
        hiscore = totalScore;
    };
    document.getElementById('hiscore').textContent = 'HI Score: ' + hiscore;
    //document.addEventListener('keypress', init);
    window.setTimeout(anyKey, 1000);
}


// Any Key
function anyKey() {
    document.getElementById('any_key').style.visibility = 'visible';
    document.addEventListener('keypress', init);
}