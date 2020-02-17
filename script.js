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
};

let exampleproblem = new Problem("third.multiply.simple.twovar", {
  a: 3,
  b: 7
});

function parseSolveObject(problem) {
  let output = {};
  for (let w = 0; w < Object.keys(processbase[problem.type]).length; w++) {
    var parse = processbase[problem.type][w + 1].split("``");
    for (let i = 0; i < parse.length; i++) {
      if (parse[i][0] == "~" && problem.vars[parse[i].slice(1)]) {
        parse[i] = `~[${problem.vars[parse[i].slice(1)]}]`;
      }
    }
    output[w + 1] = parse; //.join('');
  }
  return output;
}

function makeDisplayArray(problem) {
  var steps = parseSolveObject(problem);
  var displayArray = [];

  for (let i = 1; i < Object.keys(steps).length + 1; i++) {
    let tempPart = [];
    for (let j = 0; j < Object.keys(steps[i]).length; j++) {
      let tempobj = { content: "", color: "" };
      var text = steps[i][j];
      if (steps[i][j][0] == "." && steps[i][j][1] == ".") {
        //isASpecialType
        text = text.slice(2);
        text = text.substring(0, text.length - 2);
        if (text.length == 1) {
          //isASingleVariable
          tempPart.push({
            string: text,
            type: "var-" + text.toUpperCase()
          });
        } else {
          //TODO: process multi variable block with operators
          tempPart.push({
            string: text,
            type: "multiTODO"
          });
        }
      } else {
        tempPart.push({
          string: text,
          type: "text"
        });
      }
    }
    displayArray.push(tempPart);
  }
  return displayArray;
}

function printSteps(problem) {
  var displayArray = makeDisplayArray(problem);
  for (let i = 0; i < displayArray.length; i++) {
    document.write(`Step ${i + 1}:<br/><div class="text">`);
    for (let j = 0; j < displayArray[i].length; j++) {
      if (displayArray[i][j].type == "text") {
        document.write(displayArray[i][j].string);
      } else {
        document.write(
          `<span class=${displayArray[i][j].type}>${displayArray[i][j].string}</span>`
        );
      }
    }
    document.write(`</div><br/>`);
  }
}
console.log(makeDisplayArray(exampleproblem));

printSteps(exampleproblem);
