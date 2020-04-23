//globals
var timeElapsed = '';
var started = false;
var interval;
var h = 0;
var m = 0;
var s = 0;
var ms = 0;


//functions definition
function pad(time) {
    if (time.length > 1) {
        return time;
    }

    time = '0' + time;
    return time;
}

function getTime() {

    ms++;

    if (ms > 99) {
        ms = 0;
        s++;
    }
    if (s > 59) {
        s = 0;
        m++;
    }
    if (m > 59) {
        m = 0;
        h++;
    }
    if (h > 23)
        clearTimeout(interval);

    return pad(h.toString()) + ":" + pad(m.toString()) + ":" + pad(s.toString()) + ":" + pad(ms.toString());
}

function startStop() {
    if (started == false) {
        interval = setInterval(function () {
            timeElapsed = getTime();
            document.getElementById("time").innerHTML = timeElapsed;
        }, 1);
        started = true;
        document.getElementById("start").innerHTML = "Stop";
    } else {
        clearTimeout(interval);
        started = false;
        document.getElementById("start").innerHTML = "Start";
    }
}

function reset() {
    clearInterval(interval);
    started = false;
    h = 0;
    m = 0;
    s = 0;
    ms = 0;
    timeElapsed = '';
    document.getElementById('time').innerHTML = '00:00:00:00';
    document.getElementById('records').innerHTML = '';
}


function records() {
    if (timeElapsed) {
        var span = document.createElement('LI');
        document.getElementById('records').appendChild(span).innerHTML = timeElapsed;
    }
}

function setUp() {
    document.getElementById('start').addEventListener('click', function () {
        startStop();
    });
    document.getElementById('reset').addEventListener('click', function () {
        reset();
    });
    document.getElementById('lap').addEventListener('click', function () {
        records();
    });
}
