var from = [],
    spare = [],
    to = [],
    numberOfDiscs;

// Take selected discs from user
var discsHTML = document.getElementById("discs");

// Assign value to numberOfDiscs and update "from" peg according to user selection
function initialState() {
    numberOfDiscs = discsHTML.value;
    for (let i = 0; i < numberOfDiscs; i++) {
        from.push(i+1);
    }
    drawTowers();
}

// Draw initial state of towers
discsHTML.onclick = () => initialState();

// Play button
var playButton = document.getElementById("playButton");
playButton.onclick = () => hanoiTower();

function drawTowers() {
    let fromPeg = document.getElementById("from-peg");
    fromPeg.innerHTML = "";
    for (disc in from) {
        let li = document.createElement("li");
        li.innerHTML = from[disc];
        fromPeg.appendChild(li);
    }
    from.length = 0;

    let sparePeg = document.getElementById("spare-peg");
    sparePeg.innerHTML = "";
    for (disc in spare) {
        let li = document.createElement("li");
        li.innerHTML = spare[disc];
        sparePeg.appendChild(li);
    }
    spare.length = 0;

    let toPeg = document.getElementById("to-peg");
    toPeg.innerHTML = "";
    for (disc in to) {
        let li = document.createElement("li");
        li.innerHTML = to[disc];
        toPeg.appendChild(li);
    }
    to.length = 0;
}



function makeLegalMove(discOne, discTwo, pegOne, pegTwo){
    // if Two peg is empty
     if (discTwo === undefined) {
        // if One peg isn't empty
        if (discOne !== undefined) {
            // console.log(`can make legal move from discOne: ${discOne} to discTwo: ${discTwo}`);
            pegTwo.push(pegOne.pop());
        }
    }
    // if One peg is empty
    else if (discOne === undefined) {
        // if Two peg isn't empty
        if (discTwo !== undefined) 
        {
            // console.log(`can make legal move from discTwo: ${discTwo} to discOne: ${discOne}`);
            pegOne.push(pegTwo.pop());
        }
    }
    // if both pegs aren't empty
    else {
        // console.log(`pegs aren't empty`);
        // discOne is greater than discTwo -> can't move
        if (discOne > discTwo) {
            // console.log(`discOne > discTwo: ${discOne} > ${discTwo}, can't move`);
            pegOne.push(pegTwo.pop());
        }
        // discOne is less than discTwo -> can move
        else {
            // console.log(`discOne < discTwo: ${discOne} < ${discTwo}, can move`);
            pegTwo.push(pegOne.pop());
        }
    }
}


function isEven(number){
    return (number % 2 == 0) ? true : false;
}

// ITERATIVE SOLUTION
function hanoiTower() {

    var moves = Math.pow(2, numberOfDiscs) - 1;

    console.log("before")
    console.log(from)
    console.log(spare)
    console.log(to)

    if (isEven(numberOfDiscs)) {
        while(moves >= 0){
            // console.log(`discOne is on peg: ${from} (from), discTwo is on peg: ${spare} (spare)`);
            makeLegalMove(from[from.length-1], spare[spare.length-1], from, spare);
            moves--;
            if (moves == 0) break;

            // console.log(`discOne is on peg: ${from} (from), discTwo is on peg: ${to} (to)`);
            makeLegalMove(from[from.length-1], to[to.length-1], from, to);
            moves--;
            if (moves == 0) break;

            // console.log(`discOne is on peg: ${spare} (spare), discTwo is on peg: ${to} (to)`);
            makeLegalMove(spare[spare.length-1], to[to.length-1], spare, to);
            moves--;
            if (moves == 0) break;
        }
    }
    else {
        while(moves >= 0){
            // console.log(`discOne is on peg: ${from} (from), discTwo is on peg: ${to} (to)`);
            makeLegalMove(from[from.length-1], to[to.length-1], from, to);
            moves--;
            if (moves == 0) break;

            // console.log(`discOne is on peg: ${from} (from), discTwo is on peg: ${spare} (spare)`);
            makeLegalMove(from[from.length-1], spare[spare.length-1], from, spare);
            moves--;
            if (moves == 0) break;

            // console.log(`discOne is on peg: ${spare} (spare), discTwo is on peg: ${to} (to)`);
            makeLegalMove(spare[spare.length-1], to[to.length-1], spare, to);
            moves--;
            if (moves == 0) break;
        }
    }

    console.log("after")
    console.log(from)
    console.log(spare)
    console.log(to)
}
