class Problem {
    constructor(type, vars) {
        this.type = type;
        this.vars = vars;
    }
}

var processbase = {
    "third.multiply.simple.twovar": {
        1: "First, we look at our two numbers ``..a..`` and ``..b..``.",
        2: "Then, we have ``..a/b..``."
    }
}

let exampleproblem = new Problem("third.multiply.simple.twovar", { a: 3, b: 7 });

function makeSolveObject(problem) {
    let output = {};
    for(let w = 0; w < Object.keys(processbase[problem.type]).length; w++) {
        var parse = processbase[problem.type][w+1].split("``")
        for(let i = 0; i < parse.length; i++) {
            if(parse[i][0] == "~" && problem.vars[parse[i].slice(1)]) {
                parse[i] = `~[${problem.vars[parse[i].slice(1)]}]`;
            }
        }
        output[w+1] = parse //.join('');
    }
    return output;
}

function displayInstructions(problem) {
    var steps = makeSolveObject(problem)
    for(let i = 1; i < Object.keys(steps).length+1; i++) {
        document.write(steps[i] + "<br/>")
    }
}
displayInstructions(exampleproblem)