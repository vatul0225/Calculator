let displayValue = '0';
let currentOperator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = displayValue;
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    currentOperator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function appendDigit(digit) {
    if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (currentOperator && waitingForSecondOperand) {
        currentOperator = operator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = parseFloat(displayValue);
    } else if (currentOperator) {
        const result = performCalculation(currentOperator, firstOperand, parseFloat(displayValue));
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    currentOperator = operator;
    waitingForSecondOperand = true;
    updateDisplay();
}

function performCalculation(operator, firstOperand, secondOperand) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            if (secondOperand === 0) {
                alert("Division by 0 is not allowed.");
                return firstOperand;
            }
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}

function calculate() {
    if (currentOperator === null || waitingForSecondOperand) return;

    const result = performCalculation(currentOperator, firstOperand, parseFloat(displayValue));
    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstOperand = null;
    currentOperator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function deleteDigit() {
    displayValue = displayValue.length > 1 ? displayValue.slice(0, -1) : '0';
    updateDisplay();
}
