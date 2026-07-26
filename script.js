let firstNumberString = "";
let operator = "";
let secondNumberString = "";
let isOperated = false;
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
  if (operator == "÷") {
    divide(firstNumber, secondNumber);
  } else if (operator == "x") {
    multiply(firstNumber, secondNumber);
  } else if (operator == "-") {
    subtract(firstNumber, secondNumber);
  } else if (operator == "+") {
    add(firstNumber, secondNumber);
  }
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
      console.log(secondNumberString);
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
    display.textContent = operator;
  } else if (parentClass.contains("equals")) {
    isOperated = false;
    operate(firstNumberString, operator, secondNumberString);
    clear();
  }
});

function clear() {
  firstNumberString = "";
  operator = "";
  secondNumberString = "";
  isOperated = false;
  hasOldResult = false;
  isCalculated = false;
  justHitEquals = false;
}
