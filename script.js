class Problem {
  constructor(type, vars) {
    this.type = type;
    this.vars = vars;
  }
}

var firstv = Math.round(Math.random() * 12);
var secondv = Math.round(Math.random() * 12);

document.getElementById("var1").innerHTML = firstv;
document.getElementById("var2").innerHTML = secondv;

let exampleproblem = new Problem("another.example.for.you", {
  a: firstv,
  b: secondv
});

var processbase = {
  //grade.type.subtype.subtype...subtype
  "third.multiply.simple.twovar": {
    1: "First, we look at our two numbers ``..a`` and ``..b``.",
    2: "Then, we have ``..a`` ÷ ``..b``.",
    3: "Who knew I loved step 3!",
    4: "GOLBDY GOOK BOOK ``..b``"
  },
  "another.example.for.you": {
    1: "``..a`` and ``..b``, what great numbers aren't they?",
    2: "I honestly can't choose between ``..a`` and ``..b``.",
    3: "Who knew I loved step 3!",
    4: "GOLBDY GOOK BOOK ``..b``"
  }
};

function parseSolveObject(problem) {
  let output = {};
  for (let w = 0; w < Object.keys(processbase[problem.type]).length; w++) {
    var parse = processbase[problem.type][w + 1].split("``");
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
        if (text.length == 1) {
          //isASingleVariable
          var varReplace = problem.vars[text]; //put actual number in place for single letter var
          tempPart.push({
            string: varReplace,
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
  var innerHtmlString = "<br/>";
  console.log(innerHtmlString);
  for (let i = 0; i < displayArray.length; i++) {
    innerHtmlString += `<div class="text"> ${i + 1}. `;
    for (let j = 0; j < displayArray[i].length; j++) {
      if (displayArray[i][j].type == "text") {
        innerHtmlString += displayArray[i][j].string;
      } else {
        innerHtmlString += `<span class=${displayArray[i][j].type}>${displayArray[i][j].string}</span>`;
      }
    }
    innerHtmlString += `</div><br/>`;
  }
  document.getElementsByClassName(
    "student-quiz-explanationcontainer"
  )[0].innerHTML = innerHtmlString;
}
console.log(makeDisplayArray(exampleproblem));

printSteps(exampleproblem);
