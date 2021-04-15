const refreshRate = 1000;
let state;
const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
// Take selected discs from user
var discsHTML = document.getElementById("discs");

// Set initial state of towers
discsHTML.onclick = () => {
    state = initialState(discsHTML.value);
    drawTowers(state);
};

var playButton = document.getElementById("playButton");
playButton.onclick = async () => {
    hanoiTower(async () => {
        await sleep(refreshRate).then(v => null);
        debugState(state, "mid");
        drawTowers(state);
    })
};


async function hanoiTower(onMoveMade) {
    var moves = Math.pow(2, state.numberOfDiscs) - 1;

    debugState(state, "before");

    if (isEven(state.numberOfDiscs)) {
        while(moves >= 0){
            await makeLegalMove(state.from[state.from.length-1], state.spare[state.spare.length-1], state.from, state.spare, onMoveMade);
            moves--;
            if (moves == 0) break;
            await makeLegalMove(state.from[state.from.length-1], state.to[state.to.length-1], state.from, state.to, onMoveMade);
            moves--;
            if (moves == 0) break;
            await makeLegalMove(state.spare[state.spare.length-1], state.to[state.to.length-1], state.spare, state.to, onMoveMade);
            moves--;
            if (moves == 0) break;
        }
    }
    else {
        while(moves >= 0){
            await makeLegalMove(state.from[state.from.length-1], state.to[state.to.length-1], state.from, state.to, onMoveMade);
            moves--;
            if (moves == 0) break;
            await makeLegalMove(state.from[state.from.length-1], state.spare[state.spare.length-1], state.from, state.spare, onMoveMade);
            moves--;
            if (moves == 0) break;
            await makeLegalMove(state.spare[state.spare.length-1], state.to[state.to.length-1], state.spare, state.to, onMoveMade);
            moves--;
            if (moves == 0) break;
        }
    }
}

function debugState(state, where){
    console.log(where);
    console.log(state.from);
    console.log(state.spare);
    console.log(state.to);
}


///////////////////////////////////////////////////////////////////////////////
// INITIALIZE PEGS
function initialState(numberOfDiscs) {
    state = {
        from: initializePeg(numberOfDiscs),
        spare: [],
        to: [],
        numberOfDiscs: numberOfDiscs,
    };
    return state;
}

function initializePeg(numberOfDiscs){
    peg = [];
    for (let i = numberOfDiscs; i > 0; i--) {
        peg.push(+i);
    }
    return peg;
}

///////////////////////////////////////////////////////////////////////////////
// CHECK NUMBER
function isEven(number){
    return (number % 2 == 0) ? true : false;
}

///////////////////////////////////////////////////////////////////////////////
// MOVE DISCS
async function makeLegalMove(discOne, discTwo, pegOne, pegTwo,onMoveMade){
    if (discTwo === undefined && discOne !== undefined) {
        pegTwo.push(pegOne.pop());
    }
    else if (discOne === undefined && discTwo !== undefined) {
        pegOne.push(pegTwo.pop());
    }
    else if (discOne > discTwo) {
        pegOne.push(pegTwo.pop());
    }
    else {
        pegTwo.push(pegOne.pop());
    }
    // TODO: check if func
    if (onMoveMade) {
        await onMoveMade();
    }
}

///////////////////////////////////////////////////////////////////////////////
// DRAW TOWERS
function drawTowers(state) {
    drawPeg("from-peg", state.from);
    drawPeg("spare-peg", state.spare);
    drawPeg("to-peg", state.to);
}

function drawPeg(peg, discs) {
    peg = document.getElementById(peg);
    peg.innerHTML = "";
    for (let i = discs.length - 1; i >= 0; i--) {
        let li = document.createElement("li");
        li.innerHTML = discs[i];
        peg.appendChild(li);
    }
}
