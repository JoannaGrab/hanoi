var from = [],
    spare = [],
    to = [],
    numberOfDiscs;

var fromPeg,
    sparePeg,
    toPeg;

// Take selected discs from user
var discsHTML = document.getElementById("discs");

// Set initial state of towers
discsHTML.onclick = () => setInitialState();

var playButton = document.getElementById("playButton");
playButton.onclick = () => hanoiTower();


function hanoiTower() {
    var moves = Math.pow(2, numberOfDiscs) - 1;

    console.log("before")
    console.log(from)
    console.log(spare)
    console.log(to)

    if (isEven(numberOfDiscs)) {
        while(moves >= 0){
            makeLegalMove(from[from.length-1], spare[spare.length-1], from, spare);
            console.log("mid")
            console.log(from)
            console.log(spare)
            console.log(to)
            drawTowers(true);
            moves--;
            if (moves == 0) break;

            makeLegalMove(from[from.length-1], to[to.length-1], from, to);
            console.log("mid")
            console.log(from)
            console.log(spare)
            console.log(to)
            drawTowers(true);
            moves--;
            if (moves == 0) break;

            makeLegalMove(spare[spare.length-1], to[to.length-1], spare, to);
            console.log("mid")
            console.log(from)
            console.log(spare)
            console.log(to)
            drawTowers(true);
            moves--;
            if (moves == 0) break;
        }
    }
    else {
        while(moves >= 0){
            makeLegalMove(from[from.length-1], to[to.length-1], from, to);
            console.log("mid")
            console.log(from)
            console.log(spare)
            console.log(to)
            drawTowers(true);
            moves--;
            if (moves == 0) break;

            makeLegalMove(from[from.length-1], spare[spare.length-1], from, spare);
            console.log("mid")
            console.log(from)
            console.log(spare)
            console.log(to)
            drawTowers(true);
            moves--;
            if (moves == 0) break;

            makeLegalMove(spare[spare.length-1], to[to.length-1], spare, to);
            console.log("mid")
            console.log(from)
            console.log(spare)
            console.log(to)
            drawTowers(true);
            moves--;
            if (moves == 0) break;
        }
    }
}




///////////////////////////////////////////////////////////////////////////////
// INITIALIZE PEGS
function setInitialState() {
    from.length = 0;
    spare.length = 0;
    to.length = 0;

    numberOfDiscs = discsHTML.value;
    for (let i = numberOfDiscs; i > 0; i--) {
        from.push(+i);
    }
    drawTowers();
}

///////////////////////////////////////////////////////////////////////////////
// CHECK NUMBER
function isEven(number){
    return (number % 2 == 0) ? true : false;
}

///////////////////////////////////////////////////////////////////////////////
// MOVE DISCS
function makeLegalMove(discOne, discTwo, pegOne, pegTwo){
    if (discTwo === undefined) {
        if (discOne !== undefined) {
            pegTwo.push(pegOne.pop());
            drawTowers(true);
        }
    }
    else if (discOne === undefined) {
        if (discTwo !== undefined) {
            pegOne.push(pegTwo.pop());
            drawTowers(true);
        }
    }
    else {
        if (discOne > discTwo) {
            pegOne.push(pegTwo.pop());
            drawTowers();
        }
        else {
            pegTwo.push(pegOne.pop());
            drawTowers(true);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////
// DRAW TOWERS
async function drawTowers(wait) {
    if (wait) {
        for (let i = 0; i < 1000; i++)
        {
            console.log("fed")
        }
    }
    drawFromPeg();
    drawSparePeg();
    drawToPeg();
}

function drawFromPeg() {
    fromPeg = document.getElementById("from-peg");
    from.reverse()
    fromPeg.innerHTML = "";
    for (disc in from) {
        let li = document.createElement("li");
        li.innerHTML = from[disc];
        fromPeg.appendChild(li);
        
    }
    from.reverse()
}

function drawSparePeg() {
    sparePeg = document.getElementById("spare-peg");
    spare.reverse()
    sparePeg.innerHTML = "";
    for (disc in spare) {
        let li = document.createElement("li");
        li.innerHTML = spare[disc];
        sparePeg.appendChild(li);
    }
    spare.reverse()
}

function drawToPeg() {
    toPeg = document.getElementById("to-peg");
    to.reverse()
    toPeg.innerHTML = "";
    for (disc in to) {
        let li = document.createElement("li");
        li.innerHTML = to[disc];
        toPeg.appendChild(li);
    }
    to.reverse()
}