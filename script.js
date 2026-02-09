let firstNum = '';
let operator = '';
let secondNum = '';
let isResultDisplayed = false;

const screen = document.querySelector('.screen');

// Math functions
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

function updateDisplay() {
    if (firstNum === "No Way!") {
        screen.textContent = firstNum;
    } else {
        screen.textContent = `${firstNum} ${operator} ${secondNum}`.trim() || '0';
    }
}

const operate = function(operator, firstNum, secondNum) {
    const n1 = Number(firstNum);
    const n2 = Number(secondNum);
    let result;

    switch(operator) {
        case '+': result = add(n1, n2); break;
        case '-': result = subtract(n1, n2); break;
        case 'X': result = multiply(n1, n2); break;
        case '÷':
            if (n2 === 0) return "No Way!";
            result = divide(n1, n2);
            break;
        default: return null;
    }
    return Math.round(result * 1000) / 1000;
};

// Event Listeners
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        if (isResultDisplayed && operator === '') {
            firstNum = button.textContent;
            isResultDisplayed = false;
        } else if (operator === '') {
            firstNum += button.textContent;
        } else {
            secondNum += button.textContent;
        }
        updateDisplay();
    });
});

document.querySelectorAll('.operation').forEach(button => {
    button.addEventListener('click', () => {
        if (firstNum === "No Way!") return;
        if (firstNum !== '' && secondNum !== '') {
            const result = operate(operator, firstNum, secondNum);
            firstNum = result.toString();
            secondNum = '';
            if (firstNum === "No Way!") { updateDisplay(); return; }
        }
        if (firstNum !== '') {
            operator = button.textContent;
            isResultDisplayed = false;
            updateDisplay();
        }
    });
});

document.querySelector('.equals').addEventListener('click', () => {
    if (firstNum !== '' && operator !== '' && secondNum !== '') {
        const result = operate(operator, firstNum, secondNum);
        firstNum = result.toString();
        secondNum = '';
        operator = '';
        isResultDisplayed = true;
        updateDisplay();
    }
});

document.querySelector('.clear').addEventListener('click', () => {
    firstNum = ''; secondNum = ''; operator = ''; isResultDisplayed = false;
    screen.textContent = '0';
});

// Decimal button
document.querySelector('.decimal').addEventListener('click', () => {
    if (isResultDisplayed && operator === '') {
        firstNum = '0.';
        isResultDisplayed = false;
    } else if (operator === '') {
        if (!firstNum.includes('.')) firstNum += (firstNum === '' ? '0.' : '.');
    } else {
        if (!secondNum.includes('.')) secondNum += (secondNum === '' ? '0.' : '.');
    }
    updateDisplay();
});

// Backspace
document.querySelector('.backspace').addEventListener('click', () => {
    if (isResultDisplayed) return;
    if (secondNum !== '') secondNum = secondNum.slice(0, -1);
    else if (operator !== '') operator = '';
    else if (firstNum !== '') firstNum = firstNum.slice(0, -1);
    updateDisplay();
});

// Keyboard
window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) findAndClick('.number', e.key);
    if (e.key === '.') document.querySelector('.decimal').click();
    if (e.key === '=' || e.key === 'Enter') document.querySelector('.equals').click();
    if (e.key === 'Backspace') document.querySelector('.backspace').click();
    if (e.key === 'Escape') document.querySelector('.clear').click();
    if (e.key === '+') findAndClick('.operation', '+');
    if (e.key === '-') findAndClick('.operation', '-');
    if (e.key === '*') findAndClick('.operation', 'X');
    if (e.key === '/') { e.preventDefault(); findAndClick('.operation', '÷'); }
});

function findAndClick(className, text) {
    const buttons = document.querySelectorAll(className);
    buttons.forEach(btn => {
        if (btn.textContent === text) {
            // 1. Add the "pressed" class
            btn.classList.add('is-pressed');
            
            // 2. Actually click the button logic
            btn.click();
            
            // 3. Remove the class after 100ms so it "pops" back up
            setTimeout(() => {
                btn.classList.remove('is-pressed');
            }, 100);
        }
    });
}