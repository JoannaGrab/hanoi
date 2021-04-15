////////////////////////////////////////////////////////////////////////
// HANOI RECURSIVE SOLUTION

var discs = 3,
    from = [3,2,1],
    spare = [],
    to = [];
   
function hanoi(discs, from,spare,to) {
    if (discs == 0) {
        return
    }

    hanoi(discs-1, from,to,spare)
    to.push(from.pop())
    hanoi(discs-1, spare,from,to)
}

console.log("before")
console.log(from)
console.log(spare)
console.log(to)

hanoi(discs, from, spare, to)

console.log("after")
console.log(from)
console.log(spare)
console.log(to)