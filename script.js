for (let item of document.querySelectorAll(".style")) {
  item.addEventListener("mousedown", (evt) => {
    evt.target.classList.add("styleOnClick");
  });
}

document.addEventListener("mouseup", () => {
  for (let item of document.querySelectorAll(".style")) {
    item.classList.remove("styleOnClick");
  }
});

const result = document.getElementById('resultText');
const calculation = document.getElementById('calculationText');

function formula() {
  let calMath = calculation.textContent
    .replace(/×/g, '*')
    .replace(/−/g, '-')
    .replace(/%/g, '/100');
  return calMath;
}

function calc(formula) {
  try {
    if (['+', '-', '*', '/', '.'].includes(formula.slice(-1))) {
      formula = formula.slice(0, -1);
    }
    return eval(formula);
  } catch {
    return "Error";
  }
}

function wrightNum(num) {
  calculation.textContent += num;
}

function op(btn) {
  if (btn === '.' && calculation.textContent.endsWith('.')) return;

  if (calculation.textContent.length !== 0) {
    let lastChar = calculation.textContent.slice(-1);
    if (!['+', '-', '×', '/', '.', '−'].includes(lastChar)) {
      result.textContent = calc(formula());
      calculation.textContent += btn;
    } else {
      calculation.textContent = calculation.textContent.slice(0, -1) + btn;
    }
  }
}

// Numbers
for (let i = 0; i <= 9; i++) {
  document.getElementById(`num${i}`).addEventListener('click', () => wrightNum(i));
}

// Operators
document.getElementById('addition').addEventListener('click', () => op('+'));
document.getElementById('subtraction').addEventListener('click', () => op('−'));
document.getElementById('division').addEventListener('click', () => op('/'));
document.getElementById('multiplication').addEventListener('click', () => op('×'));
document.getElementById('dot').addEventListener('click', () => op('.'));
document.getElementById('percent').addEventListener('click', () => op('%'));

// Clear
document.getElementById('clear').addEventListener('click', () => {
  calculation.textContent = '';
  result.textContent = 0;
});

// Backspace
document.getElementById('backspace').addEventListener('click', () => {
  calculation.textContent = calculation.textContent.slice(0, -1);
});

// Equal
document.getElementById('equal').addEventListener('click', () => {
  const finalResult = calc(formula());
  result.textContent = finalResult;
  calculation.textContent = finalResult;
});

// Keyboard Support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key)) {
    wrightNum(key);
  } else if (key === '+') op('+');
  else if (key === '-') op('−');
  else if (key === '*') op('×');
  else if (key === '/') op('/');
  else if (key === '.') op('.');
  else if (key === '%') op('%');
  else if (key === 'Enter') document.getElementById('equal').click();
  else if (key === 'Backspace') document.getElementById('backspace').click();
});
