let firstNumberString = "";
let operator = "";
let secondNumberString = "";
let result = 0;
let isOperated = false;
let hasOldResult = false;
let isCalculated = false;
let justHitEquals = false; // 🆕 Track if the last action was '='

const display = document.getElementById("display");

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(firstNumberString, operator, secondNumberString) {
  let firstNumber = Number(firstNumberString);
  let secondNumber = Number(secondNumberString);
  let tempResult;

  if (!operator) return firstNumber; // Safety check

  if (operator == "÷") {
    if (secondNumber === 0) {
      return "ERROR: Can't divide by 0!!";
    } else {
      tempResult = divide(firstNumber, secondNumber);
    }
  } else if (operator == "x") {
    tempResult = multiply(firstNumber, secondNumber);
  } else if (operator == "-") {
    tempResult = subtract(firstNumber, secondNumber);
  } else if (operator == "+") {
    tempResult = add(firstNumber, secondNumber);
  }

  // Rounding logic
  const tempResultString = tempResult.toString().split(".");
  if (tempResultString[1] && tempResultString[1].length > 2) {
    return Number(tempResult.toFixed(2));
  }
  return tempResult;
}

const calculator = document.querySelector(".calculator");

calculator.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const parentClass = e.target.parentElement.classList;

  if (parentClass.contains("numbers")) {
    // 🆕 If they type a number right after equals, start a fresh calculation
    if (justHitEquals) {
      firstNumberString = e.target.textContent;
      display.textContent = firstNumberString;
      clear();
      return;
    }

    if (!isOperated) {
      firstNumberString += e.target.textContent;
      display.textContent = firstNumberString;
    } else {
      secondNumberString += e.target.textContent;
      display.textContent = secondNumberString;
      hasOldResult = true;
      isCalculated = true;
    }
  } else if (parentClass.contains("operators")) {
    justHitEquals = false; // 🆕 Reset since they chose to continue with an operator

    if (hasOldResult) {
      result = operate(firstNumberString, operator, secondNumberString);
      firstNumberString = result.toString();
      display.textContent = firstNumberString;
      secondNumberString = "";
      hasOldResult = false;
    }

    isOperated = true;
    operator = e.target.textContent;
  } else if (parentClass.contains("equals")) {
    // Only calculate if we actually have an operator and a second number
    if (operator && secondNumberString !== "") {
      result = operate(firstNumberString, operator, secondNumberString);
      display.textContent = result;
      firstNumberString = result.toString(); // Save result as the first number
      clear();
      justHitEquals = true; // 🆕 Mark that we just calculated
    }
  } else if (parentClass.contains("clear")) {
    firstNumberString = "";
    clear();
    display.textContent = "";
  }
});

function clear() {
  operator = "";
  secondNumberString = "";
  isOperated = false;
  hasOldResult = false;
  isCalculated = false;
  justHitEquals = false;
}
