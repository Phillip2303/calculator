let firstNumberString = "";
let operator = "";
let secondNumberString = "";
let result = 0;
let isOperated = false;
let hasOldResult = false;
let isCalculated = false;
let hasDot = false;
let isError = false;

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
  firstNumber = Number(firstNumberString);
  secondNumber = Number(secondNumberString);
  let tempResult;
  if (operator == "÷") {
    if (secondNumber === 0) {
      isError = true;
      return "ERROR: You can't divide by 0!!";
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
    if (!isOperated) {
      firstNumberString += e.target.textContent;
      display.textContent = firstNumberString;
      console.log(firstNumberString);
    } else {
      secondNumberString += e.target.textContent;
      display.textContent = secondNumberString;
      hasOldResult = true;
      isCalculated = true;
      console.log(secondNumberString);
    }
  } else if (parentClass.contains("dot") && !hasDot) {
    if (!isOperated) {
      if (!firstNumberString.toString().includes(".")) {
        firstNumberString += e.target.textContent;
        display.textContent = firstNumberString;
        hasDot = true;
      }
    } else {
      secondNumberString += e.target.textContent;
      display.textContent = secondNumberString;
      hasDot = true;
    }
  } else if (parentClass.contains("operators") && hasOldResult) {
    isOperated = true;
    hasOldResult = false;
    result = operate(firstNumberString, operator, secondNumberString);
    operator = e.target.textContent;
    firstNumberString = result.toString();
    display.textContent = firstNumberString;
    if (isError) {
      firstNumberString = "";
      clear();
      isError = false;
    } else {
      secondNumberString = "";
      hasDot = false;
    }
  } else if (parentClass.contains("operators")) {
    isOperated = true;
    operator = e.target.textContent;
    hasDot = false;
  } else if (parentClass.contains("equals")) {
    isOperated = true;
    isCalculated = false;
    hasOldResult = false;
    result = operate(firstNumberString, operator, secondNumberString);
    operator = e.target.textContent;
    firstNumberString = result.toString();
    display.textContent = firstNumberString;
    if (isError) {
      firstNumberString = "";
      isError = false;
    }
    clear();
  } else if (parentClass.contains("clear")) {
    firstNumberString = "";
    clear();
    display.textContent = "";
  }
});

function clear() {
  operator = "";
  secondNumberString = "";
  hasDot = false;
  isOperated = false;
  hasOldResult = false;
  isCalculated = false;
}
